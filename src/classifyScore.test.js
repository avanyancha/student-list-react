// src/classifyScore.test.js

import { describe, it, expect } from "vitest";
import { classifyScore } from "./classifyScore";

describe("classifyScore", () => {
  it("returns 'Excellent' for scores >= 90", () => {
    expect(classifyScore(95)).toBe("Excellent");
    expect(classifyScore(90)).toBe("Excellent");
    expect(classifyScore(100)).toBe("Excellent");
  });

  it("returns 'Good' for scores between 80 and 89", () => {
    expect(classifyScore(85)).toBe("Good");
    expect(classifyScore(80)).toBe("Good");
    expect(classifyScore(89)).toBe("Good");
  });

  it("returns 'Needs Improvement' for scores < 80", () => {
    expect(classifyScore(70)).toBe("Needs Improvement");
    expect(classifyScore(50)).toBe("Needs Improvement");
    expect(classifyScore(0)).toBe("Needs Improvement");
  });
});