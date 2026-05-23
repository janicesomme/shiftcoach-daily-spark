import { useEffect, useState, useCallback } from "react";

export type DayRecord = {
  completed: string[];
  notRelevant: string[];
};

export type Store = {
  days: Record<string, DayRecord>; // key: YYYY-MM-DD
};

const KEY = "shiftcoach:v1";

export function todayKey(d = new Date()): string {
  const y = d.getFullYear();
  const m = String(d.getMonth() + 1).padStart(2, "0");
  const day = String(d.getDate()).padStart(2, "0");
  return `${y}-${m}-${day}`;
}

export function formatToday(d = new Date()): string {
  return d.toLocaleDateString(undefined, {
    weekday: "long",
    month: "long",
    day: "numeric",
  });
}

function emptyStore(): Store {
  return { days: {} };
}

function read(): Store {
  if (typeof window === "undefined") return emptyStore();
  try {
    const raw = window.localStorage.getItem(KEY);
    if (!raw) return emptyStore();
    const parsed = JSON.parse(raw);
    if (!parsed || typeof parsed !== "object" || !parsed.days) return emptyStore();
    return parsed as Store;
  } catch {
    return emptyStore();
  }
}

function write(s: Store) {
  if (typeof window === "undefined") return;
  window.localStorage.setItem(KEY, JSON.stringify(s));
  window.dispatchEvent(new Event("shiftcoach:update"));
}

export function ensureDay(s: Store, key: string): DayRecord {
  if (!s.days[key]) s.days[key] = { completed: [], notRelevant: [] };
  return s.days[key];
}

export function useStore() {
  const [store, setStore] = useState<Store>(emptyStore);

  useEffect(() => {
    setStore(read());
    const handler = () => setStore(read());
    window.addEventListener("shiftcoach:update", handler);
    window.addEventListener("storage", handler);
    return () => {
      window.removeEventListener("shiftcoach:update", handler);
      window.removeEventListener("storage", handler);
    };
  }, []);

  const update = useCallback((fn: (s: Store) => void) => {
    const next = read();
    fn(next);
    write(next);
    setStore(next);
  }, []);

  return { store, update };
}

export function markUsed(skillId: string, dateKey = todayKey()) {
  const s = read();
  const day = ensureDay(s, dateKey);
  if (!day.completed.includes(skillId)) day.completed.push(skillId);
  day.notRelevant = day.notRelevant.filter((id) => id !== skillId);
  write(s);
}

export function markNotRelevant(skillId: string, dateKey = todayKey()) {
  const s = read();
  const day = ensureDay(s, dateKey);
  if (!day.notRelevant.includes(skillId)) day.notRelevant.push(skillId);
  day.completed = day.completed.filter((id) => id !== skillId);
  write(s);
}

export function undoSkill(skillId: string, dateKey = todayKey()) {
  const s = read();
  const day = ensureDay(s, dateKey);
  day.completed = day.completed.filter((id) => id !== skillId);
  day.notRelevant = day.notRelevant.filter((id) => id !== skillId);
  write(s);
}

export function resetToday() {
  const s = read();
  delete s.days[todayKey()];
  write(s);
}

export function resetAll() {
  if (typeof window === "undefined") return;
  window.localStorage.removeItem(KEY);
  window.dispatchEvent(new Event("shiftcoach:update"));
}

// Streak: consecutive calendar days (ending today or yesterday) with >=1 completion
export function computeStreak(store: Store, today = new Date()): number {
  let streak = 0;
  const d = new Date(today);
  // If today has none, start counting from yesterday
  const todayK = todayKey(d);
  if (!(store.days[todayK]?.completed?.length)) {
    d.setDate(d.getDate() - 1);
  }
  while (true) {
    const k = todayKey(d);
    if (store.days[k]?.completed?.length) {
      streak++;
      d.setDate(d.getDate() - 1);
    } else {
      break;
    }
  }
  return streak;
}

export function computeBestStreak(store: Store): number {
  const keys = Object.keys(store.days)
    .filter((k) => store.days[k].completed.length > 0)
    .sort();
  if (keys.length === 0) return 0;
  let best = 1;
  let cur = 1;
  for (let i = 1; i < keys.length; i++) {
    const prev = new Date(keys[i - 1]);
    const curr = new Date(keys[i]);
    const diff = Math.round((curr.getTime() - prev.getTime()) / 86400000);
    if (diff === 1) {
      cur++;
      best = Math.max(best, cur);
    } else {
      cur = 1;
    }
  }
  return best;
}

export function countInRange(store: Store, start: Date, end: Date): number {
  let n = 0;
  const d = new Date(start);
  while (d <= end) {
    n += store.days[todayKey(d)]?.completed.length ?? 0;
    d.setDate(d.getDate() + 1);
  }
  return n;
}

export function startOfWeek(d = new Date()): Date {
  // Monday start
  const date = new Date(d);
  date.setHours(0, 0, 0, 0);
  const day = (date.getDay() + 6) % 7; // 0=Mon
  date.setDate(date.getDate() - day);
  return date;
}

export function startOfMonth(d = new Date()): Date {
  return new Date(d.getFullYear(), d.getMonth(), 1);
}
