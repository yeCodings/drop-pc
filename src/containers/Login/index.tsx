/* eslint-disable react-refresh/only-export-components */
/* eslint-disable import/no-extraneous-dependencies */
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
  Tabs, message,
} from 'antd';
import { useMutation } from '@apollo/client';
import styles from './index.module.less';
import { LOGIN, SEND_CODE_MSG } from '../../graphql/auth';

// const items: TabsProps['items'] = [
//   {
//     key: 'phone',
//     label: '手机号登录',
//     children: 'Content of Tab Pane 1',
//   },
// ];

interface IValue {
  tel:string;
  code: string;
}

export default () => {
  const [run] = useMutation(SEND_CODE_MSG);
  const [login] = useMutation(LOGIN);

  const loginHandler = async (values: IValue) => {
    const res = await login({
      variables: values,
    });
    if (res.data.login) {
      message.success('登录成功');
      return;
    }
    message.error('登录失败');
    console.log('🚀 ~ file: index.tsx:41 ~ loginHandler ~ res:', res);
  };
  return (
    <div className={styles.container}>
      <LoginFormPage
        onFinish={loginHandler}
        backgroundImageUrl="http://drop-server-assets.oss-cn-shanghai.aliyuncs.com/images/1693009987013.jpeg"
        logo="http://drop-server-assets.oss-cn-shanghai.aliyuncs.com/images/1692974748988.jpg"
      >
        <div><h2 className={styles.title}>绝命码师管理系统</h2></div>
        <Tabs centered>
          <Tabs.TabPane key="phone" tab="手机号登录" />
        </Tabs>
        <>
          <ProFormText
            fieldProps={{
              size: 'large',
              prefix: <MobileOutlined className="prefixIcon" />,
            }}
            name="tel"
            placeholder="手机号"
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
              if (res.data.sendCodeMsg) {
                message.success('获取验证码成功');
              } else {
                message.error('获取验证码失败');
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
