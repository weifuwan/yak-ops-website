import { apiRequest, postJson } from '@/services/http/client';
import type {
  AccountMessage,
  CompleteRegistrationPayload,
  CurrentWebsiteUser,
  LoginAccountPayload,
  RegistrationEmailPayload,
  RegistrationVerificationResult,
  VerifyRegistrationCodePayload,
} from './types';

const AUTH_API = '/api/v1/auth';

export const requestRegistrationCode = (payload: RegistrationEmailPayload): Promise<AccountMessage> =>
  postJson<AccountMessage>(`${AUTH_API}/register/request-code`, payload);

export const verifyRegistrationCode = (
  payload: VerifyRegistrationCodePayload,
): Promise<RegistrationVerificationResult> =>
  postJson<RegistrationVerificationResult>(`${AUTH_API}/register/verify-code`, payload);

export const completeRegistration = (
  payload: CompleteRegistrationPayload,
): Promise<CurrentWebsiteUser> =>
  postJson<CurrentWebsiteUser>(`${AUTH_API}/register/complete`, payload);

export const loginAccount = (payload: LoginAccountPayload): Promise<CurrentWebsiteUser> =>
  postJson<CurrentWebsiteUser>(`${AUTH_API}/login`, payload);

export const getCurrentWebsiteUser = (): Promise<CurrentWebsiteUser> =>
  apiRequest<CurrentWebsiteUser>(`${AUTH_API}/current`);

export const logoutAccount = (): Promise<AccountMessage> => postJson<AccountMessage>(`${AUTH_API}/logout`);

export const requestPasswordReset = (email: string): Promise<AccountMessage> =>
  postJson<AccountMessage>(`${AUTH_API}/forgot-password`, { email });

export const resetPassword = (token: string, password: string): Promise<AccountMessage> =>
  postJson<AccountMessage>(`${AUTH_API}/reset-password`, { token, password });
