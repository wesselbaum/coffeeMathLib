import { describe, it, expect } from "vitest";
import {
  calculateCoffeeFromWater,
  calculateWaterFromCoffee,
  calculateCoffeeWaterFactor,
  calculateGroundsFromCoffee,
  calculateGroundsFromWater,
  RatioConf,
  calculateCoffeeFromGrounds,
  calculateWaterFromGrounds,
} from "./RatioCalculator";

const conf22_1_20: RatioConf = {
  waterInGroundCoffeeCapacity: 2.2,
  relationship: {
    coffeeG: 1,
    waterMl: 20,
  },
};

const buildRatioConf = (overrides: Partial<RatioConf>) => {
  return { ...conf22_1_20, ...overrides };
};

describe("RatioCalculator should", () => {
  it("calculate water to coffee ratio", () => {
    expect(calculateCoffeeWaterFactor(buildRatioConf({}))).toEqual(1.11);
    expect(
      calculateCoffeeWaterFactor(
        buildRatioConf({
          waterInGroundCoffeeCapacity: 2,
          relationship: { coffeeG: 3, waterMl: 46 },
        })
      )
    ).toEqual(1.1304347826086956);
  });

  it("calculate amount of water for given target coffee size", () => {
    expect(calculateWaterFromCoffee(333, buildRatioConf({}))).toEqual(
      369.63000000000005
    );
    expect(calculateWaterFromCoffee(300, buildRatioConf({}))).toEqual(
      333.00000000000006
    );
    expect(calculateWaterFromCoffee(222, buildRatioConf({}))).toEqual(
      246.42000000000002
    );
    expect(calculateWaterFromCoffee(200, buildRatioConf({}))).toEqual(
      222.00000000000003
    );
  });

  it("calculate amount of coffee in ml from given amount of water", () => {
    expect(calculateCoffeeFromWater(333, buildRatioConf({}))).toBe(300);
    expect(calculateCoffeeFromWater(300, buildRatioConf({}))).toBe(
      270.27027027027026
    );
    expect(calculateCoffeeFromWater(222, buildRatioConf({}))).toBe(
      199.99999999999997
    );
    expect(calculateCoffeeFromWater(200, buildRatioConf({}))).toBe(
      180.18018018018017
    );
  });

  it("calculate amount of ground coffee for a given amount of water", () => {
    expect(calculateGroundsFromWater(333, buildRatioConf({}))).toBe(15);

    expect(calculateGroundsFromWater(300, buildRatioConf({}))).toBe(
      13.513513513513512
    );

    expect(calculateGroundsFromWater(222, buildRatioConf({}))).toBe(
      9.999999999999998
    );

    expect(calculateGroundsFromWater(200, buildRatioConf({}))).toBe(
      9.00900900900901
    );
  });

  it("calculate amount of ground coffee for a targeted amount of coffee", () => {
    expect(calculateGroundsFromCoffee(333, buildRatioConf({}))).toBe(16.65);

    expect(calculateGroundsFromCoffee(300, buildRatioConf({}))).toBe(15);
    expect(calculateGroundsFromCoffee(222, buildRatioConf({}))).toBe(11.1);
    expect(calculateGroundsFromCoffee(200, buildRatioConf({}))).toBe(10);
  });

  it("calculate amount of coffee for a given amount of grounds", () => {
    expect(calculateCoffeeFromGrounds(16.65, buildRatioConf({}))).toBe(333);
    expect(calculateCoffeeFromGrounds(15, buildRatioConf({}))).toBe(300);
    expect(calculateCoffeeFromGrounds(11.1, buildRatioConf({}))).toBe(222);
    expect(calculateCoffeeFromGrounds(10, buildRatioConf({}))).toBe(200);
  });

  it("calculate amount of water for a given amount of grounds", () => {
    expect(calculateWaterFromGrounds(15, buildRatioConf({}))).toBe(
      333.00000000000006 // floating point
    );
    expect(
      calculateWaterFromGrounds(13.513513513513512, buildRatioConf({}))
    ).toBe(300);
    expect(
      calculateWaterFromGrounds(9.999999999999998, buildRatioConf({}))
    ).toBe(222);
    expect(
      calculateWaterFromGrounds(9.00900900900901, buildRatioConf({}))
    ).toBe(200);
  });
});
