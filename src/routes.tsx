import { useRoutes, RouteObject } from 'react-router-dom';

import SafeMenu from './SafeMenu';
import PasswordConfirmation from './PasswordConfirmation';
import Home from './Home';

const routes: RouteObject[] = [
  {
    path: '/safe-menu',
    element: <SafeMenu />,
  },
  {
    path: '/password-confirmation',
    element: <PasswordConfirmation />,
  },
  {
    path: '/',
    element: <Home />,
  },
];

export default function Routes() {
  return useRoutes(routes);
}
