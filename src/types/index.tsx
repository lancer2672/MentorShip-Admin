export enum RoleType {
  Mentor = "mentor",
  Mentee = "mentee",
}

type ApprovalStatus = 0 | 1 | 2;

export type Mentor = {
  id: string;
  applicationId: string;
  jobTitle: string;
  avatar: string;
  email: string;
  firstName: string;
  dateOfBirth: string;
  lastName: string;
  company: string;
  location: string;
  phoneNumber: string;
  createdAt: Date | null;
  bio: string;
  linkedIn: string;
  twitter: string;
  skillIds: string[];
  imageUrls: string[];
};

export type Application = {
  id: string;
  status: ApprovalStatus;
  applicationDate: Date;
  mentorProfile: Mentor;
  reasonToBeMentor: string;
  greatestAchievement: string;
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
