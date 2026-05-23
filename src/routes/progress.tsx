import { createFileRoute } from "@tanstack/react-router";
import { useMemo } from "react";
import { Flame, Trophy } from "lucide-react";
import { CATEGORIES } from "@/lib/skills-data";
import {
  computeBestStreak,
  computeStreak,
  countInRange,
  startOfMonth,
  startOfWeek,
  todayKey,
  useStore,
} from "@/lib/storage";

export const Route = createFileRoute("/progress")({
  head: () => ({
    meta: [
      { title: "Progress — Shift Coach" },
      { name: "description", content: "See your weekly progress and streaks." },
    ],
  }),
  component: ProgressPage,
});

function ProgressPage() {
  const { store } = useStore();

  const stats = useMemo(() => {
    const now = new Date();
    const todayCount = store.days[todayKey(now)]?.completed.length ?? 0;
    const weekStart = startOfWeek(now);
    const monthStart = startOfMonth(now);
    const weekCount = countInRange(store, weekStart, now);
    const monthCount = countInRange(store, monthStart, now);
    const streak = computeStreak(store, now);
    const best = computeBestStreak(store);

    // bar chart days mon-sun
    const days: { label: string; count: number; isToday: boolean }[] = [];
    const labels = ["M", "T", "W", "T", "F", "S", "S"];
    for (let i = 0; i < 7; i++) {
      const d = new Date(weekStart);
      d.setDate(weekStart.getDate() + i);
      const key = todayKey(d);
      days.push({
        label: labels[i],
        count: store.days[key]?.completed.length ?? 0,
        isToday: key === todayKey(now),
      });
    }

    // category counts this week
    const cats = CATEGORIES.map((c) => {
      let n = 0;
      const d = new Date(weekStart);
      while (d <= now) {
        const completed = store.days[todayKey(d)]?.completed ?? [];
        n += c.skills.filter((s) => completed.includes(s.id)).length;
        d.setDate(d.getDate() + 1);
      }
      return { name: c.name, short: c.short, count: n, total: c.skills.length };
    });

    return { todayCount, weekCount, monthCount, streak, best, days, cats };
  }, [store]);

  const maxBar = Math.max(1, ...stats.days.map((d) => d.count));

  return (
    <div className="space-y-6">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Progress</h1>
        <p className="text-sm text-muted-foreground">Your practice over time.</p>
      </header>

      <section className="grid grid-cols-2 gap-3">
        <StatCard label="Today" value={stats.todayCount} />
        <StatCard label="This week" value={stats.weekCount} />
        <StatCard label="This month" value={stats.monthCount} />
        <StatCard
          label="Current streak"
          value={stats.streak}
          suffix={stats.streak === 1 ? "day" : "days"}
          icon={<Flame className="h-3.5 w-3.5" />}
        />
        <StatCard
          label="Best streak"
          value={stats.best}
          suffix={stats.best === 1 ? "day" : "days"}
          icon={<Trophy className="h-3.5 w-3.5" />}
        />
      </section>

      <section className="rounded-2xl bg-card p-4 shadow-sm ring-1 ring-border">
        <div className="flex items-baseline justify-between">
          <h2 className="text-sm font-semibold text-foreground">This week</h2>
          <span className="text-xs text-muted-foreground">{stats.weekCount} skills</span>
        </div>
        <div className="mt-4 flex h-32 items-end justify-between gap-2">
          {stats.days.map((d, i) => (
            <div key={i} className="flex flex-1 flex-col items-center gap-1.5">
              <div className="flex h-full w-full items-end">
                <div
                  className={`w-full rounded-t-md transition-all ${
                    d.isToday ? "bg-primary" : "bg-primary/30"
                  }`}
                  style={{ height: `${(d.count / maxBar) * 100}%`, minHeight: d.count > 0 ? 4 : 0 }}
                />
              </div>
              <div className="text-[10px] font-medium text-muted-foreground">{d.count}</div>
              <div className={`text-[11px] ${d.isToday ? "font-semibold text-foreground" : "text-muted-foreground"}`}>
                {d.label}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section className="space-y-2">
        <h2 className="px-1 text-sm font-semibold text-foreground">Categories this week</h2>
        <ul className="space-y-2">
          {stats.cats.map((c) => (
            <li
              key={c.name}
              className="flex items-center justify-between rounded-2xl bg-card px-4 py-3 shadow-sm ring-1 ring-border"
            >
              <div className="min-w-0 text-sm font-medium text-foreground">{c.name}</div>
              <div className="shrink-0 text-sm tabular-nums text-muted-foreground">
                {c.count}
              </div>
            </li>
          ))}
        </ul>
      </section>
    </div>
  );
}

function StatCard({
  label,
  value,
  suffix,
  icon,
}: {
  label: string;
  value: number;
  suffix?: string;
  icon?: React.ReactNode;
}) {
  return (
    <div className="rounded-2xl bg-card p-4 shadow-sm ring-1 ring-border">
      <div className="flex items-center gap-1 text-xs font-medium uppercase tracking-wide text-muted-foreground">
        {icon}
        {label}
      </div>
      <div className="mt-1 flex items-baseline gap-1">
        <span className="text-2xl font-bold text-foreground">{value}</span>
        {suffix && <span className="text-sm text-muted-foreground">{suffix}</span>}
      </div>
    </div>
  );
}
