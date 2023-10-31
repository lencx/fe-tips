import { useRoutes } from 'react-router-dom';

import SafeMenu from './SafeMenu';
import Home from './Home';

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
    element: <Home />,
  },
];

export default function Routes2() {
  return useRoutes(routes);
}
