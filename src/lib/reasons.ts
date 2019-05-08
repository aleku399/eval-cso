export const reasons = {
  basicReasons: ["inquiry", "claims"],
  reasons: {
    call: this.basicReasons,
    sms: [this.basicReasons, "sms inquiry"]
  }
};
