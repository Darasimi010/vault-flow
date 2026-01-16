import { describe, it, expect, vi } from "vitest";
import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Badge } from "@/components/ui";

describe("Badge Component", () => {
    it("renders with default variant", () => {
        render(<Badge>Default</Badge>);
        const badge = screen.getByText("Default");
        expect(badge).toBeInTheDocument();
        expect(badge).toHaveClass("bg-primary");
    });

    it("renders with success variant", () => {
        render(<Badge variant="success">Success</Badge>);
        const badge = screen.getByText("Success");
        expect(badge).toBeInTheDocument();
        expect(badge).toHaveClass("bg-green-500");
    });

    it("renders with warning variant", () => {
        render(<Badge variant="warning">Warning</Badge>);
        const badge = screen.getByText("Warning");
        expect(badge).toBeInTheDocument();
        expect(badge).toHaveClass("bg-yellow-500");
    });

    it("renders with error variant", () => {
        render(<Badge variant="error">Error</Badge>);
        const badge = screen.getByText("Error");
        expect(badge).toBeInTheDocument();
        expect(badge).toHaveClass("bg-red-500");
    });

    it("renders with outline variant", () => {
        render(<Badge variant="outline">Outline</Badge>);
        const badge = screen.getByText("Outline");
        expect(badge).toBeInTheDocument();
        expect(badge).toHaveClass("border-current");
    });

    it("accepts custom className", () => {
        render(<Badge className="custom-class">Custom</Badge>);
        const badge = screen.getByText("Custom");
        expect(badge).toHaveClass("custom-class");
    });
});
