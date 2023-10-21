import { describe, it, expect } from "vitest";
import {
  calculateCoffeeFromGrounds,
  calculateCoffeeFromWater,
  calculateCoffeeWaterFactor,
  calculateGroundsFromCoffee,
  calculateGroundsFromWater,
  calculateWaterFromCoffee,
  calculateWaterFromGrounds,
  RatioConf,
} from "./RatioCalculator";

const conf22_1_20: RatioConf = {
  waterInGroundCoffeeCapacity: 2.2,
  relationship: {
    coffeeG: 1,
    waterMl: 20,
  },
};

const aeroPressRatioConf: RatioConf = {
  waterInGroundCoffeeCapacity: 2,
  relationship: { coffeeG: 14, waterMl: 250 },
};

const buildRatioConf = (overrides: Partial<RatioConf>) => {
  return { ...conf22_1_20, ...overrides };
};

describe("RatioCalculator should", () => {
  it("calculate water to coffee ratio", () => {
    expect(calculateCoffeeWaterFactor(conf22_1_20)).toEqual(1.11);
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
    expect(calculateWaterFromCoffee(225, aeroPressRatioConf)).toBeCloseTo(
      250.2
    );
    expect(calculateWaterFromCoffee(333, conf22_1_20)).toBeCloseTo(369.63);
    expect(calculateWaterFromCoffee(300, conf22_1_20)).toBeCloseTo(333);
    expect(calculateWaterFromCoffee(222, conf22_1_20)).toBeCloseTo(246.42);
    expect(calculateWaterFromCoffee(200, conf22_1_20)).toBeCloseTo(222);
  });

  it("calculate amount of coffee in ml from given amount of water", () => {
    expect(calculateCoffeeFromWater(250, aeroPressRatioConf)).toBeCloseTo(
      224.82
    );
    expect(calculateCoffeeFromWater(333, conf22_1_20)).toBe(300);
    expect(calculateCoffeeFromWater(300, conf22_1_20)).toBeCloseTo(270.27);
    expect(calculateCoffeeFromWater(222, conf22_1_20)).toBeCloseTo(200);
    expect(calculateCoffeeFromWater(200, conf22_1_20)).toBeCloseTo(180.18);
  });

  it("calculate amount of ground coffee for a given amount of water", () => {
    expect(calculateGroundsFromWater(250, aeroPressRatioConf)).toEqual(14);

    expect(calculateGroundsFromWater(320, conf22_1_20)).toBe(16);

    expect(calculateGroundsFromWater(300, conf22_1_20)).toBe(15);

    expect(calculateGroundsFromWater(220, conf22_1_20)).toBe(11);

    expect(calculateGroundsFromWater(200, conf22_1_20)).toBe(10);
  });

  it("calculate amount of ground coffee for a targeted amount of coffee", () => {
    expect(calculateGroundsFromCoffee(225, aeroPressRatioConf)).toBeCloseTo(
      14,
      0
    );
    expect(calculateGroundsFromCoffee(325, conf22_1_20)).toBeCloseTo(18, 0);
    expect(calculateGroundsFromCoffee(300, conf22_1_20)).toBeCloseTo(16.65);
    expect(calculateGroundsFromCoffee(222, conf22_1_20)).toBeCloseTo(12.32);
    expect(calculateGroundsFromCoffee(200, conf22_1_20)).toBeCloseTo(11.1);
  });

  it("calculate amount of coffee for a given amount of grounds", () => {
    expect(calculateCoffeeFromGrounds(14, aeroPressRatioConf)).toBeCloseTo(
      224.82
    );
    expect(calculateCoffeeFromGrounds(16.65, conf22_1_20)).toBe(300);
    expect(calculateCoffeeFromGrounds(15, conf22_1_20)).toBeCloseTo(270.27);
    expect(calculateCoffeeFromGrounds(11.1, conf22_1_20)).toBeCloseTo(200);
    expect(calculateCoffeeFromGrounds(10, conf22_1_20)).toBeCloseTo(180.18);
  });

  it("calculate amount of water for a given amount of grounds", () => {
    expect(
      calculateWaterFromGrounds(14, {
        waterInGroundCoffeeCapacity: 2,
        relationship: { coffeeG: 14, waterMl: 250 },
      })
    ).toEqual(250);
    expect(calculateWaterFromGrounds(15, conf22_1_20)).toBe(300);
    expect(calculateWaterFromGrounds(13, conf22_1_20)).toBe(260);
    expect(calculateWaterFromGrounds(10, conf22_1_20)).toBe(200);
    expect(calculateWaterFromGrounds(9, conf22_1_20)).toBe(180);
  });
});
