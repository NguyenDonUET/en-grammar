import { BookOpenText, ChartPie } from "lucide-react";
import { Link, useLocation } from "react-router";
import { LevelSwitcher } from "@/components/layout/LevelSwitcher";
import { SoundToggle } from "@/components/layout/SoundToggle";
import { Button } from "@/components/ui/button";
import { Tooltip, TooltipContent, TooltipTrigger } from "@/components/ui/tooltip";
import { cn } from "@/lib/utils";

export function AppHeader() {
  const { pathname } = useLocation();
  const onStats = pathname === "/stats";

  return (
    <header className="sticky top-0 z-20 border-b bg-background/80 backdrop-blur-md">
      <div className="mx-auto flex max-w-5xl flex-col gap-3 px-4 py-3 sm:flex-row sm:items-center sm:justify-between sm:px-6">
        <Link
          to="/"
          className="flex items-center gap-2.5 rounded-md font-semibold tracking-tight focus-visible:ring-[3px] focus-visible:ring-ring/50 focus-visible:outline-none"
        >
          <Tooltip>
            <TooltipTrigger asChild>
              <span className="flex size-9 items-center justify-center rounded-lg bg-primary text-primary-foreground">
                <BookOpenText className="size-5" aria-hidden />
              </span>
            </TooltipTrigger>
            <TooltipContent>Home</TooltipContent>
          </Tooltip>
          <span>English Grammar</span>
        </Link>
        <div className="flex items-center gap-1 sm:gap-2">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button
                variant="ghost"
                size="icon-sm"
                asChild
                className={cn(onStats && "bg-accent text-accent-foreground")}
              >
                <Link to="/stats" aria-current={onStats ? "page" : undefined} aria-label="Stats">
                  <ChartPie aria-hidden />
                </Link>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Stats</TooltipContent>
          </Tooltip>
          <SoundToggle />
          <LevelSwitcher />
        </div>
      </div>
    </header>
  );
}
