export type Application = {
  id: string;
};

export enum RoleType {
  Mentor = "mentor",
  Mentee = "mentee",
}

export type Mentor = {
  id: string;
  jobTitle: string;
  company: string;
  skills: string[];
  category: string;
  bio: string;
  linkedIn: string;
  twitter: string;
  createdAt: Date;
};
