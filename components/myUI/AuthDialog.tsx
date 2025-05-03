/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";
import React, { useContext } from "react";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { FcGoogle } from "react-icons/fc";
import { useGoogleLogin } from "@react-oauth/google";
import axios from "axios";
import { UserDetailContext } from "@/context/UserDetailContext";
import { useMutation } from "convex/react";
import { api } from "@/convex/_generated/api";
import { v4 as uuidv4 } from 'uuid';

interface AuthDialogProps {
    openDialog: boolean;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    closeDialog: any;
}

const AuthDialog = ({ openDialog, closeDialog }: AuthDialogProps) => {
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-expect-error
  const {userDetail, setUserDetail} = useContext(UserDetailContext);
  const CreateUser = useMutation(api.users.CreateUser);

  const googleLogin = useGoogleLogin({
    onSuccess: async (tokenResponse) => {
      const userInfo = await axios.get(
        "https://www.googleapis.com/oauth2/v3/userinfo",
        {
          headers: {
            Authorization: `Bearer ${tokenResponse.access_token}`,
          }
        }
      );
      // console.log(userInfo);
      const user = userInfo.data;
      await CreateUser({
        name: user?.name,
        email: user?.email,
        picture: user?.picture,
        uid: uuidv4()
      })

      if(typeof window !== 'undefined') {
        localStorage.setItem("user", JSON.stringify(user));
      }

      setUserDetail(userInfo?.data);
      closeDialog(false);
    },
      onError: errorResponse => console.log(errorResponse),
  });

  return (
    <Dialog open={openDialog} onOpenChange={closeDialog}>
      <DialogContent className="bg-black border-2 border-blue-400 text-white max-w-[95%] sm:max-w-md">
        <DialogHeader>
          <DialogTitle></DialogTitle>
          <DialogDescription className="flex items-center flex-col justify-center p-6 sm:p-14">
            <span className="font-bold text-xl sm:text-2xl text-pink-400 text-center">
                Continue signing in to Lovella
            </span>
            <button onClick={() => googleLogin()} className="flex items-center mt-8 sm:mt-12 cursor-pointer w-full max-w-80 justify-center gap-2 bg-white text-black rounded-lg p-2 hover:bg-gray-300 transition duration-300 ease-in-out">
              <FcGoogle size={30} />
              <span className="text-sm sm:text-base">Sign in with Google</span>
            </button>
          </DialogDescription>
        </DialogHeader>
      </DialogContent>
    </Dialog>
  );
};

export default AuthDialog;
