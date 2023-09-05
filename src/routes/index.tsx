import Home from '@/containers/Home';
import My from '@/components/my';
import Page404 from '@/containers/Page404';
import { ROUTE_KEY } from './menus';

export const ROUTER_COMPONENT = {
  [ROUTE_KEY.HOME]: Home,
  [ROUTE_KEY.MY]: My,
  [ROUTE_KEY.PAGE_404]: Page404,
};
