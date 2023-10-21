export interface RatioConf {
    waterInGroundCoffeeCapacity: number;
    relationship: {
        coffeeG: number;
        waterMl: number;
    };
}
export declare const getWaterInGroundCoffee: (coffeeAmountMl: number, ratioConf: RatioConf) => number;
/**
 * Calculates the coffee - water - factor which is needed for further calculations
 * @param ratioConf Configuration of coffee properties and preferences
 * @returns Factor which can be used for further calculations
 */
export declare function calculateCoffeeWaterFactor(ratioConf: RatioConf): number;
/**
 * Calculates the amount of coffee from a given amount of water size
 * @param waterML Given amount of water in ml
 * @param ratioConf Configuration for coffee
 * @returns Amount of coffee in ml
 */
export declare const calculateCoffeeFromWater: (waterML: number, ratioConf: RatioConf) => number;
/**
 * Calculates the necessary amount of water for a target coffee size
 * @param coffeeML Target amount of coffee in ml
 * @param ratioConf Configuration for coffee
 * @returns Necessary amount of water in ml
 */
export declare function calculateWaterFromCoffee(coffeeML: number, ratioConf: RatioConf): number;
/**
 * Calculates the weight of ground coffee for target coffee amount in ml
 * @param coffeeMl Amount of coffee in ml
 * @param ratioConf Configuration for coffee
 * @returns ground coffee in g
 */
export declare function calculateGroundsFromCoffee(coffeeMl: number, ratioConf: RatioConf): number;
/**
 * Calculates the weight of ground coffee for given amount of water in ml
 * @param waterMl Amount of water in ml
 * @param ratioConf Configuration for coffee
 * @returns ground coffee in g
 */
export declare function calculateGroundsFromWater(waterMl: number, ratioConf: RatioConf): number;
export declare function calculateWaterFromGrounds(groundsG: number, ratioConf: RatioConf): number;
export declare function calculateCoffeeFromGrounds(groundsG: number, ratioConf: RatioConf): number;
