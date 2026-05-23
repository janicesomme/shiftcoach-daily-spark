import { createFileRoute } from "@tanstack/react-router";
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

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Today — Shift Coach" },
      { name: "description", content: "Skills still to practice during your shift today." },
    ],
  }),
  component: TodayPage,
});

function TodayPage() {
  const { store } = useStore();
  const [showCompleted, setShowCompleted] = useState(false);

  const dayKey = todayKey();
  const day = store.days[dayKey] ?? { completed: [], notRelevant: [] };
  const total = ALL_SKILLS.length;
  const completedCount = day.completed.length;
  const streak = useMemo(() => computeStreak(store), [store]);

  const grouped = CATEGORIES.map((c) => ({
    category: c,
    remaining: c.skills.filter(
      (s) => !day.completed.includes(s.id) && !day.notRelevant.includes(s.id)
    ),
  })).filter((g) => g.remaining.length > 0);

  const completedSkills = day.completed
    .map((id) => ALL_SKILLS.find((s) => s.id === id))
    .filter((s): s is (typeof ALL_SKILLS)[number] => !!s);

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
          {grouped.length === 0 && (
            <span className="text-xs text-muted-foreground">All done!</span>
          )}
        </div>

        {grouped.length === 0 ? (
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
          grouped.map(({ category, remaining }) => (
            <div key={category.id} className="space-y-2">
              <div className="px-1 text-xs font-semibold uppercase tracking-wide text-muted-foreground">
                {category.name}
              </div>
              <div className="space-y-2">
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
            </div>
          ))
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

function SkillCard({
  categoryName,
  title,
  meaning,
  onUsed,
  onNotRelevant,
}: {
  categoryName: string;
  title: string;
  meaning: string;
  onUsed: () => void;
  onNotRelevant: () => void;
}) {
  return (
    <article className="rounded-2xl bg-card p-4 shadow-sm ring-1 ring-border">
      <div className="text-[11px] font-semibold uppercase tracking-wide text-muted-foreground">
        {categoryName}
      </div>
      <h3 className="mt-1 text-[15px] font-semibold leading-snug text-foreground">
        {title}
      </h3>
      <p className="mt-2 text-sm leading-relaxed text-muted-foreground">{meaning}</p>
      <div className="mt-4 flex flex-col gap-2">
        <button
          onClick={onUsed}
          className="inline-flex h-12 w-full items-center justify-center gap-2 rounded-xl bg-primary text-sm font-semibold text-primary-foreground transition active:scale-[0.99]"
        >
          <Check className="h-4 w-4" />
          Used Today
        </button>
        <button
          onClick={onNotRelevant}
          className="inline-flex h-10 w-full items-center justify-center rounded-xl bg-secondary text-sm font-medium text-secondary-foreground transition active:scale-[0.99]"
        >
          Not Relevant Today
        </button>
      </div>
    </article>
  );
}
