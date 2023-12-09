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
export type Course = {
  id: string;
  name: string;
  mentor: Mentor;
  price: number;
  ratingStar: number;
  createdAt: Date;
  skillIds: string[];
  deletedAt: Date | null;
};
export type Skill = {
  id: string;
  name: string;
  createdAt: Date;
  deletedAt: Date | null;
};
