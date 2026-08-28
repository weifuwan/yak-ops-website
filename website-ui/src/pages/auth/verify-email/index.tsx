import { Link, useLocation } from '@umijs/max';
import { Alert, Form, Input } from 'antd';
import { useEffect, useRef, useState } from 'react';
import { YakButton } from '@/components/ui';
import AuthLayout from '@/layouts/AuthLayout';
import { resendVerificationEmail, verifyAccountEmail } from '@/services/auth';

type ResendFormValues = {
  email: string;
};

type VerifyState = 'idle' | 'checking' | 'success' | 'error';

export default function VerifyEmailPage() {
  const location = useLocation();
  const query = new URLSearchParams(location.search);
  const token = query.get('token');
  const sent = query.get('sent') === '1';
  const verificationStarted = useRef(false);
  const [state, setState] = useState<VerifyState>(token ? 'checking' : 'idle');
  const [message, setMessage] = useState(sent ? '验证邮件已发送，请检查邮箱。' : '');
  const [resending, setResending] = useState(false);

  useEffect(() => {
    if (!token || verificationStarted.current) {
      return;
    }
    verificationStarted.current = true;
    verifyAccountEmail(token)
      .then((result) => {
        setState('success');
        setMessage(result.message);
      })
      .catch((error) => {
        setState('error');
        setMessage(error instanceof Error ? error.message : '邮箱验证失败');
      });
  }, [token]);

  const handleResend = async (values: ResendFormValues) => {
    setResending(true);
    try {
      const result = await resendVerificationEmail(values.email);
      setState('idle');
      setMessage(result.message);
    } catch (error) {
      setState('error');
      setMessage(error instanceof Error ? error.message : '发送失败，请稍后重试');
    } finally {
      setResending(false);
    }
  };

  return (
    <AuthLayout title="验证邮箱" description="完成邮箱验证后，账号才会正式激活。">
      {state === 'checking' ? <Alert className="yak-auth-form__alert" type="info" message="正在验证邮箱…" showIcon /> : null}
      {message ? (
        <Alert
          className="yak-auth-form__alert"
          type={state === 'error' ? 'error' : state === 'success' ? 'success' : 'info'}
          message={message}
          showIcon
        />
      ) : null}

      {state === 'success' ? (
        <YakButton className="yak-auth-form__submit" href="/login" type="primary">
          去登录
        </YakButton>
      ) : (
        <Form<ResendFormValues> className="yak-auth-form" layout="vertical" onFinish={handleResend} requiredMark={false}>
          <Form.Item
            label="没有收到？重新发送验证邮件"
            name="email"
            rules={[{ required: true, type: 'email', max: 128, message: '请输入有效邮箱（最多 128 个字符）' }]}
          >
            <Input autoComplete="email" maxLength={128} placeholder="you@example.com" />
          </Form.Item>
          <YakButton className="yak-auth-form__submit" htmlType="submit" loading={resending}>
            重新发送
          </YakButton>
        </Form>
      )}

      <p className="yak-auth-form__footer">
        <Link to="/login">返回登录</Link>
      </p>
    </AuthLayout>
  );
}
