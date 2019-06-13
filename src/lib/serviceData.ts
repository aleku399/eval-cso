const commonReasons = ["inquiry", "claim status", "inquiry status"];

export type Services =
  | "call"
  | "sms"
  | "email"
  | "whatsapp"
  | "web"
  | "claim"
  | "nps"
  | "outbound_call"
  | "mystery_call"
  | "twitter"
  | "facebook";

export interface ServicesMenu {
  id: Services;
  name: string;
}

export const serviceMenuItems: ServicesMenu[] = [
  { name: "Call", id: "call" },
  { name: "SMS", id: "sms" },
  { name: "Email", id: "email" },
  { name: "Mystery call", id: "mystery_call" },
  { name: "OutBound Call", id: "outbound_call" },
  { name: "Whatsapp", id: "whatsapp" },
  { name: "Facebook", id: "facebook" },
  { id: "twitter", name: "Twitter" },
  { name: "Web", id: "web" },
  { name: "Claim", id: "claim" },
  { name: "NPS", id: "nps" }
];

type ServiceEvaluationReasons = { [K in Services]: string[] };

const claimReasons = [
  "Incomplete/wrong data entry",
  "Unclear fingerprints",
  "Wrong EFT details",
  "Poor scanning",
  "Documents not witnessed",
  "Missing or incorrect documents/attachments",
  "Signature missing",
  "Mismatch between the dates when the customer and CSO signed",
  "Duplicate claim",
  "Faint documents submitted",
  "Claim initiated before member qualified"
];

export const reasons: ServiceEvaluationReasons = {
  call: commonReasons,
  sms: [...commonReasons, "sms inquiry"],
  email: commonReasons,
  whatsapp: commonReasons,
  web: commonReasons,
  nps: commonReasons,
  claim: claimReasons,
  twitter: commonReasons,
  facebook: commonReasons,
  mystery_call: commonReasons,
  outbound_call: commonReasons
};
