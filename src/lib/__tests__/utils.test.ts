import { describe, it, expect, vi } from "vitest";
import {
    cn,
    formatCurrency,
    formatDate,
    truncate,
    getInitials,
    debounce,
} from "../utils";

describe("cn (class name utility)", () => {
    it("should merge class names correctly", () => {
        expect(cn("px-2", "py-1")).toBe("px-2 py-1");
    });

    it("should handle conditional classes", () => {
        expect(cn("base", true && "active", false && "inactive")).toBe(
            "base active"
        );
    });

    it("should merge conflicting Tailwind classes", () => {
        expect(cn("px-2", "px-4")).toBe("px-4");
        expect(cn("bg-red-500", "bg-blue-500")).toBe("bg-blue-500");
    });

    it("should handle arrays and objects", () => {
        expect(cn(["px-2", "py-1"], { "bg-blue-500": true })).toBe(
            "px-2 py-1 bg-blue-500"
        );
    });
});

describe("formatCurrency", () => {
    it("should format USD currency by default", () => {
        expect(formatCurrency(1234.56)).toBe("$1,234.56");
    });

    it("should format with custom currency", () => {
        const result = formatCurrency(1234.56, "EUR", "de-DE");
        // The result may contain non-breaking space, so we normalize it
        expect(result.replace(/\s/g, " ")).toBe("1.234,56 €");
    });

    it("should handle zero", () => {
        expect(formatCurrency(0)).toBe("$0.00");
    });

    it("should handle negative numbers", () => {
        expect(formatCurrency(-500)).toBe("-$500.00");
    });
});

describe("formatDate", () => {
    it("should format date with default options", () => {
        const result = formatDate(new Date("2024-03-15"));
        expect(result).toBe("Mar 15, 2024");
    });

    it("should handle string dates", () => {
        const result = formatDate("2024-12-25");
        expect(result).toBe("Dec 25, 2024");
    });

    it("should use custom format options", () => {
        const result = formatDate(new Date("2024-03-15"), {
            weekday: "long",
            year: "numeric",
            month: "long",
            day: "numeric",
        });
        expect(result).toBe("Friday, March 15, 2024");
    });
});

describe("truncate", () => {
    it("should not truncate short strings", () => {
        expect(truncate("Hello", 10)).toBe("Hello");
    });

    it("should truncate long strings with ellipsis", () => {
        expect(truncate("Hello World", 5)).toBe("Hello...");
    });

    it("should handle exact length", () => {
        expect(truncate("Hello", 5)).toBe("Hello");
    });
});

describe("getInitials", () => {
    it("should get initials from full name", () => {
        expect(getInitials("John Doe")).toBe("JD");
    });

    it("should handle single name", () => {
        expect(getInitials("John")).toBe("J");
    });

    it("should limit to two characters", () => {
        expect(getInitials("John Michael Doe")).toBe("JM");
    });

    it("should handle lowercase names", () => {
        expect(getInitials("jane doe")).toBe("JD");
    });
});

describe("debounce", () => {
    it("should debounce function calls", async () => {
        vi.useFakeTimers();
        const fn = vi.fn();
        const debouncedFn = debounce(fn, 100);

        debouncedFn();
        debouncedFn();
        debouncedFn();

        expect(fn).not.toHaveBeenCalled();

        vi.advanceTimersByTime(100);

        expect(fn).toHaveBeenCalledTimes(1);
        vi.useRealTimers();
    });

    it("should pass arguments correctly", () => {
        vi.useFakeTimers();
        const fn = vi.fn();
        const debouncedFn = debounce(fn, 100);

        debouncedFn("arg1", "arg2");
        vi.advanceTimersByTime(100);

        expect(fn).toHaveBeenCalledWith("arg1", "arg2");
        vi.useRealTimers();
    });
});
