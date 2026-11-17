import { createBrowserRouter, redirect } from 'react-router'
import { RootLayout } from '@/layouts/RootLayout'
import { ConceptPage, conceptLoader } from '@/pages/ConceptPage'
import { LevelPage, levelLoader } from '@/pages/LevelPage'

export const router = createBrowserRouter([
  {
    path: '/',
    Component: RootLayout,
    children: [
      { index: true, loader: () => redirect('/b1') },
      { path: ':level', Component: LevelPage, loader: levelLoader },
      {
        path: ':level/:unitId',
        Component: ConceptPage,
        loader: conceptLoader,
      },
      {
        path: 'learn/:level/:unitId',
        loader: ({ params }) => redirect(`/${params.level}/${params.unitId}`),
      },
      { path: '*', loader: () => redirect('/b1') },
    ],
  },
])
