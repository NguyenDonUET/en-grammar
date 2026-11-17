import { BookOpenText } from "lucide-react";
import { Link } from "react-router";
import { LevelSwitcher } from "@/components/layout/LevelSwitcher";
import { SoundToggle } from "@/components/layout/SoundToggle";

export function AppHeader() {
  return (
    <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-2.5 rounded-md font-semibold tracking-tight focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
            <BookOpenText className="size-5" aria-hidden />
          </span>
          <span>English Grammar</span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          <SoundToggle />
          <LevelSwitcher />
        </div>
      </div>
    </header>
  );
}
