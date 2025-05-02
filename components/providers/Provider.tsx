"use client";

import React, { useState } from 'react'
import { ThemeProvider as NextThemesProvider } from 'next-themes'
import Header from '../myUI/Header';
import { InputContext } from '@/context/InputContext';

const Provider = ({ children }: { children: React.ReactNode }) => {
    const [input, setInput] = useState<string | undefined>(undefined);

    return (
        <div>
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
        </div>
    )
}

export default Provider
