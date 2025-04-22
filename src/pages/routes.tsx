import { lazy } from 'react';
import { RouteObject } from 'react-router';

// lazy page loading
const HomePage = lazy(() => import('@/pages/Home/Home'));
const ItemPage = lazy(() => import("@/pages/VacancyDetails/VacancyDetails"));
const NotFoundPage = lazy(() => import('@/pages/NotFound/NotFound'));

type AppRoute = RouteObject & {
  path: string;
  element: React.ReactNode;
};

export const routesPaths = {
  home: '/',
  vacancy: '/vacancy/',
};

const routes: AppRoute[] = [
  { path: routesPaths.home, element: <HomePage /> },
  { path: `${routesPaths.vacancy}:vacancyID`, element: <ItemPage /> },
  { path: '*', element: <NotFoundPage /> },
];

export default routes;
