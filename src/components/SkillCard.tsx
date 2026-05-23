import { Check, Undo2 } from "lucide-react";

type Status = "pending" | "done" | "skipped";

export function SkillCard({
  categoryName,
  title,
  meaning,
  status = "pending",
  onUsed,
  onNotRelevant,
  onUndo,
}: {
  categoryName: string;
  title: string;
  meaning: string;
  status?: Status;
  onUsed?: () => void;
  onNotRelevant?: () => void;
  onUndo?: () => void;
}) {
  return (
    <article
      className={`rounded-2xl bg-card p-4 shadow-sm ring-1 ring-border ${
        status !== "pending" ? "opacity-90" : ""
      }`}
    >
      <div className="flex items-center justify-between gap-2">
        <span className="inline-block rounded-full bg-secondary px-2 py-0.5 text-[10px] font-semibold uppercase tracking-wide text-secondary-foreground">
          {categoryName}
        </span>
        {status === "done" && (
          <span className="inline-flex items-center gap-1 text-[11px] font-medium text-primary">
            <Check className="h-3 w-3" /> Used today
          </span>
        )}
        {status === "skipped" && (
          <span className="text-[11px] font-medium text-muted-foreground">Not relevant</span>
        )}
      </div>
      <h3 className="mt-2 text-sm font-semibold leading-snug text-foreground">{title}</h3>
      <p className="mt-1.5 text-[13px] leading-relaxed text-muted-foreground">{meaning}</p>

      {status === "pending" ? (
        <div className="mt-3 flex gap-2">
          <button
            onClick={onUsed}
            className="inline-flex h-10 flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition active:scale-[0.99]"
          >
            <Check className="h-4 w-4" />
            Used Today
          </button>
          <button
            onClick={onNotRelevant}
            className="inline-flex h-10 items-center justify-center rounded-xl bg-secondary px-3 text-xs font-medium text-secondary-foreground transition active:scale-[0.99]"
          >
            Not Relevant
          </button>
        </div>
      ) : (
        <div className="mt-3">
          <button
            onClick={onUndo}
            className="inline-flex h-9 items-center justify-center gap-1.5 rounded-xl bg-secondary px-3 text-xs font-medium text-secondary-foreground"
          >
            <Undo2 className="h-3.5 w-3.5" /> Undo
          </button>
        </div>
      )}
    </article>
  );
}
