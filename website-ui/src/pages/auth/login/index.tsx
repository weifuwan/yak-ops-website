import { history, Link, useLocation } from '@umijs/max';
import { Alert, Form, Input } from 'antd';
import { useState } from 'react';
import { YakButton } from '@/components/ui';
import AuthLayout from '@/layouts/AuthLayout';
import { loginAccount } from '@/services/auth';
import { getSafeReturnTo } from '@/utils/redirect';

type LoginFormValues = {
  email: string;
  password: string;
};

export default function LoginPage() {
  const location = useLocation();
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleSubmit = async (values: LoginFormValues) => {
    setSubmitting(true);
    setErrorMessage(undefined);
    try {
      await loginAccount(values);
      const returnTo = getSafeReturnTo(new URLSearchParams(location.search).get('returnTo'));
      history.push(returnTo);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : '登录失败，请稍后重试');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout title="登录 Yak Ops" description="使用注册邮箱登录，继续访问 Yak Ops 开发者内容。">
      {errorMessage ? <Alert className="yak-auth-form__alert" type="error" message={errorMessage} showIcon /> : null}

      <Form<LoginFormValues> className="yak-auth-form" layout="vertical" onFinish={handleSubmit} requiredMark={false}>
        <Form.Item
          label="邮箱"
          name="email"
          rules={[{ required: true, type: 'email', max: 128, message: '请输入有效邮箱（最多 128 个字符）' }]}
        >
          <Input autoComplete="email" maxLength={128} placeholder="you@example.com" />
        </Form.Item>
        <Form.Item label="密码" name="password" rules={[{ required: true, min: 8, max: 64, message: '密码长度需为 8～64 位' }]}>
          <Input.Password autoComplete="current-password" maxLength={64} placeholder="输入密码" />
        </Form.Item>
        <div className="yak-auth-form__row">
          <Link className="yak-auth-form__link" to="/forgot-password">
            忘记密码？
          </Link>
        </div>
        <YakButton className="yak-auth-form__submit" htmlType="submit" loading={submitting} type="primary">
          登录
        </YakButton>
      </Form>

      <p className="yak-auth-form__footer">
        还没有账号？ <Link to="/register">创建账号</Link>
      </p>
    </AuthLayout>
  );
}
