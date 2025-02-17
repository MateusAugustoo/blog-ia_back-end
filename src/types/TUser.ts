export type TUser = {
  id: string;
  uid: string;
  name: string | undefined;
  photo: string | undefined;
  email: string;
  role: 'user' | 'admin';
  password: string;
  createdAt: Date;
  updatedAt: Date;
};