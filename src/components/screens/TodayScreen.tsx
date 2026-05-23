import { useEffect, useMemo, useState } from "react";
import { Check, ChevronDown, ChevronUp, Flame, Sparkles, Target, Undo2 } from "lucide-react";
import { toast } from "sonner";
import { CATEGORIES, ALL_SKILLS } from "@/lib/skills-data";
import {
  computeStreak,
  formatToday,
  markNotRelevant,
  markUsed,
  setFocusCategories,
  todayKey,
  undoSkill,
  useStore,
} from "@/lib/storage";
import { SkillCard } from "@/components/SkillCard";

const ENCOURAGEMENTS = [
  "Pick one small leadership moment and use it today.",
  "Notice one partner win before the shift ends.",
  "One clear coaching moment counts.",
  "Progress is built one shift at a time.",
  "Look for one chance to communicate clearly.",
];

export function TodayScreen() {
  const { store } = useStore();
  const [showCompleted, setShowCompleted] = useState(false);
  const [openCats, setOpenCats] = useState<Record<string, boolean>>({});
  const [showOthers, setShowOthers] = useState(false);
  const [editFocus, setEditFocus] = useState(false);

  const dayKey = todayKey();
  const day = store.days[dayKey] ?? { completed: [], notRelevant: [], focusCategories: [] };
  const focusIds = day.focusCategories ?? [];
  const hasFocus = focusIds.length > 0;

  const total = ALL_SKILLS.length;
  const completedCount = day.completed.length;
  const streak = useMemo(() => computeStreak(store), [store]);

  const encouragement = useMemo(() => {
    // Rotate by day, then nudge based on completion count for variety in-shift
    const seed =
      new Date().getDate() + new Date().getMonth() * 31 + completedCount;
    return ENCOURAGEMENTS[seed % ENCOURAGEMENTS.length];
  }, [completedCount]);

  const remainingByCat = CATEGORIES.map((c) => ({
    category: c,
    remaining: c.skills.filter(
      (s) => !day.completed.includes(s.id) && !day.notRelevant.includes(s.id)
    ),
  }));
  const totalRemaining = remainingByCat.reduce((n, g) => n + g.remaining.length, 0);

  const focusGroups = remainingByCat.filter(
    (g) => focusIds.includes(g.category.id) && g.remaining.length > 0
  );
  const otherGroups = remainingByCat.filter(
    (g) => !focusIds.includes(g.category.id) && g.remaining.length > 0
  );

  // Default-open: first focus, or Deployment if no focus
  useEffect(() => {
    setOpenCats((prev) => {
      if (Object.keys(prev).length > 0) return prev;
      const firstId = hasFocus ? focusIds[0] : "deployment";
      return { [firstId]: true };
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [hasFocus, focusIds.join("|")]);

  const completedSkills = day.completed
    .map((id) => ALL_SKILLS.find((s) => s.id === id))
    .filter((s): s is (typeof ALL_SKILLS)[number] => !!s);

  const toggleCat = (id: string) =>
    setOpenCats((prev) => ({ ...prev, [id]: !prev[id] }));

  const handleUsed = (id: string) => {
    markUsed(id);
    toast("Skill updated", {
      description: "Marked as used today.",
      action: { label: "Undo", onClick: () => undoSkill(id) },
      duration: 4000,
    });
  };
  const handleNotRelevant = (id: string) => {
    markNotRelevant(id);
    toast("Skill updated", {
      description: "Marked as not relevant.",
      action: { label: "Undo", onClick: () => undoSkill(id) },
      duration: 4000,
    });
  };

  const toggleFocus = (id: string) => {
    const next = focusIds.includes(id)
      ? focusIds.filter((x) => x !== id)
      : focusIds.length >= 3
        ? focusIds
        : [...focusIds, id];
    setFocusCategories(next);
  };

  return (
    <div className="space-y-6">
      <header className="space-y-3">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">Shift Coach</h1>
          <p className="text-sm text-muted-foreground">{formatToday()}</p>
        </div>

        <div className="grid grid-cols-3 gap-2">
          <StatCard
            label="Practiced Today"
            value={completedCount}
            sub={completedCount === 1 ? "leadership moment" : "leadership moments"}
          />
          <StatCard
            label="Still Available"
            value={totalRemaining}
            sub={totalRemaining === 1 ? "skill" : "skills"}
          />
          <StatCard
            label="Streak"
            value={streak}
            sub={streak === 1 ? "day" : "days"}
            icon={<Flame className="h-3 w-3" />}
          />
        </div>

        <div className="flex items-start gap-2 rounded-2xl bg-accent/60 px-4 py-3 text-sm text-accent-foreground">
          <Sparkles className="mt-0.5 h-4 w-4 shrink-0" />
          <p>{encouragement}</p>
        </div>
      </header>

      {/* Today's Focus */}
      <section className="rounded-2xl bg-card p-4 shadow-sm ring-1 ring-border">
        <div className="flex items-start justify-between gap-2">
          <div className="flex items-center gap-2">
            <Target className="h-4 w-4 text-primary" />
            <h2 className="text-base font-semibold text-foreground">Today's Focus</h2>
          </div>
          {hasFocus && !editFocus && (
            <button
              onClick={() => setEditFocus(true)}
              className="text-xs font-medium text-primary"
            >
              Edit
            </button>
          )}
        </div>
        <p className="mt-1 text-xs text-muted-foreground">
          {hasFocus && !editFocus
            ? `Practicing ${focusIds.length} ${focusIds.length === 1 ? "area" : "areas"} this shift.`
            : "Choose 1–3 areas you want to actively practice today."}
        </p>

        {(editFocus || !hasFocus) && (
          <>
            <div className="mt-3 flex flex-wrap gap-2">
              {CATEGORIES.map((c) => {
                const active = focusIds.includes(c.id);
                const disabled = !active && focusIds.length >= 3;
                return (
                  <button
                    key={c.id}
                    type="button"
                    onClick={() => toggleFocus(c.id)}
                    disabled={disabled}
                    className={`rounded-full px-3 py-1.5 text-xs font-medium transition ${
                      active
                        ? "bg-primary text-primary-foreground"
                        : disabled
                          ? "bg-muted text-muted-foreground/60"
                          : "bg-secondary text-secondary-foreground"
                    }`}
                  >
                    {active && <Check className="mr-1 inline h-3 w-3" />}
                    {c.short}
                  </button>
                );
              })}
            </div>
            {hasFocus && (
              <button
                onClick={() => setEditFocus(false)}
                className="mt-3 text-xs font-medium text-primary"
              >
                Done
              </button>
            )}
          </>
        )}

        {hasFocus && !editFocus && (
          <div className="mt-2 flex flex-wrap gap-1.5">
            {focusIds.map((id) => {
              const c = CATEGORIES.find((x) => x.id === id);
              if (!c) return null;
              return (
                <span
                  key={id}
                  className="rounded-full bg-primary/10 px-2.5 py-1 text-[11px] font-semibold text-primary"
                >
                  {c.short}
                </span>
              );
            })}
          </div>
        )}
      </section>

      {/* Focus skills */}
      {hasFocus && focusGroups.length > 0 && (
        <section className="space-y-3">
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-semibold text-foreground">Focus skills</h2>
            <span className="text-xs text-muted-foreground">
              {focusGroups.reduce((n, g) => n + g.remaining.length, 0)} to practice
            </span>
          </div>
          <CategoryList
            groups={focusGroups}
            openCats={openCats}
            onToggle={toggleCat}
            onUsed={handleUsed}
            onNotRelevant={handleNotRelevant}
          />
        </section>
      )}

      {/* Other / all skills */}
      {(otherGroups.length > 0 || (!hasFocus && remainingByCat.length > 0)) && (
        <section className="space-y-3">
          <div className="flex items-baseline justify-between">
            <h2 className="text-lg font-semibold text-foreground">
              {hasFocus ? "All Other Skills" : "Still to Practice Today"}
            </h2>
            {hasFocus ? (
              <button
                onClick={() => setShowOthers((v) => !v)}
                className="text-xs font-medium text-primary"
              >
                {showOthers ? "Hide" : "Show"}
              </button>
            ) : (
              <span className="text-xs text-muted-foreground">{totalRemaining} left</span>
            )}
          </div>

          {(!hasFocus || showOthers) && (
            <CategoryList
              groups={hasFocus ? otherGroups : remainingByCat.filter((g) => g.remaining.length > 0)}
              openCats={openCats}
              onToggle={toggleCat}
              onUsed={handleUsed}
              onNotRelevant={handleNotRelevant}
            />
          )}
        </section>
      )}

      {totalRemaining === 0 && (
        <div className="rounded-2xl bg-card p-6 text-center shadow-sm ring-1 ring-border">
          <Check className="mx-auto h-8 w-8 text-primary" />
          <p className="mt-2 text-sm font-medium text-foreground">
            You've worked through every skill for today.
          </p>
          <p className="mt-1 text-xs text-muted-foreground">
            Great shift. Come back tomorrow to keep your streak.
          </p>
        </div>
      )}

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

function StatCard({
  label,
  value,
  sub,
  icon,
}: {
  label: string;
  value: number;
  sub: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-card p-3 shadow-sm ring-1 ring-border">
      <div className="flex items-center gap-1 text-[10px] font-medium uppercase tracking-wide text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="mt-1 text-xl font-bold leading-none text-foreground">{value}</div>
      <div className="mt-1 text-[11px] leading-tight text-muted-foreground">{sub}</div>
    </div>
  );
}

function CategoryList({
  groups,
  openCats,
  onToggle,
  onUsed,
  onNotRelevant,
}: {
  groups: { category: (typeof CATEGORIES)[number]; remaining: (typeof CATEGORIES)[number]["skills"] }[];
  openCats: Record<string, boolean>;
  onToggle: (id: string) => void;
  onUsed: (id: string) => void;
  onNotRelevant: (id: string) => void;
}) {
  return (
    <div className="space-y-2">
      {groups.map(({ category, remaining }) => {
        const isOpen = !!openCats[category.id];
        return (
          <div
            key={category.id}
            className="overflow-hidden rounded-2xl bg-card shadow-sm ring-1 ring-border"
          >
            <button
              type="button"
              onClick={() => onToggle(category.id)}
              className="flex w-full items-center justify-between px-4 py-3 text-left"
            >
              <div>
                <div className="text-sm font-semibold text-foreground">{category.name}</div>
                <div className="text-xs text-muted-foreground">
                  {remaining.length} to practice
                </div>
              </div>
              {isOpen ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
            {isOpen && (
              <div className="space-y-2 border-t border-border bg-background/40 p-3">
                {remaining.map((skill) => (
                  <SkillCard
                    key={skill.id}
                    categoryName={category.name}
                    title={skill.title}
                    quick={skill.quick}
                    meaning={skill.meaning}
                    onUsed={() => onUsed(skill.id)}
                    onNotRelevant={() => onNotRelevant(skill.id)}
                  />
                ))}
              </div>
            )}
          </div>
        );
      })}
    </div>
  );
}
