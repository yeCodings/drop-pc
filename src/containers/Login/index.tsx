/* eslint-disable import/no-extraneous-dependencies */
/* eslint-disable react-refresh/only-export-components */
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
  message, Tabs,
} from 'antd';
import styles from './index.module.less';

export default () => (
  <div className={styles.container}>
    <LoginFormPage
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
          name="mobile"
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
          name="captcha"
          rules={[
            {
              required: true,
              message: '请输入验证码！',
            },
          ]}
          onGetCaptcha={async () => {
            message.success('获取验证码成功！验证码为：1234');
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
