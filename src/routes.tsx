import { useRoutes } from 'react-router-dom';

import SafeMenu from './SafeMenu';

export type RouteMetaObject = {
  icon?: React.ReactNode;
  title?: string;
};

type RouteObject = {
  path: string;
  element?: JSX.Element;
  children?: RouteObject[];
};

const routes: RouteObject[] = [
  {
    path: '/safe-menu',
    element: <SafeMenu />,
  },
  {
    path: '/',
    element: <SafeMenu />,
  },
];

export default function Routes2() {
  return useRoutes(routes);
}
