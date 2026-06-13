import { courses } from "../app/lib/courses";

describe("courses data", () => {
  it("has 6 courses", () => {
    expect(courses).toHaveLength(6);
  });

  it("every course has an id, title, lessons array", () => {
    courses.forEach((c) => {
      expect(c.id).toBeDefined();
      expect(c.title).toBeTruthy();
      expect(Array.isArray(c.lessons)).toBe(true);
      expect(c.lessons.length).toBeGreaterThan(0);
    });
  });

  it("every lesson has a title, duration, and content", () => {
    courses.forEach((c) =>
      c.lessons.forEach((l) => {
        expect(l.title).toBeTruthy();
        expect(l.duration).toBeTruthy();
        expect(l.content).toBeTruthy();
      })
    );
  });
});
