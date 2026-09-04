import { ExclamationCircleOutlined } from '@ant-design/icons';
import { history, Link, useLocation } from '@umijs/max';
import { Alert, Form, Input, type InputProps } from 'antd';
import { useState } from 'react';
import { YakButton } from '@/components/ui';
import {
  completeRegistration,
  loginAccount,
  requestRegistrationCode,
  verifyRegistrationCode,
} from '@/services/auth';
import { getSafeReturnTo } from '@/utils/redirect';

const FORM_ITEM_CLASS_NAME =
  '!mb-5 [&_.ant-form-item-explain]:!pt-1.5 [&_.ant-form-item-explain-error]:!text-[12px] [&_.ant-form-item-explain-error]:!leading-[18px] [&_.ant-form-item-explain-error]:!text-[#b42318]';
const PRIMARY_BUTTON_CLASS_NAME =
  '!h-11 !rounded-[12px] !border-[#171717] !bg-[#171717] !font-medium !text-white !shadow-none hover:!border-[#292929] hover:!bg-[#292929]';

type LoginFormValues = {
  email: string;
  password: string;
};

type RegistrationFormValues = {
  email: string;
  code?: string;
  password?: string;
};

type RegistrationStep = 'email' | 'code' | 'password';

type FloatingInputProps = InputProps & {
  label: string;
  password?: boolean;
};

function FloatingInput({
  label,
  password = false,
  onBlur,
  onFocus,
  value,
  ...inputProps
}: FloatingInputProps) {
  const [focused, setFocused] = useState(false);
  const { status } = Form.Item.useStatus();
  const floating = focused || String(value ?? '').length > 0;
  const hasError = status === 'error';

  const className = password
    ? `!h-11 !rounded-[12px] !bg-white !px-4 !shadow-none [&>input.ant-input]:!bg-white [&>input.ant-input]:!text-[15px] ${
        hasError
          ? '!border-[#d92d20] hover:!border-[#d92d20] focus-within:!border-[#d92d20]'
          : '!border-[#dededb] hover:!border-[#bdbdb8] focus-within:!border-[#171717]'
      }`
    : `!h-11 !rounded-[12px] !bg-white !px-4 !text-[15px] !shadow-none ${
        hasError
          ? '!border-[#d92d20] hover:!border-[#d92d20] focus:!border-[#d92d20]'
          : '!border-[#dededb] hover:!border-[#bdbdb8] focus:!border-[#171717]'
      }`;

  const controlProps: InputProps = {
    ...inputProps,
    value,
    className,
    placeholder: '',
    onFocus: (event) => {
      setFocused(true);
      onFocus?.(event);
    },
    onBlur: (event) => {
      setFocused(false);
      onBlur?.(event);
    },
  };

  return (
    <div className="relative">
      {password ? <Input.Password {...controlProps} /> : <Input {...controlProps} />}
      <label
        htmlFor={inputProps.id}
        className={`pointer-events-none absolute left-4 z-10 bg-white px-1 transition-all duration-200 ease-out ${
          floating
            ? 'top-0 -translate-y-1/2 text-[12px] font-medium text-[#333]'
            : 'top-1/2 -translate-y-1/2 text-[15px] text-[#aaa]'
        }`}
      >
        {label}
      </label>
    </div>
  );
}

function ValidationMessage({ children }: { children: string }) {
  return (
    <span className="inline-flex h-[18px] items-center gap-1.5 align-middle leading-[18px]">
      <ExclamationCircleOutlined className="flex shrink-0 items-center text-[12px] leading-none [&_svg]:block" />
      <span className="leading-[18px]">{children}</span>
    </span>
  );
}

function RegistrationFlow({ onBack }: { onBack: () => void }) {
  const location = useLocation();
  const [form] = Form.useForm<RegistrationFormValues>();
  const [step, setStep] = useState<RegistrationStep>('email');
  const [setupToken, setSetupToken] = useState<string>();
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();
  const [statusMessage, setStatusMessage] = useState<string>();
  const email = Form.useWatch('email', form) || '';

  const registrationPayload = (address: string) => {
    const query = new URLSearchParams(location.search);
    return {
      email: address.trim(),
      source: 'website',
      utmSource: query.get('utm_source') || undefined,
      utmMedium: query.get('utm_medium') || undefined,
      utmCampaign: query.get('utm_campaign') || undefined,
    };
  };

  const redirectAfterRegistration = () => {
    const returnTo = getSafeReturnTo(new URLSearchParams(location.search).get('returnTo'));
    history.replace(returnTo);
  };

  const handleSubmit = async (values: RegistrationFormValues) => {
    setSubmitting(true);
    setErrorMessage(undefined);

    try {
      if (step === 'email') {
        const result = await requestRegistrationCode(registrationPayload(values.email));
        setStatusMessage(result.message);
        setStep('code');
        return;
      }

      if (step === 'code') {
        const result = await verifyRegistrationCode({
          email: values.email.trim(),
          code: values.code || '',
        });
        setSetupToken(result.setupToken);
        setStatusMessage(result.message);
        setStep('password');
        return;
      }

      if (!setupToken) {
        setStep('email');
        throw new Error('注册会话已失效，请重新验证邮箱');
      }

      await completeRegistration({
        setupToken,
        password: values.password || '',
      });
      redirectAfterRegistration();
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : '注册失败，请稍后重试');
    } finally {
      setSubmitting(false);
    }
  };

  const handleResend = async () => {
    const address = String(form.getFieldValue('email') || '').trim();
    if (!address) {
      return;
    }

    setSubmitting(true);
    setErrorMessage(undefined);
    try {
      const result = await requestRegistrationCode(registrationPayload(address));
      setStatusMessage(result.message);
      form.setFieldValue('code', undefined);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : '验证码发送失败，请稍后重试');
    } finally {
      setSubmitting(false);
    }
  };

  const handleChangeEmail = () => {
    form.setFieldsValue({ code: undefined, password: undefined });
    setSetupToken(undefined);
    setStatusMessage(undefined);
    setErrorMessage(undefined);
    setStep('email');
  };

  const submitLabel =
    step === 'email'
      ? 'Continue with email'
      : step === 'code'
        ? 'Verify Email Address'
        : 'Create account';

  return (
    <>
      {errorMessage ? (
        <Alert className="!mb-5 !rounded-xl" type="error" message={errorMessage} showIcon />
      ) : null}

      <div className="mb-5">
        <h2 className="m-0 text-[22px] font-medium tracking-[-0.02em] text-[#171717]">
          Create your account
        </h2>
        <p className="mb-0 mt-1.5 text-[13px] leading-5 text-[#777773]">
          Verify your email, set a password, and you&apos;re in.
        </p>
      </div>

      <Form<RegistrationFormValues>
        form={form}
        layout="vertical"
        requiredMark={false}
        onFinish={handleSubmit}
      >
        <Form.Item
          className={FORM_ITEM_CLASS_NAME}
          name="email"
          rules={[
            {
              required: true,
              type: 'email',
              max: 128,
              message: <ValidationMessage>请输入有效邮箱</ValidationMessage>,
            },
          ]}
        >
          <FloatingInput
            label="Email"
            autoComplete="email"
            disabled={step !== 'email'}
            maxLength={128}
          />
        </Form.Item>

        {step === 'code' ? (
          <Form.Item
            className={FORM_ITEM_CLASS_NAME}
            name="code"
            rules={[
              {
                required: true,
                pattern: /^\d{6}$/,
                message: <ValidationMessage>请输入 6 位验证码</ValidationMessage>,
              },
            ]}
          >
            <FloatingInput
              label="Enter verification code"
              autoComplete="one-time-code"
              inputMode="numeric"
              maxLength={6}
            />
          </Form.Item>
        ) : null}

        {step === 'password' ? (
          <Form.Item
            className={FORM_ITEM_CLASS_NAME}
            name="password"
            rules={[
              {
                required: true,
                min: 8,
                max: 64,
                message: <ValidationMessage>密码长度需为 8～64 位</ValidationMessage>,
              },
            ]}
          >
            <FloatingInput
              label="Create a password"
              password
              autoComplete="new-password"
              maxLength={64}
            />
          </Form.Item>
        ) : null}

        {step !== 'email' && statusMessage ? (
          <p className="-mt-1 mb-4 text-[12px] leading-5 text-[#777773]">
            {step === 'code' ? `${statusMessage}：${email}` : statusMessage}
          </p>
        ) : null}

        <YakButton
          block
          effect="glass"
          type="primary"
          htmlType="submit"
          loading={submitting}
          className={PRIMARY_BUTTON_CLASS_NAME}
        >
          {submitLabel}
        </YakButton>

        {step === 'code' ? (
          <div className="mt-3 flex items-center justify-center gap-2 text-[11px] leading-5 text-[#8c8c88]">
            <button
              type="button"
              className="border-0 bg-transparent p-0 text-[#555] transition-colors hover:text-[#171717]"
              disabled={submitting}
              onClick={handleResend}
            >
              Resend code
            </button>
            <span className="text-[#d0d0cc]">·</span>
            <button
              type="button"
              className="border-0 bg-transparent p-0 text-[#555] transition-colors hover:text-[#171717]"
              onClick={handleChangeEmail}
            >
              Use another email
            </button>
          </div>
        ) : null}

        <div className="mt-3 text-center text-[11px] leading-5 text-[#8c8c88]">
          Already have an account?{' '}
          <button
            type="button"
            className="border-0 bg-transparent p-0 font-medium text-[#555] transition-colors hover:text-[#171717]"
            onClick={onBack}
          >
            Log in
          </button>
        </div>
      </Form>
    </>
  );
}

export default function LoginPanel() {
  const location = useLocation();
  const [mode, setMode] = useState<'login' | 'register'>('login');
  const [submitting, setSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string>();

  const handleSubmit = async (values: LoginFormValues) => {
    setSubmitting(true);
    setErrorMessage(undefined);

    try {
      await loginAccount(values);
      const returnTo = getSafeReturnTo(new URLSearchParams(location.search).get('returnTo'));
      history.replace(returnTo);
    } catch (error) {
      setErrorMessage(error instanceof Error ? error.message : '登录失败，请稍后重试');
    } finally {
      setSubmitting(false);
    }
  };

  const showRegistration = () => {
    setErrorMessage(undefined);
    setMode('register');
  };

  const showLogin = () => {
    setErrorMessage(undefined);
    setMode('login');
  };

  return (
    <div className="w-full rounded-[26px] border border-[#e4e4e1] bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.04)] sm:p-7">
      {mode === 'register' ? (
        <RegistrationFlow onBack={showLogin} />
      ) : (
        <>
          {errorMessage ? (
            <Alert className="!mb-5 !rounded-xl" type="error" message={errorMessage} showIcon />
          ) : null}

          <Form<LoginFormValues> layout="vertical" requiredMark={false} onFinish={handleSubmit}>
            <Form.Item
              className={FORM_ITEM_CLASS_NAME}
              name="email"
              rules={[
                {
                  required: true,
                  type: 'email',
                  max: 128,
                  message: <ValidationMessage>请输入有效邮箱</ValidationMessage>,
                },
              ]}
            >
              <FloatingInput label="Email" autoComplete="email" maxLength={128} />
            </Form.Item>

            <Form.Item
              className={FORM_ITEM_CLASS_NAME}
              name="password"
              rules={[
                {
                  required: true,
                  min: 8,
                  max: 64,
                  message: <ValidationMessage>密码长度需为 8～64 位</ValidationMessage>,
                },
              ]}
            >
              <FloatingInput
                label="Password"
                password
                autoComplete="current-password"
                maxLength={64}
              />
            </Form.Item>

            <YakButton
              block
              effect="glass"
              type="primary"
              htmlType="submit"
              loading={submitting}
              className={PRIMARY_BUTTON_CLASS_NAME}
            >
              Log in
            </YakButton>

            <div className="mt-3 flex items-center justify-center gap-2 text-[11px] leading-5 text-[#8c8c88]">
              <Link className="transition-colors hover:text-[#171717]" to="/forgot-password">
                Forgot password?
              </Link>
              <span className="text-[#d0d0cc]">·</span>
              <button
                type="button"
                className="border-0 bg-transparent p-0 font-medium text-[#555] transition-colors hover:text-[#171717]"
                onClick={showRegistration}
              >
                Create account
              </button>
            </div>
          </Form>
        </>
      )}
    </div>
  );
}
