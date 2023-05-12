import {describe, it, expect} from 'vitest';
import {
    calculateAmountOfCoffeeFromWater,
    calculateAmoutOfWaterForCoffee,
    calculateCoffeWaterFactor, calculateGroundCoffeWeightForCoffeeAmount, calculateGroundCoffeWeightForWaterAmount,
    RatioConf
} from "./RatioCalculator";

const conf22_1_20: RatioConf = {
    waterInGroundCoffeeCapacity: 2.2,
    relationship: {
        coffeeG: 1,
        waterMl: 20,
    },
};

const buildRatioConf = (overrides: Partial<RatioConf>) => {
    return {...conf22_1_20, ...overrides}
}


describe('RatioCalculator should', () => {
    it('calculate water to coffee ratio', () => {
        expect(calculateCoffeWaterFactor(buildRatioConf({}))).toEqual(1.11)
        expect(calculateCoffeWaterFactor(buildRatioConf({
            waterInGroundCoffeeCapacity: 2,
            relationship: {coffeeG: 3, waterMl: 46}
        }))).toEqual(1.1304347826086956)
    });

    it('calculate amount of water for give target coffee size', () => {
        expect(calculateAmoutOfWaterForCoffee(333, buildRatioConf({}))).toEqual(369.63000000000005)
        expect(calculateAmoutOfWaterForCoffee(300, buildRatioConf({}))).toEqual(333.00000000000006)
        expect(calculateAmoutOfWaterForCoffee(222, buildRatioConf({}))).toEqual(246.42000000000002)
        expect(calculateAmoutOfWaterForCoffee(200, buildRatioConf({}))).toEqual(222.00000000000003)
    })

    it('calculate amount of coffee in ml from given amount of water', () => {
        expect(calculateAmountOfCoffeeFromWater(333, buildRatioConf({}))).toBe(300);
        expect(calculateAmountOfCoffeeFromWater(300, buildRatioConf({}))).toBe(270.27027027027026);
        expect(calculateAmountOfCoffeeFromWater(222, buildRatioConf({}))).toBe(199.99999999999997);
        expect(calculateAmountOfCoffeeFromWater(200, buildRatioConf({}))).toBe(180.18018018018017);
    })

    it('calculate amount of ground coffee for a given amount of water', () => {

        expect(calculateGroundCoffeWeightForWaterAmount(
            333,
            buildRatioConf({})
        )).toBe(15);

        expect(calculateGroundCoffeWeightForWaterAmount(
            300,
            buildRatioConf({})
        )).toBe(13.513513513513512);

        expect(calculateGroundCoffeWeightForWaterAmount(
            222,
            buildRatioConf({})
        )).toBe(9.999999999999998);

        expect(calculateGroundCoffeWeightForWaterAmount(
            200,
            buildRatioConf({})
        )).toBe(9.00900900900901);
    })

    it('calculate amount of ground coffee for a targeted amount of coffee', () => {
        expect(calculateGroundCoffeWeightForCoffeeAmount(
            333,
            buildRatioConf({})
        )).toBe(16.65);

        expect(calculateGroundCoffeWeightForCoffeeAmount(
            300,
            buildRatioConf({})
        )).toBe(15);
        expect(calculateGroundCoffeWeightForCoffeeAmount(
            222,
            buildRatioConf({})
        )).toBe(11.1);
        expect(calculateGroundCoffeWeightForCoffeeAmount(
            200,
            buildRatioConf({})
        )).toBe(10);
    });


})