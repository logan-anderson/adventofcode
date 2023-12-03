import { describe, it, expect } from "vitest";
import { getFirstDigit, getLastDigit } from "./solution";

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

describe("getLastDigit function", () => {
  it("Should return the last digit when its a number", () => {
    expect(getLastDigit("12314")).toBe("4");
    expect(getLastDigit("1askdflajsd 2 fkfkf")).toBe("2");
  });
  it("Should return the last digit when its a spelled out", () => {
    expect(getLastDigit("1231oneasdf_fjdksjfjf")).toBe("1");
    expect(getLastDigit("eightwo")).toBe("2");
    expect(getLastDigit("fsjf1twothreeffour asf ff fsaf f")).toBe("4");
  });
});
