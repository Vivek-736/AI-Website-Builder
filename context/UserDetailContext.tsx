import { createContext } from "react";

export type UserDetailContextType = {
    userDetail: string | undefined;
    setUserDetail: React.Dispatch<React.SetStateAction<string | undefined>>;
}

export const UserDetailContext = createContext<UserDetailContextType | null>(null);
