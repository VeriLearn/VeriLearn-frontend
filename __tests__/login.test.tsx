import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import { AuthProvider } from "../app/context/AuthContext";
import LoginPage from "../app/login/page";

// Stub useRouter and useSearchParams (used inside LoginForm via Suspense)
jest.mock("next/navigation", () => ({
  useRouter: () => ({ push: jest.fn() }),
  useSearchParams: () => ({ get: () => null }),
}));

beforeEach(() => {
  global.fetch = jest.fn().mockResolvedValue({
    ok: false,
    status: 401,
    json: async () => ({ error: "Invalid credentials" }),
  });
});

afterEach(() => jest.restoreAllMocks());

test("shows error message on invalid credentials", async () => {
  render(
    <AuthProvider>
      <LoginPage />
    </AuthProvider>
  );

  // LoginForm is inside Suspense — wait for it to appear
  const emailInput = await screen.findByLabelText(/email address/i);
  const passwordInput = screen.getByLabelText(/password/i);
  const submitBtn = screen.getByRole("button", { name: /sign in/i });

  fireEvent.change(emailInput, { target: { value: "wrong@example.com" } });
  fireEvent.change(passwordInput, { target: { value: "wrongpass" } });
  fireEvent.click(submitBtn);

  await waitFor(() =>
    expect(screen.getByRole("alert")).toHaveTextContent(
      "Invalid credentials. Please try again."
    )
  );
});
