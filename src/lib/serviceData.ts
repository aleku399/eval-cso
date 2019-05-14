const commonReasons = ["inquiry", "claim status", "inquiry status"];

export type Services =
  | "call"
  | "sms"
  | "email"
  | "whatsapp"
  | "web"
  | "claim"
  | "nps";

export interface ServicesMenu {
  id: Services;
  name: string;
}

export const serviceMenuItems: ServicesMenu[] = [
  { name: "Call", id: "call" },
  { name: "SMS", id: "sms" },
  { name: "Email", id: "email" },
  { name: "Whatsapp", id: "whatsapp" },
  { name: "Web", id: "web" },
  { name: "Claim", id: "claim" },
  { name: "NPS", id: "nps" }
];

type ServiceEvaluationReasons = { [K in Services]: string[] };

export const reasons: ServiceEvaluationReasons = {
  call: commonReasons,
  sms: [...commonReasons, "sms inquiry"],
  email: commonReasons,
  whatsapp: commonReasons,
  web: commonReasons,
  nps: commonReasons,
  claim: ["rude", "bad language"]
};
