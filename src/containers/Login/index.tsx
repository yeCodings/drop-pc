import {
  LockOutlined,
  MobileOutlined,
} from '@ant-design/icons';
import {
  LoginFormPage,
  ProFormCaptcha,
  ProFormCheckbox,
  ProFormText,
} from '@ant-design/pro-components';
import {
  Tabs, TabsProps, message,
} from 'antd';
import { useMutation } from '@apollo/client';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { AUTH_TOKEN } from '@/utils/constants';
import { LOGIN, SEND_CODE_MSG } from '@/graphql/auth';
import { useUserContext } from '@/hooks/userHooks';
import { useTitle } from '@/hooks';
import styles from './index.module.less';

interface IValue {
  tel:string;
  code: string;
  autoLogin: boolean;
}

export const Login = () => {
  const [run] = useMutation(SEND_CODE_MSG);
  const [login] = useMutation(LOGIN);
  const nav = useNavigate();
  const { store } = useUserContext();
  const [params] = useSearchParams();
  useTitle('登录');

  const loginHandler = async (values: IValue) => {
    const res = await login({
      variables: values,
    });
    if (res.data.login.code === 200) {
      // 登录成功后，刷新页面获取最新的状态
      store.refetchHandler();
      if (values.autoLogin) {
        sessionStorage.setItem(AUTH_TOKEN, '');
        localStorage.setItem(AUTH_TOKEN, res.data.login.data);
      } else {
        localStorage.setItem(AUTH_TOKEN, '');
        sessionStorage.setItem(AUTH_TOKEN, res.data.login.data);
      }

      message.success(res.data.login.message);
      nav(params.get('orgUrl') || '/');
      return;
    }
    message.error(res.data.login.message);
  };

  const items: TabsProps['items'] = [
    {
      key: '1',
      label: '手机号登录',
    },
  ];

  return (
    <div className={styles.container}>
      <LoginFormPage
        onFinish={loginHandler}
        backgroundImageUrl="http://drop-server-assets.oss-cn-shanghai.aliyuncs.com/images/1693009987013.jpeg"
        logo="http://drop-server-assets.oss-cn-shanghai.aliyuncs.com/images/1692974748988.jpg"
      >
        <div><h2 className={styles.title}>绝命码师管理系统</h2></div>
        <Tabs centered items={items}>
          {/* TabPane 即将废弃 使用items */}
          {/* <Tabs.TabPane key="phone" tab="手机号登录" /> */}
        </Tabs>
        <>
          <ProFormText
            fieldProps={{
              size: 'large',
              prefix: <MobileOutlined className="prefixIcon" />,
            }}
            name="tel"
            placeholder="手机号"
            initialValue={store.tel}
            rules={[
              {
                required: true,
                message: '请输入手机号！',
              },
              {
                pattern: /^1\d{10}$/,
                message: '手机号格式错误！',
              },
            ]}
          />
          <ProFormCaptcha
            fieldProps={{
              size: 'large',
              prefix: <LockOutlined className="prefixIcon" />,
            }}
            captchaProps={{
              size: 'large',
            }}
            placeholder="请输入验证码"
            captchaTextRender={(timing, count) => {
              if (timing) {
                return `${count} ${'获取验证码'}`;
              }
              return '获取验证码';
            }}
            phoneName="tel"
            name="code"
            rules={[
              {
                required: true,
                message: '请输入验证码！',
              },
            ]}
            onGetCaptcha={async (tel: string) => {
              const res = await run({
                variables: {
                  tel,
                },
              });
              if (res.data.sendCodeMsg === 200) {
                message.success(res.data.login.message);
              } else {
                message.error(res.data.login.message);
              }
            }}
          />
        </>
        <div
          style={{
            marginBlockEnd: 24,
          }}
        >
          <ProFormCheckbox noStyle name="autoLogin">
            自动登录
          </ProFormCheckbox>
        </div>
      </LoginFormPage>
    </div>
  );
};
