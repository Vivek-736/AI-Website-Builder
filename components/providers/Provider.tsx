"use client";

import React, { useEffect, useState, useCallback } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import Header from '../myUI/Header';
import { InputContext } from '@/context/InputContext';
import { UserDetailContext } from '@/context/UserDetailContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';

interface UserType {
  name: string;
  email: string;
  picture: string;
  uid: string;
}

const Provider = ({ children }: { children: React.ReactNode }) => {
    const [input, setInput] = useState<string | undefined>(undefined);
    const [userDetail, setUserDetail] = useState<UserType | undefined>();
    const convex = useConvex();

    const isAuthenticated = useCallback(async () => {
        if (typeof window !== 'undefined') {
            const userString = localStorage.getItem("user");
            if (!userString) {
                setUserDetail(undefined);
                return;
            }
            
            try {
                const localStorageUser = JSON.parse(userString);
                const result = await convex.query(api.users.GetUser, { email: localStorageUser?.email }) as UserType | undefined;
                
                if (result) {
                    setUserDetail(result);
                } else {
                    localStorage.removeItem("user");
                    setUserDetail(undefined);
                }
            } catch (error) {
                console.error("Authentication error:", error);
                localStorage.removeItem("user");
                setUserDetail(undefined);
            }
        }
    }, [convex]);

    useEffect(() => {
        isAuthenticated();
    }, [isAuthenticated]);

    return (
        <div>
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY as string}>
                <UserDetailContext.Provider value={{ userDetail, setUserDetail }}>
                    <InputContext.Provider value={{ input, setInput }}>
                        <NextThemesProvider
                            attribute={"class"}
                            defaultTheme={"dark"}
                            enableSystem
                            disableTransitionOnChange
                        >
                            <Header />
                            {children}
                        </NextThemesProvider>
                    </InputContext.Provider>
                </UserDetailContext.Provider>
            </GoogleOAuthProvider>
        </div>
    )
}

export default Provider
