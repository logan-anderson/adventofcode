import { describe, it, expect } from "vitest";
import { getFirstDigit } from "./solution";

describe("getFirstDigit function", () => {
  it("Should return the first digit when its a number", () => {
    expect(getFirstDigit("1twothree")).toBe("1");
    expect(getFirstDigit("fsd2asdf")).toBe("2");
    expect(getFirstDigit("asd3fasdfthreeasdfsdfeighttwo")).toBe("3");
    expect(getFirstDigit("a4")).toBe("4");
    expect(getFirstDigit("12")).toBe("1");
  });
  it("Should return the first digit when it is spelled out", () => {
    expect(getFirstDigit("asdftwo1")).toBe("2");
    expect(getFirstDigit("eightwo")).toBe("8");
    expect(getFirstDigit("ffour12")).toBe("4");
    expect(getFirstDigit("foobarbazone")).toBe("1");
  });
});


