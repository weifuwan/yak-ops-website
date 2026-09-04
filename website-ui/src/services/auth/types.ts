export type RegistrationEmailPayload = {
  email: string;
  source?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
};

export type VerifyRegistrationCodePayload = {
  email: string;
  code: string;
};

export type CompleteRegistrationPayload = {
  setupToken: string;
  password: string;
};

export type LoginAccountPayload = {
  email: string;
  password: string;
};

export type AccountMessage = {
  message: string;
};

export type RegistrationVerificationResult = {
  setupToken: string;
  message: string;
};

export type CurrentWebsiteUser = {
  id: number;
  email: string;
  displayName: string;
  emailVerified: boolean;
};
