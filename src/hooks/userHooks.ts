import { useQuery } from '@apollo/client';
import { GET_USER } from '@/graphql/user';
import { useLocation, useNavigate } from 'react-router-dom';
import { connectFactory, useAppContext } from '@/utils/contextFactory';
import { IUser } from '@/utils/types';

const KEY = 'userInfo';
const DEFAULT_VALUE = {

};

export const useUserContext = () => useAppContext(KEY);

export const connect = connectFactory(KEY, DEFAULT_VALUE);

export const useGetUser = () => {
  const { setStore } = useUserContext();
  const location = useLocation();
  const nav = useNavigate();

  const { loading, refetch } = useQuery<{ getUserInfo: IUser }>(GET_USER, {
    onCompleted: (data) => {
      if (data.getUserInfo) {
        const { id, tel, name } = data.getUserInfo;
        setStore({ id, tel, name });

        // 当前在登录页面，且已登录，则直接跳转首页
        if (location.pathname === '/login') {
          nav('/');
        }
        return;
      }

      setStore({ refetchHandler: refetch });
      // 如果不在登录页面，目前没有登录，则直接跳转到登录页面
      if (location.pathname !== '/login') {
        nav(`/login?orgUrl=${location.pathname}`);
      }
    },
    onError: () => {
      setStore({ refetchHandler: refetch });
      // 如果不在登录页面，但是目前登录异常，则直接跳转到登录页面
      if (location.pathname !== '/login') {
        nav(`/login?orgUrl=${location.pathname}`);
      }
    },
  });
  return { loading, refetch };
};
