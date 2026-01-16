"use client";

import * as React from "react";
import { Moon, Sun, Monitor } from "lucide-react";
import { useTheme } from "next-themes";
import { Button } from "@/components/ui";
import { cn } from "@/lib/utils";

export function ThemeToggle() {
    const { theme, setTheme } = useTheme();
    const [mounted, setMounted] = React.useState(false);

    // Avoid hydration mismatch
    React.useEffect(() => {
        setMounted(true);
    }, []);

    if (!mounted) {
        return (
            <Button variant="ghost" size="icon" className="h-9 w-9">
                <Sun className="h-4 w-4" />
            </Button>
        );
    }

    const cycleTheme = () => {
        if (theme === "light") setTheme("dark");
        else if (theme === "dark") setTheme("system");
        else setTheme("light");
    };

    return (
        <Button
            variant="ghost"
            size="icon"
            className="h-9 w-9"
            onClick={cycleTheme}
            aria-label={`Current theme: ${theme}. Click to change.`}
        >
            <Sun
                className={cn(
                    "h-4 w-4 transition-all",
                    theme === "light" ? "rotate-0 scale-100" : "rotate-90 scale-0"
                )}
            />
            <Moon
                className={cn(
                    "absolute h-4 w-4 transition-all",
                    theme === "dark" ? "rotate-0 scale-100" : "-rotate-90 scale-0"
                )}
            />
            <Monitor
                className={cn(
                    "absolute h-4 w-4 transition-all",
                    theme === "system" ? "rotate-0 scale-100" : "rotate-90 scale-0"
                )}
            />
        </Button>
    );
}
