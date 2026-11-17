import { BookOpenText } from "lucide-react";
import { Link } from "react-router";
import { LevelSwitcher } from "@/components/layout/LevelSwitcher";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-2.5 font-semibold tracking-tight"
        >
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <BookOpenText className="size-5" aria-hidden />
          </span>
          <span>English Grammar</span>
        </Link>
        <LevelSwitcher />
      </div>
    </header>
  );
}
