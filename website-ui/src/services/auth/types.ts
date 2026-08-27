export type RegisterAccountPayload = {
  email: string;
  password: string;
  source?: string;
  utmSource?: string;
  utmMedium?: string;
  utmCampaign?: string;
};

export type LoginAccountPayload = {
  email: string;
  password: string;
};

export type AccountMessage = {
  message: string;
};

export type CurrentWebsiteUser = {
  id: number;
  email: string;
  displayName: string;
  emailVerified: boolean;
};
