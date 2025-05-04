import { Id } from '@/convex/_generated/dataModel';
import { createContext } from 'react';

interface UserType {
  _id?: Id<"users">;
  name: string;
  email: string;
  picture: string;
  uid: string;
}

export const UserDetailContext = createContext<{
  userDetail: UserType | undefined;
  setUserDetail: React.Dispatch<React.SetStateAction<UserType | undefined>>;
}>({
  userDetail: undefined,
  setUserDetail: () => {},
});