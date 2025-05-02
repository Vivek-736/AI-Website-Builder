import { createContext } from "react";

export type InputContextType = {
    input: string | undefined;
    setInput: React.Dispatch<React.SetStateAction<string | undefined>>;
};

export const InputContext = createContext<InputContextType | null>(null);
