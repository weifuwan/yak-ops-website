import { ExclamationCircleOutlined } from '@ant-design/icons';
import { history, Link, useLocation } from '@umijs/max';
import { Alert, Form, Input, type InputProps } from 'antd';
import { useState } from 'react';
import { YakButton } from '@/components/ui';
import { loginAccount } from '@/services/auth';
import { getSafeReturnTo } from '@/utils/redirect';

const FORM_ITEM_CLASS_NAME =
  '!mb-5 [&_.ant-form-item-explain]:!pt-1.5 [&_.ant-form-item-explain-error]:!text-[12px] [&_.ant-form-item-explain-error]:!leading-[18px] [&_.ant-form-item-explain-error]:!text-[#b42318]';

type LoginFormValues = {
  email: string;
  password: string;
};

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
    ? `!h-11 !rounded-full !bg-white !px-4 !shadow-none [&>input.ant-input]:!bg-white [&>input.ant-input]:!text-[15px] ${
        hasError
          ? '!border-[#d92d20] hover:!border-[#d92d20] focus-within:!border-[#d92d20]'
          : '!border-[#dededb] hover:!border-[#bdbdb8] focus-within:!border-[#171717]'
      }`
    : `!h-11 !rounded-full !bg-white !px-4 !text-[15px] !shadow-none ${
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

export default function LoginPanel() {
  const location = useLocation();
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

  return (
    <div className="w-full rounded-[26px] border border-[#e4e4e1] bg-white p-6 shadow-[0_14px_40px_rgba(15,23,42,0.04)] sm:p-7">
      {errorMessage ? (
        <Alert className="!mb-5 !rounded-2xl" type="error" message={errorMessage} showIcon />
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
          className="!h-11 !rounded-full !border-[#171717] !bg-[#171717] !font-medium !text-white !shadow-none hover:!border-[#292929] hover:!bg-[#292929]"
        >
          Log in
        </YakButton>

        <div className="mt-3 flex items-center justify-center gap-2 text-[11px] leading-5 text-[#8c8c88]">
          <Link className="transition-colors hover:text-[#171717]" to="/forgot-password">
            Forgot password?
          </Link>
          <span className="text-[#d0d0cc]">·</span>
          <Link className="font-medium text-[#555] transition-colors hover:text-[#171717]" to="/register">
            Create account
          </Link>
        </div>
      </Form>
    </div>
  );
}
