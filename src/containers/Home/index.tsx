import { Button } from 'antd';
import { useUserContext } from '@/hooks/userHooks';
import { ROUTE_KEY } from '@/routes/menus';
import { useGoTo } from '@/hooks';
import style from './index.module.less';

/**
* 首页
*/
const Home = () => {
  const { store } = useUserContext();
  const { go } = useGoTo();

  return (
    <div className={style.container}>
      <Button onClick={() => go(ROUTE_KEY.MY)}>
        去个人中心
        {store.tel}
      </Button>
    </div>
  );
};

export default Home;
