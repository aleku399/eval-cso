export interface Agent {
  services: string;
  branch: string;
  supervisor: string;
}

export interface Profile {
  userName: string;
  password: string;
  email: string;
  role: string;
  agent?: Agent;
}

export interface Credentials {
  email: string;
  password: string;
}
