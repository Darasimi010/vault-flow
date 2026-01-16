"use client";

import * as React from "react";
import { ThemeProvider as NextThemesProvider, useTheme } from "next-themes";

interface ThemeProviderProps {
    children: React.ReactNode;
    defaultTheme?: string;
    storageKey?: string;
}

export function ThemeProvider({
    children,
    defaultTheme = "system",
    storageKey = "vaultflow-theme",
    ...props
}: ThemeProviderProps) {
    return (
        <NextThemesProvider
            attribute="class"
            defaultTheme={defaultTheme}
            enableSystem
            disableTransitionOnChange
            storageKey={storageKey}
            {...props}
        >
            {children}
        </NextThemesProvider>
    );
}

export { useTheme };
