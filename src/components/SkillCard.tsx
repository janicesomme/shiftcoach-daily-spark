import { useState } from "react";
import { Check, ChevronDown, ChevronUp, Undo2 } from "lucide-react";

type Status = "pending" | "done" | "skipped";

export function SkillCard({
  categoryName,
  title,
  quick,
  meaning,
  status = "pending",
  onUsed,
  onNotRelevant,
  onUndo,
}: {
  categoryName: string;
  title: string;
  quick?: string;
  meaning: string;
  status?: Status;
  onUsed?: () => void;
  onNotRelevant?: () => void;
  onUndo?: () => void;
}) {
  const [open, setOpen] = useState(false);

  return (
    <article
      className={`rounded-2xl bg-card p-3.5 shadow-sm ring-1 ring-border ${
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

      {quick && (
        <p className="mt-1 text-[13px] leading-relaxed text-foreground/80">{quick}</p>
      )}

      {open && (
        <p className="mt-2 rounded-lg bg-muted/60 p-2.5 text-[12.5px] leading-relaxed text-muted-foreground">
          {meaning}
        </p>
      )}

      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        className="mt-1.5 inline-flex items-center gap-0.5 text-[11px] font-medium text-muted-foreground hover:text-foreground"
      >
        {open ? (
          <>
            Less <ChevronUp className="h-3 w-3" />
          </>
        ) : (
          <>
            More <ChevronDown className="h-3 w-3" />
          </>
        )}
      </button>

      {status === "pending" ? (
        <div className="mt-2.5 flex gap-2">
          <button
            onClick={onUsed}
            className="inline-flex h-9 flex-1 items-center justify-center gap-1.5 rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition active:scale-[0.99]"
          >
            <Check className="h-4 w-4" />
            Used Today
          </button>
          <button
            onClick={onNotRelevant}
            className="inline-flex h-9 items-center justify-center rounded-xl bg-secondary px-3 text-xs font-medium text-secondary-foreground transition active:scale-[0.99]"
          >
            Not Relevant
          </button>
        </div>
      ) : (
        <div className="mt-2.5">
          <button
            onClick={onUndo}
            className="inline-flex h-8 items-center justify-center gap-1.5 rounded-xl bg-secondary px-3 text-xs font-medium text-secondary-foreground"
          >
            <Undo2 className="h-3.5 w-3.5" /> Undo
          </button>
        </div>
      )}
    </article>
  );
}
