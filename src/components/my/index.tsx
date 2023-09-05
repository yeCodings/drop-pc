import { useUserContext } from '@/hooks/userHooks';

/**
* 个人中心
*/
const My = () => {
  const { store } = useUserContext();

  return (
    <div>
      {store.tel}
      个人中心
    </div>
  );
};

export default My;
