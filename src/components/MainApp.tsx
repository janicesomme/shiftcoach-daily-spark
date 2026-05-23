import { useState } from "react";
import { BottomNav } from "./BottomNav";
import { TodayScreen } from "./screens/TodayScreen";
import { CategoriesScreen } from "./screens/CategoriesScreen";
import { ProgressScreen } from "./screens/ProgressScreen";
import { HistoryScreen } from "./screens/HistoryScreen";
import { SettingsScreen } from "./screens/SettingsScreen";

export type TabId = "today" | "categories" | "progress" | "history" | "settings";

export function MainApp() {
  const [tab, setTab] = useState<TabId>("today");

  return (
    <>
      {tab === "today" && <TodayScreen />}
      {tab === "categories" && <CategoriesScreen />}
      {tab === "progress" && <ProgressScreen />}
      {tab === "history" && <HistoryScreen />}
      {tab === "settings" && <SettingsScreen />}
      <BottomNav active={tab} onChange={setTab} />
    </>
  );
}
