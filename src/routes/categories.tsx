import { createFileRoute, Link } from "@tanstack/react-router";
import { ChevronRight } from "lucide-react";
import { CATEGORIES } from "@/lib/skills-data";
import { todayKey, useStore } from "@/lib/storage";

export const Route = createFileRoute("/categories")({
  head: () => ({
    meta: [
      { title: "Categories — Shift Coach" },
      { name: "description", content: "Browse leadership skill categories." },
    ],
  }),
  component: CategoriesPage,
});

function CategoriesPage() {
  const { store } = useStore();
  const day = store.days[todayKey()] ?? { completed: [], notRelevant: [] };

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
              <Link
                to="/categories/$categoryId"
                params={{ categoryId: c.id }}
                className="flex items-center justify-between rounded-2xl bg-card p-4 shadow-sm ring-1 ring-border active:scale-[0.99]"
              >
                <div className="min-w-0">
                  <div className="text-sm font-semibold text-foreground">{c.name}</div>
                  <div className="text-xs text-muted-foreground">
                    {done} of {c.skills.length} practiced today
                  </div>
                </div>
                <ChevronRight className="h-5 w-5 shrink-0 text-muted-foreground" />
              </Link>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
