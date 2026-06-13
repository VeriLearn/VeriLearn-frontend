// Test the validation logic extracted inline from signup
function validate(name: string, email: string, password: string) {
  const errors: Record<string, string> = {};
  if (!name.trim()) errors.name = "Name is required.";
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) errors.email = "Enter a valid email.";
  if (password.length < 8) errors.password = "Password must be at least 8 characters.";
  return errors;
}

describe("signup validation", () => {
  it("returns no errors for valid input", () => {
    expect(validate("Jane", "jane@example.com", "securepass")).toEqual({});
  });

  it("errors on empty name", () => {
    expect(validate("", "jane@example.com", "securepass").name).toBeDefined();
  });

  it("errors on invalid email", () => {
    expect(validate("Jane", "not-an-email", "securepass").email).toBeDefined();
  });

  it("errors on short password", () => {
    expect(validate("Jane", "jane@example.com", "123").password).toBeDefined();
  });

  it("collects multiple errors", () => {
    const errs = validate("", "bad", "123");
    expect(Object.keys(errs)).toHaveLength(3);
  });
});
