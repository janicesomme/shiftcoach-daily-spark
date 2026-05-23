import { useState } from "react";
import { ArrowLeft, ChevronRight } from "lucide-react";
import { CATEGORIES, getCategory } from "@/lib/skills-data";
import { markNotRelevant, markUsed, todayKey, undoSkill, useStore } from "@/lib/storage";
import { SkillCard } from "@/components/SkillCard";

export function CategoriesScreen() {
  const [selectedId, setSelectedId] = useState<string | null>(null);
  const { store } = useStore();
  const day = store.days[todayKey()] ?? { completed: [], notRelevant: [] };

  if (selectedId) {
    const category = getCategory(selectedId);
    if (!category) {
      setSelectedId(null);
      return null;
    }
    return (
      <div className="space-y-5">
        <button
          onClick={() => setSelectedId(null)}
          className="inline-flex items-center gap-1 text-sm text-muted-foreground"
        >
          <ArrowLeft className="h-4 w-4" /> Categories
        </button>

        <header>
          <h1 className="text-2xl font-bold tracking-tight text-foreground">
            {category.name}
          </h1>
          <p className="text-sm text-muted-foreground">{category.skills.length} skills</p>
        </header>

        <div className="space-y-2">
          {category.skills.map((s) => {
            const done = day.completed.includes(s.id);
            const skipped = day.notRelevant.includes(s.id);
            const status = done ? "done" : skipped ? "skipped" : "pending";
            return (
              <SkillCard
                key={s.id}
                categoryName={category.name}
                title={s.title}
                meaning={s.meaning}
                status={status}
                onUsed={() => markUsed(s.id)}
                onNotRelevant={() => markNotRelevant(s.id)}
                onUndo={() => undoSkill(s.id)}
              />
            );
          })}
        </div>
      </div>
    );
  }

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Categories</h1>
        <p className="text-sm text-muted-foreground">All shift supervisor skills.</p>
      </header>

      <ul className="space-y-2">
        {CATEGORIES.map((c) => {
          const done = c.skills.filter((s) => day.completed.includes(s.id)).length;
          return (
            <li key={c.id}>
              <button
                type="button"
                onClick={() => setSelectedId(c.id)}
                className="flex w-full items-center justify-between rounded-2xl bg-card p-4 text-left shadow-sm ring-1 ring-border active:scale-[0.99]"
              >
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-foreground">{c.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {done} of {c.skills.length} practiced today
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
              </button>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
