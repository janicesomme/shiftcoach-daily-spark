import { createFileRoute } from "@tanstack/react-router";
import { MainApp } from "@/components/MainApp";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Shift Coach" },
      {
        name: "description",
        content: "Practice required leadership skills during your Starbucks shift.",
      },
    ],
  }),
  component: MainApp,
});
