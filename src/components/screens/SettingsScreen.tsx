import { useState } from "react";
import { AlertTriangle, RotateCcw, Trash2 } from "lucide-react";
import { resetAll, resetToday } from "@/lib/storage";

export function SettingsScreen() {
  const [confirmAll, setConfirmAll] = useState(false);
  const [toast, setToast] = useState<string | null>(null);

  const flash = (msg: string) => {
    setToast(msg);
    setTimeout(() => setToast(null), 2000);
  };

  return (
    <div className="space-y-5">
      <header>
        <h1 className="text-2xl font-bold tracking-tight text-foreground">Settings</h1>
        <p className="text-sm text-muted-foreground">Manage local data.</p>
      </header>

      <section className="space-y-2">
        <button
          onClick={() => {
            resetToday();
            flash("Today's checklist reset.");
          }}
          className="flex w-full items-center gap-3 rounded-2xl bg-card p-4 text-left shadow-sm ring-1 ring-border active:scale-[0.99]"
        >
          <div className="flex h-10 w-10 items-center justify-center rounded-full bg-secondary text-secondary-foreground">
            <RotateCcw className="h-5 w-5" />
          </div>
          <div>
            <div className="text-sm font-semibold text-foreground">
              Reset today's checklist
            </div>
            <div className="text-xs text-muted-foreground">Clears today only.</div>
          </div>
        </button>

        {confirmAll ? (
          <div className="rounded-2xl bg-card p-4 shadow-sm ring-1 ring-destructive/40">
            <div className="flex items-start gap-2">
              <AlertTriangle className="mt-0.5 h-4 w-4 text-destructive" />
              <div className="text-sm text-foreground">
                Erase all history, streaks, and completions on this device?
              </div>
            </div>
            <div className="mt-3 flex gap-2">
              <button
                onClick={() => {
                  resetAll();
                  setConfirmAll(false);
                  flash("All local data cleared.");
                }}
                className="h-10 flex-1 rounded-xl bg-destructive text-sm font-semibold text-destructive-foreground"
              >
                Erase everything
              </button>
              <button
                onClick={() => setConfirmAll(false)}
                className="h-10 flex-1 rounded-xl bg-secondary text-sm font-medium text-secondary-foreground"
              >
                Cancel
              </button>
            </div>
          </div>
        ) : (
          <button
            onClick={() => setConfirmAll(true)}
            className="flex w-full items-center gap-3 rounded-2xl bg-card p-4 text-left shadow-sm ring-1 ring-border active:scale-[0.99]"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-destructive/10 text-destructive">
              <Trash2 className="h-5 w-5" />
            </div>
            <div>
              <div className="text-sm font-semibold text-foreground">
                Reset all local data
              </div>
              <div className="text-xs text-muted-foreground">
                Removes history and streaks.
              </div>
            </div>
          </button>
        )}
      </section>

      <section className="rounded-2xl bg-muted/50 p-4 text-xs text-muted-foreground">
        V1 stores data on this device only. Sign-in and cross-device sync may come later.
      </section>

      {toast && (
        <div className="fixed bottom-24 left-1/2 z-50 -translate-x-1/2 rounded-full bg-foreground px-4 py-2 text-xs font-medium text-background shadow-lg">
          {toast}
        </div>
      )}
    </div>
  );
}
