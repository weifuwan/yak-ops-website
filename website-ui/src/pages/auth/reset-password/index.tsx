import { Link, useLocation } from '@umijs/max';
import { Alert, Form, Input } from 'antd';
import { useState } from 'react';
import { YakButton } from '@/components/ui';
import AuthLayout from '@/layouts/AuthLayout';
import { resetPassword } from '@/services/auth';

type ResetPasswordFormValues = {
  password: string;
  confirmPassword: string;
};

export default function ResetPasswordPage() {
  const location = useLocation();
  const token = new URLSearchParams(location.search).get('token');
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleSubmit = async (values: ResetPasswordFormValues) => {
    if (!token) {
      setErrorMessage('重置链接无效');
      return;
    }
    setSubmitting(true);
    setMessage(undefined);
    setErrorMessage(undefined);
    try {
      const result = await resetPassword(token, values.password);
      setMessage(result.message);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : '密码重置失败');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout title="设置新密码" description="重置成功后，现有登录状态会失效，请重新登录。">
      {!token ? <Alert className="yak-auth-form__alert" type="error" message="重置链接无效" showIcon /> : null}
      {message ? <Alert className="yak-auth-form__alert" type="success" message={message} showIcon /> : null}
      {errorMessage ? <Alert className="yak-auth-form__alert" type="error" message={errorMessage} showIcon /> : null}

      {message ? (
        <YakButton className="yak-auth-form__submit" href="/login" type="primary">
          使用新密码登录
        </YakButton>
      ) : (
        <Form<ResetPasswordFormValues> className="yak-auth-form" layout="vertical" onFinish={handleSubmit} requiredMark={false}>
          <Form.Item label="新密码" name="password" rules={[{ required: true, min: 8, max: 64, message: '密码长度需为 8～64 位' }]}>
            <Input.Password autoComplete="new-password" maxLength={64} placeholder="8～64 位" />
          </Form.Item>
          <Form.Item
            dependencies={['password']}
            label="确认新密码"
            name="confirmPassword"
            rules={[
              { required: true, message: '请再次输入新密码' },
              ({ getFieldValue }) => ({
                validator(_, value) {
                  return !value || getFieldValue('password') === value
                    ? Promise.resolve()
                    : Promise.reject(new Error('两次输入的密码不一致'));
                },
              }),
            ]}
          >
            <Input.Password autoComplete="new-password" maxLength={64} placeholder="再次输入新密码" />
          </Form.Item>
          <YakButton className="yak-auth-form__submit" disabled={!token} htmlType="submit" loading={submitting} type="primary">
            重置密码
          </YakButton>
        </Form>
      )}

      <p className="yak-auth-form__footer">
        <Link to="/login">返回登录</Link>
      </p>
    </AuthLayout>
  );
}
