import { useUserContext } from '@/hooks/userHooks';
import style from './index.module.less';

/**
* 首页
*/
const Home = () => {
  const { store } = useUserContext();
  return (
    <div className={style.container}>
      Home:
      {' '}
      {store.tel}
    </div>
  );
};

export default Home;
