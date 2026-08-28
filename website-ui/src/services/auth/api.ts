import { apiRequest, postJson } from '@/services/http/client';
import type {
  AccountMessage,
  CurrentWebsiteUser,
  LoginAccountPayload,
  RegisterAccountPayload,
} from './types';

const AUTH_API = '/api/v1/auth';

export const registerAccount = (payload: RegisterAccountPayload): Promise<AccountMessage> =>
  postJson<AccountMessage>(`${AUTH_API}/register`, payload);

export const verifyAccountEmail = (token: string): Promise<AccountMessage> =>
  postJson<AccountMessage>(`${AUTH_API}/verify-email`, { token });

export const resendVerificationEmail = (email: string): Promise<AccountMessage> =>
  postJson<AccountMessage>(`${AUTH_API}/resend-verification`, { email });

export const loginAccount = (payload: LoginAccountPayload): Promise<CurrentWebsiteUser> =>
  postJson<CurrentWebsiteUser>(`${AUTH_API}/login`, payload);

export const getCurrentWebsiteUser = (): Promise<CurrentWebsiteUser> =>
  apiRequest<CurrentWebsiteUser>(`${AUTH_API}/current`);

export const logoutAccount = (): Promise<AccountMessage> => postJson<AccountMessage>(`${AUTH_API}/logout`);

export const requestPasswordReset = (email: string): Promise<AccountMessage> =>
  postJson<AccountMessage>(`${AUTH_API}/forgot-password`, { email });

export const resetPassword = (token: string, password: string): Promise<AccountMessage> =>
  postJson<AccountMessage>(`${AUTH_API}/reset-password`, { token, password });
