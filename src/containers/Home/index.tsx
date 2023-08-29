import style from './index.module.less';
import { useUserContext } from '../../utils/userHooks';

/**
* 首页
*/
const Home = () => {
  const { store } = useUserContext();
  return (
    <div className={style.container}>
      首页:
      {store.tel}
    </div>
  );
};

export default Home;
