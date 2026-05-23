import { useMemo, useState } from "react";
import { Check, ChevronDown, ChevronUp, Flame, Sparkles, Undo2 } from "lucide-react";
import { CATEGORIES, ALL_SKILLS } from "@/lib/skills-data";
import {
  computeStreak,
  formatToday,
  markNotRelevant,
  markUsed,
  todayKey,
  undoSkill,
  useStore,
} from "@/lib/storage";
import { SkillCard } from "@/components/SkillCard";

export function TodayScreen() {
  const { store } = useStore();
  const [showCompleted, setShowCompleted] = useState(false);
  const [filter, setFilter] = useState<string>("all"); // "all" or category id
  const [expanded, setExpanded] = useState<Record<string, boolean>>({});

  const dayKey = todayKey();
  const day = store.days[dayKey] ?? { completed: [], notRelevant: [] };
  const total = ALL_SKILLS.length;
  const completedCount = day.completed.length;
  const streak = useMemo(() => computeStreak(store), [store]);

  const remainingByCategory = CATEGORIES.map((c) => ({
    category: c,
    remaining: c.skills.filter(
      (s) => !day.completed.includes(s.id) && !day.notRelevant.includes(s.id)
    ),
  }));

  const totalRemaining = remainingByCategory.reduce((n, g) => n + g.remaining.length, 0);

  const visibleGroups =
    filter === "all"
      ? remainingByCategory.filter((g) => g.remaining.length > 0)
      : remainingByCategory.filter((g) => g.category.id === filter);

  const completedSkills = day.completed
    .map((id) => ALL_SKILLS.find((s) => s.id === id))
    .filter((s): s is (typeof ALL_SKILLS)[number] => !!s);

  const toggle = (id: string) =>
    setExpanded((prev) => ({ ...prev, [id]: !prev[id] }));

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Shift Coach</h1>
          <p className="text-sm text-muted-foreground">{formatToday()}</p>
        </div>

        <div className="grid grid-cols-2 gap-3">
          <div className="rounded-2xl bg-card p-4 shadow-sm ring-1 ring-border">
            <div className="text-xs font-medium uppercase tracking-wide text-muted-foreground">
              Practiced today
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-2xl font-bold text-foreground">{completedCount}</span>
              <span className="text-sm text-muted-foreground">of {total}</span>
            </div>
            <div className="mt-2 h-1.5 w-full overflow-hidden rounded-full bg-muted">
              <div
                className="h-full rounded-full bg-primary transition-all"
                style={{ width: `${(completedCount / total) * 100}%` }}
              />
            </div>
          </div>

          <div className="rounded-2xl bg-card p-4 shadow-sm ring-1 ring-border">
            <div className="flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
              <Flame className="h-3.5 w-3.5" /> Streak
            </div>
            <div className="mt-1 flex items-baseline gap-1">
              <span className="text-2xl font-bold text-foreground">{streak}</span>
              <span className="text-sm text-muted-foreground">
                {streak === 1 ? "day" : "days"}
              </span>
            </div>
            <div className="mt-2 text-xs text-muted-foreground">
              {streak > 0 ? "Keep it going" : "Practice one to start"}
            </div>
          </div>
        </div>

        <div className="flex items-start gap-2 rounded-2xl bg-accent/60 px-4 py-3 text-sm text-accent-foreground">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0" />
          <p>Look for one more leadership moment before your shift ends.</p>
        </div>
      </header>

      <section className="space-y-3">
        <div className="flex items-baseline justify-between">
          <h2 className="text-lg font-semibold text-foreground">Still to Practice Today</h2>
          <span className="text-xs text-muted-foreground">{totalRemaining} left</span>
        </div>

        {/* Filter chips */}
        <div className="-mx-4 overflow-x-auto px-4">
          <div className="flex gap-2 pb-1">
            <Chip
              label="All"
              count={totalRemaining}
              active={filter === "all"}
              onClick={() => setFilter("all")}
            />
            {CATEGORIES.map((c) => {
              const count = remainingByCategory.find((g) => g.category.id === c.id)
                ?.remaining.length ?? 0;
              return (
                <Chip
                  key={c.id}
                  label={c.short}
                  count={count}
                  active={filter === c.id}
                  onClick={() => setFilter(c.id)}
                />
              );
            })}
          </div>
        </div>

        {totalRemaining === 0 ? (
          <div className="rounded-2xl bg-card p-6 text-center shadow-sm ring-1 ring-border">
            <Check className="mx-auto h-8 w-8 text-primary" />
            <p className="mt-2 text-sm font-medium text-foreground">
              You've worked through every skill for today.
            </p>
            <p className="mt-1 text-xs text-muted-foreground">
              Great shift. Come back tomorrow to keep your streak.
            </p>
          </div>
        ) : (
          <div className="space-y-2">
            {visibleGroups.map(({ category, remaining }) => {
              if (remaining.length === 0) return null;
              // When a specific filter is on, auto-expand. When "all", use accordion.
              const isOpen = filter !== "all" || expanded[category.id];
              return (
                <div
                  key={category.id}
                  className="overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border"
                >
                  <button
                    type="button"
                    onClick={() => filter === "all" && toggle(category.id)}
                    className="flex w-full items-center justify-between px-4 py-3 text-left"
                  >
                    <div>
                      <div className="text-sm font-semibold text-foreground">
                        {category.name}
                      </div>
                      <div className="text-xs text-muted-foreground">
                        {remaining.length} to practice
                      </div>
                    </div>
                    {filter === "all" &&
                      (isOpen ? (
                        <ChevronUp className="h-5 w-5 text-muted-foreground" />
                      ) : (
                        <ChevronDown className="h-5 w-5 text-muted-foreground" />
                      ))}
                  </button>
                  {isOpen && (
                    <div className="space-y-2 border-t border-border bg-background/40 p-3">
                      {remaining.map((skill) => (
                        <SkillCard
                          key={skill.id}
                          categoryName={category.name}
                          title={skill.title}
                          meaning={skill.meaning}
                          onUsed={() => markUsed(skill.id)}
                          onNotRelevant={() => markNotRelevant(skill.id)}
                        />
                      ))}
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        )}
      </section>

      {(completedSkills.length > 0 || day.notRelevant.length > 0) && (
        <section className="rounded-2xl bg-card shadow-sm ring-1 ring-border">
          <button
            onClick={() => setShowCompleted((v) => !v)}
            className="flex w-full items-center justify-between px-4 py-3 text-left"
          >
            <div>
              <div className="text-sm font-semibold text-foreground">Completed Today</div>
              <div className="text-xs text-muted-foreground">
                {completedSkills.length} practiced
                {day.notRelevant.length > 0
                  ? ` · ${day.notRelevant.length} not relevant`
                  : ""}
              </div>
            </div>
            {showCompleted ? (
              <ChevronUp className="h-5 w-5 text-muted-foreground" />
            ) : (
              <ChevronDown className="h-5 w-5 text-muted-foreground" />
            )}
          </button>
          {showCompleted && (
            <ul className="divide-y divide-border border-t border-border">
              {completedSkills.map((s) => (
                <li key={s.id} className="flex items-start gap-3 px-4 py-3">
                  <div className="mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full bg-primary text-primary-foreground">
                    <Check className="h-3 w-3" />
                  </div>
                  <div className="min-w-0 flex-1">
                    <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                      {s.categoryName}
                    </div>
                    <div className="text-sm text-foreground">{s.title}</div>
                  </div>
                  <button
                    onClick={() => undoSkill(s.id)}
                    className="shrink-0 rounded-md p-1.5 text-muted-foreground hover:bg-muted"
                    aria-label="Undo"
                  >
                    <Undo2 className="h-4 w-4" />
                  </button>
                </li>
              ))}
              {day.notRelevant.map((id) => {
                const s = ALL_SKILLS.find((x) => x.id === id);
                if (!s) return null;
                return (
                  <li key={id} className="flex items-start gap-3 px-4 py-3 opacity-70">
                    <div className="mt-0.5 h-5 w-5 shrink-0 rounded-full border-2 border-dashed border-muted-foreground" />
                    <div className="min-w-0 flex-1">
                      <div className="text-[11px] font-medium uppercase tracking-wide text-muted-foreground">
                        {s.categoryName} · Not relevant
                      </div>
                      <div className="text-sm text-foreground">{s.title}</div>
                    </div>
                    <button
                      onClick={() => undoSkill(id)}
                      className="shrink-0 rounded-md p-1.5 text-muted-foreground hover:bg-muted"
                      aria-label="Undo"
                    >
                      <Undo2 className="h-4 w-4" />
                    </button>
                  </li>
                );
              })}
            </ul>
          )}
        </section>
      )}

      <section className="rounded-2xl border-2 border-dashed border-border bg-muted/40 p-4 opacity-80">
        <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
          Coming next
        </div>
        <div className="mt-1 text-sm font-semibold text-foreground">Personal Focus Areas</div>
        <p className="mt-1 text-xs text-muted-foreground">
          Add skills you personally want to practice, like Starbucks-level communication.
        </p>
      </section>
    </div>
  );
}

function Chip({
  label,
  count,
  active,
  onClick,
}: {
  label: string;
  count: number;
  active: boolean;
  onClick: () => void;
}) {
  return (
    <button
      type="button"
      onClick={onClick}
      className={`shrink-0 rounded-full px-3 py-1.5 text-xs font-medium transition ${
        active
          ? "bg-primary text-primary-foreground"
          : "bg-secondary text-secondary-foreground"
      }`}
    >
      {label}
      <span
        className={`ml-1.5 rounded-full px-1.5 py-0.5 text-[10px] ${
          active ? "bg-primary-foreground/20" : "bg-background/60"
        }`}
      >
        {count}
      </span>
    </button>
  );
}
