import { getRouteByKey, routes } from '@/routes/menus';
import { useEffect, useMemo } from 'react';
import { matchPath, useLocation, useNavigate } from 'react-router-dom';

export const useTitle = (title: string) => {
  useEffect(() => {
    document.title = title;
  }, []);
};

/**
 *  通用页面跳转器
 * @returns `{back, go}`
 */
export const useGoTo = () => {
  const nav = useNavigate();

  // 上一页
  const back = () => nav(-1);

  // 根据key跳转到相应的路由页面
  const go = (
    pageKey: string,
    params?: Record<string, string | number>,
  ) => {
    if (!pageKey) {
      nav('/');
      return;
    }

    const route = getRouteByKey(pageKey);

    if (route && route.path) {
      if (!params) {
        nav(`/${route.path}`);
        return;
      }

      //  /page/:id params: {id: 1} => /page/1
      const url = route.path.replace(
        /\/:(\w+)/g,
        (exp: string, exp1: string) => `/${params[exp1]}`,
      );
      nav(`/${url}`);
    }
  };
  return { back, go };
};

/**
 * 获取当前 URL匹配的路由
 * @returns `route`
 */
export const useMatchedRoute = () => {
  const r = useLocation();
  const route = useMemo(() => routes.find(
    (item) => matchPath(item.path, r.pathname),
  ), [r.pathname]);

  return route;
};
