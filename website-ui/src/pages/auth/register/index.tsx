import { history, Link, useLocation } from '@umijs/max';
import { Alert, Form, Input } from 'antd';
import { useState } from 'react';
import { YakButton } from '@/components/ui';
import AuthLayout from '@/layouts/AuthLayout';
import { registerAccount } from '@/services/auth';

type RegisterFormValues = {
  email: string;
  password: string;
  confirmPassword: string;
};

export default function RegisterPage() {
  const location = useLocation();
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleSubmit = async (values: RegisterFormValues) => {
    setSubmitting(true);
    setErrorMessage(undefined);
    try {
      const query = new URLSearchParams(location.search);
      await registerAccount({
        email: values.email,
        password: values.password,
        source: 'website',
        utmSource: query.get('utm_source') || undefined,
        utmMedium: query.get('utm_medium') || undefined,
        utmCampaign: query.get('utm_campaign') || undefined,
      });
      history.push('/verify-email?sent=1');
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : '注册失败，请稍后重试');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout title="创建 Yak Ops 账号" description="注册后即可进入受保护的 Yak Ops 文档与开发者内容。">
      {errorMessage ? <Alert className="yak-auth-form__alert" type="error" message={errorMessage} showIcon /> : null}

      <Form<RegisterFormValues> className="yak-auth-form" layout="vertical" onFinish={handleSubmit} requiredMark={false}>
        <Form.Item
          label="邮箱"
          name="email"
          rules={[{ required: true, type: 'email', max: 128, message: '请输入有效邮箱（最多 128 个字符）' }]}
        >
          <Input autoComplete="email" maxLength={128} placeholder="you@example.com" />
        </Form.Item>
        <Form.Item label="密码" name="password" rules={[{ required: true, min: 8, max: 64, message: '密码长度需为 8～64 位' }]}>
          <Input.Password autoComplete="new-password" maxLength={64} placeholder="至少 8 位" />
        </Form.Item>
        <Form.Item
          dependencies={['password']}
          label="确认密码"
          name="confirmPassword"
          rules={[
            { required: true, message: '请再次输入密码' },
            ({ getFieldValue }) => ({
              validator(_, value) {
                return !value || getFieldValue('password') === value
                  ? Promise.resolve()
                  : Promise.reject(new Error('两次输入的密码不一致'));
              },
            }),
          ]}
        >
          <Input.Password autoComplete="new-password" maxLength={64} placeholder="再次输入密码" />
        </Form.Item>
        <YakButton className="yak-auth-form__submit" htmlType="submit" loading={submitting} type="primary">
          创建账号
        </YakButton>
      </Form>

      <p className="yak-auth-form__footer">
        已有账号？ <Link to="/login">直接登录</Link>
      </p>
    </AuthLayout>
  );
}
