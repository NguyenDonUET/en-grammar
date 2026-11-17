import { Outlet, useLocation } from 'react-router'
import { AppHeader } from '@/components/layout/AppHeader'

export function RootLayout() {
  const { pathname } = useLocation()

  return (
    <div className="min-h-svh bg-background">
      <a
        href="#main"
        className="bg-primary text-primary-foreground focus-visible:ring-ring/50 sr-only focus:not-sr-only focus:absolute focus:top-3 focus:left-3 focus:z-50 focus:rounded-md focus:px-4 focus:py-2 focus-visible:ring-[3px] focus-visible:outline-none"
      >
        Skip to content
      </a>
      <AppHeader />
      <main
        id="main"
        tabIndex={-1}
        className="mx-auto max-w-5xl px-4 py-8 outline-none sm:px-6 sm:py-10"
      >
        <div
          key={pathname}
          className="motion-safe:animate-in motion-safe:fade-in motion-safe:slide-in-from-bottom-2 motion-safe:duration-300"
        >
          <Outlet />
        </div>
      </main>
    </div>
  )
}
