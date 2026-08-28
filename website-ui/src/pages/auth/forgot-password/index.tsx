import { Link } from '@umijs/max';
import { Alert, Form, Input } from 'antd';
import { useState } from 'react';
import { YakButton } from '@/components/ui';
import AuthLayout from '@/layouts/AuthLayout';
import { requestPasswordReset } from '@/services/auth';

type ForgotPasswordFormValues = {
  email: string;
};

export default function ForgotPasswordPage() {
  const [submitting, setSubmitting] = useState(false);
  const [message, setMessage] = useState<string>();
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleSubmit = async (values: ForgotPasswordFormValues) => {
    setSubmitting(true);
    setMessage(undefined);
    setErrorMessage(undefined);
    try {
      const result = await requestPasswordReset(values.email);
      setMessage(result.message);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : '发送失败，请稍后重试');
    } finally {
      setSubmitting(false);
    }
  };

  return (
    <AuthLayout title="找回密码" description="输入注册邮箱，我们会发送一次性密码重置链接。">
      {message ? <Alert className="yak-auth-form__alert" type="success" message={message} showIcon /> : null}
      {errorMessage ? <Alert className="yak-auth-form__alert" type="error" message={errorMessage} showIcon /> : null}

      <Form<ForgotPasswordFormValues> className="yak-auth-form" layout="vertical" onFinish={handleSubmit} requiredMark={false}>
        <Form.Item
          label="邮箱"
          name="email"
          rules={[{ required: true, type: 'email', max: 128, message: '请输入有效邮箱（最多 128 个字符）' }]}
        >
          <Input autoComplete="email" maxLength={128} placeholder="you@example.com" />
        </Form.Item>
        <YakButton className="yak-auth-form__submit" htmlType="submit" loading={submitting} type="primary">
          发送重置链接
        </YakButton>
      </Form>

      <p className="yak-auth-form__footer">
        <Link to="/login">返回登录</Link>
      </p>
    </AuthLayout>
  );
}
