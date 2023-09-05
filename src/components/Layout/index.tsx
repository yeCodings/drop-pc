import { MenuDataItem, PageContainer, ProLayout } from '@ant-design/pro-components';
import { Link, useNavigate, useOutlet } from 'react-router-dom';
import { useUserContext } from '@/hooks/userHooks';
import { AUTH_TOKEN } from '@/utils/constants';
import { routes } from '@/routes/menus';
import style from './index.module.less';

const menuItemRender = (
  item:MenuDataItem,
  dom: React.ReactNode,
) => <Link to={item.path || '/'}>{dom}</Link>;

/**
* 外层框架
*/
const Layout = () => {
  const outlet = useOutlet();
  const { store } = useUserContext();
  const nav = useNavigate();

  // 点击头像退出登录，跳转到登录页面
  const logout = () => {
    sessionStorage.setItem(AUTH_TOKEN, '');
    localStorage.setItem(AUTH_TOKEN, '');
    nav('/login');
  };

  return (
    <ProLayout
      layout="mix"
      siderWidth={130}
      avatarProps={{
        src: 'http://drop-server-assets.oss-cn-shanghai.aliyuncs.com/images/1692974748988.jpg',
        title: store.tel,
        size: 'small',
        onClick: logout,
      }}
      title="绝命码师"
      // logo={(
      //   <img
      //     src="https://drop-server-assets.oss-cn-shanghai.aliyuncs.com/images/1692936225225.jpeg"
      //     alt="logo"
      //   />
      // )}
      className={style.container}
      onMenuHeaderClick={() => nav('/')}
      route={{
        path: '/',
        routes,
      }}
      menuItemRender={menuItemRender}
    >
      <PageContainer>
        {outlet}
      </PageContainer>
    </ProLayout>
  );
};

export default Layout;
