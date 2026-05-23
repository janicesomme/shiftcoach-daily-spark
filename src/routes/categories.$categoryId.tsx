import { createFileRoute, Link, notFound } from "@tanstack/react-router";
import { ArrowLeft, Check } from "lucide-react";
import { getCategory } from "@/lib/skills-data";
import { markNotRelevant, markUsed, todayKey, undoSkill, useStore } from "@/lib/storage";

export const Route = createFileRoute("/categories/$categoryId")({
  head: ({ params }) => {
    const c = getCategory(params.categoryId);
    return {
      meta: [
        { title: `${c?.name ?? "Category"} — Shift Coach` },
        { name: "description", content: c?.name ?? "Skill category" },
      ],
    };
  },
  loader: ({ params }) => {
    const c = getCategory(params.categoryId);
    if (!c) throw notFound();
    return { category: c };
  },
  component: CategoryDetail,
  notFoundComponent: () => (
    <div className="py-16 text-center text-sm text-muted-foreground">Category not found.</div>
  ),
});

function CategoryDetail() {
  const { category } = Route.useLoaderData();
  const { store } = useStore();
  const day = store.days[todayKey()] ?? { completed: [], notRelevant: [] };

  return (
    <div className="space-y-5">
      <Link
        to="/categories"
        className="inline-flex items-center gap-1 text-sm text-muted-foreground"
      >
        <ArrowLeft className="h-4 w-4" /> Categories
      </Link>

      <header>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">{category.name}</h1>
        <p className="text-sm text-muted-foreground">{category.skills.length} skills</p>
      </header>

      <ul className="space-y-3">
        {category.skills.map((s) => {
          const done = day.completed.includes(s.id);
          const skipped = day.notRelevant.includes(s.id);
          return (
            <li
              key={s.id}
              className="rounded-2xl bg-card p-4 shadow-sm ring-1 ring-border"
            >
              <div className="flex items-start gap-3">
                <div
                  className={`mt-0.5 flex h-5 w-5 shrink-0 items-center justify-center rounded-full ${
                    done
                      ? "bg-primary text-primary-foreground"
                      : "border-2 border-muted-foreground/30"
                  }`}
                >
                  {done && <Check className="h-3 w-3" />}
                </div>
                <div className="min-w-0 flex-1">
                  <h3 className="text-[15px] font-semibold leading-snug text-foreground">
                    {s.title}
                  </h3>
                  <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                    {s.meaning}
                  </p>
                </div>
              </div>
              <div className="mt-3 flex gap-2">
                {done || skipped ? (
                  <button
                    onClick={() => undoSkill(s.id)}
                    className="h-10 flex-1 rounded-xl bg-secondary text-sm font-medium text-secondary-foreground"
                  >
                    Undo {done ? "completion" : "skip"}
                  </button>
                ) : (
                  <>
                    <button
                      onClick={() => markUsed(s.id)}
                      className="h-11 flex-1 rounded-xl bg-primary text-sm font-semibold text-primary-foreground"
                    >
                      Used Today
                    </button>
                    <button
                      onClick={() => markNotRelevant(s.id)}
                      className="h-11 rounded-xl bg-secondary px-3 text-sm font-medium text-secondary-foreground"
                    >
                      Not relevant
                    </button>
                  </>
                )}
              </div>
            </li>
          );
        })}
      </ul>
    </div>
  );
}
