import { createContext, useContext } from "react";

export function createAppContext<T>() {
    const Context = createContext<T | null>(null);

    function useAppContext() {
        const ctx = useContext(Context);
        if (!ctx) {
            throw new Error("Context must be used within Provider");
        }
        return ctx;
    }

    return { Context, useAppContext };
}