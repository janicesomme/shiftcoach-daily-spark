import { useMemo, useState } from "react";
import { ChevronDown, ChevronUp } from "lucide-react";
import { ALL_SKILLS } from "@/lib/skills-data";
import { useStore } from "@/lib/storage";

export function HistoryScreen() {
  const { store } = useStore();

  const days = useMemo(
    () =>
      Object.entries(store.days)
        .filter(([, d]) => d.completed.length > 0 || d.notRelevant.length > 0)
        .sort(([a], [b]) => (a < b ? 1 : -1)),
    [store]
  );

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">History</h1>
        <p className="text-sm text-muted-foreground">Previous shifts and skills.</p>
      </header>

      {days.length === 0 ? (
        <div className="rounded-2xl bg-card p-6 text-center shadow-sm ring-1 ring-border">
          <p className="text-sm text-muted-foreground">
            No history yet. Practice a skill today to start your log.
          </p>
        </div>
      ) : (
        <ul className="space-y-2">
          {days.map(([key, d]) => (
            <HistoryRow
              key={key}
              dateKey={key}
              completed={d.completed}
              notRelevant={d.notRelevant}
            />
          ))}
        </ul>
      )}
    </div>
  );
}

function HistoryRow({
  dateKey,
  completed,
  notRelevant,
}: {
  dateKey: string;
  completed: string[];
  notRelevant: string[];
}) {
  const [open, setOpen] = useState(false);
  const date = new Date(dateKey + "T00:00:00");
  const label = date.toLocaleDateString(undefined, {
    weekday: "short",
    month: "short",
    day: "numeric",
    year: "numeric",
  });

  const lookup = (id: string) => ALL_SKILLS.find((s) => s.id === id);

  return (
    <li className="rounded-2xl bg-card shadow-sm ring-1 ring-border">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center justify-between px-4 py-3 text-left"
      >
        <div>
          <div className="text-sm font-semibold text-foreground">{label}</div>
          <div className="text-xs text-muted-foreground">
            {completed.length} practiced
            {notRelevant.length > 0 ? ` · ${notRelevant.length} not relevant` : ""}
          </div>
        </div>
        {open ? (
          <ChevronUp className="h-5 w-5 text-muted-foreground" />
        ) : (
          <ChevronDown className="h-5 w-5 text-muted-foreground" />
        )}
      </button>
      {open && (
        <div className="space-y-4 border-t border-border px-4 py-3">
          {completed.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                Practiced
              </div>
              <ul className="mt-1.5 space-y-1.5">
                {completed.map((id) => {
                  const s = lookup(id);
                  if (!s) return null;
                  return (
                    <li key={id} className="text-sm text-foreground">
                      <span className="text-muted-foreground">{s.categoryName}:</span>{" "}
                      {s.title}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
          {notRelevant.length > 0 && (
            <div>
              <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
                Not relevant
              </div>
              <ul className="mt-1.5 space-y-1.5">
                {notRelevant.map((id) => {
                  const s = lookup(id);
                  if (!s) return null;
                  return (
                    <li key={id} className="text-sm text-muted-foreground">
                      {s.categoryName}: {s.title}
                    </li>
                  );
                })}
              </ul>
            </div>
          )}
        </div>
      )}
    </li>
  );
}
