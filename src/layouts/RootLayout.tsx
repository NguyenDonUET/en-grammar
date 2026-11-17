import { Outlet } from 'react-router'
import { AppHeader } from '@/components/layout/AppHeader'

export function RootLayout() {
  return (
    <div className="min-h-svh bg-background">
      <AppHeader />
      <main className="mx-auto max-w-5xl px-4 py-8 sm:px-6 sm:py-10">
        <Outlet />
      </main>
    </div>
  )
}
