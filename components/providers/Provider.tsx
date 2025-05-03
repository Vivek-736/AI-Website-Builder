"use client";
import React, { useEffect, useState } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import Header from '../myUI/Header';
import { InputContext } from '@/context/InputContext';
import { UserDetailContext } from '@/context/UserDetailContext';
import { GoogleOAuthProvider } from '@react-oauth/google';
import { useConvex } from 'convex/react';
import { api } from '@/convex/_generated/api';

const Provider = ({ children }: { children: React.ReactNode }) => {
    const [input, setInput] = useState<string | undefined>(undefined);
    const [userDetail, setUserDetail] = useState<string | undefined>();
    const convex = useConvex();

    useEffect(() => {
        isAuthenticated();
    })

    const isAuthenticated = async () => {
        if(typeof window !== 'undefined') {
            const user = JSON.parse(localStorage.getItem("user") as string) || null;
            const result = await convex.query(api.users.GetUser, {email: user?.email});
            console.log(result);
        }
    }

    return (
        <div>
            <GoogleOAuthProvider clientId={process.env.NEXT_PUBLIC_GOOGLE_AUTH_CLIENT_ID_KEY as string}>
                <UserDetailContext.Provider value={{userDetail, setUserDetail}}>
                    <InputContext.Provider value={{input, setInput}}>
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
