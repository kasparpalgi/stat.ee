import { clampBetween,clamp } from "../../src/utils/value_clamp";

describe("clampBetween", () => {
  it("should clamp the value between the given range", () => {
    expect(clampBetween(5, 0, 10)).toBe(5);
    expect(clampBetween(-5, 0, 10)).toBe(0);
    expect(clampBetween(15, 0, 10)).toBe(10);
  });
});

describe("clamp", () => {
    it("should clamp the value to the given maximum", () => {
        expect(clamp(5, 10)).toBe(5);
        expect(clamp(15, 10)).toBe(10);
    });
});