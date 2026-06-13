import { render, screen } from "@testing-library/react";
import Home from "../app/page";

describe("Home page", () => {
  it("renders the hero heading", () => {
    render(<Home />);
    expect(screen.getByRole("heading", { level: 1 })).toBeInTheDocument();
  });

  it("renders Browse Courses link pointing to /courses", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: /browse courses/i })).toHaveAttribute("href", "/courses");
  });

  it("renders Sign in link pointing to /login", () => {
    render(<Home />);
    expect(screen.getByRole("link", { name: /sign in/i })).toHaveAttribute("href", "/login");
  });
});
