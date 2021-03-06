export const LoginErrorName = "Login Error";

export class LoginError extends Error {
  constructor(message?: string) {
    super();
    this.name = LoginErrorName;
    const defaultMsg = "Please Login to access this page";
    this.message = message ? `${defaultMsg}: ${message}` : defaultMsg;
  }
}

// tslint:disable-next-line: max-classes-per-file
export class HttpError extends Error {
  public status: number;

  constructor(message: string, status?: number) {
    super();
    this.name = "HTTP Error";
    this.status = status;
    this.message = status ? `${message} with status: ${status}` : message;
  }
}

export function throwLoginError(message?: string) {
  throw new LoginError(message);
}
