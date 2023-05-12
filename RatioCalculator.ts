
export interface RatioConf {
    waterInGroundCoffeeCapacity: number;
    relationship: {
        coffeeG: number;
        waterMl: number;
    }
}


export const getWaterAmount = (
    coffeeAmountMl: number,
    ratioConf: RatioConf
) => calculateAmoutOfWaterForCoffee(coffeeAmountMl, ratioConf);

export const getGroundCoffee = (
    coffeeAmountMl: number,
    ratioConf: RatioConf
) => calculateGroundCoffeWeightForCoffeeAmount(coffeeAmountMl, ratioConf);

export const getWaterInGroundCoffee = (
    coffeeAmountMl: number,
    ratioConf: RatioConf
) => getWaterAmount(coffeeAmountMl, ratioConf) - coffeeAmountMl;

/**
 * Calculates the coffee - water - factor which is needed for further calculations
 * @param ratioConf Configuration of coffee properties and preferences
 * @returns Factor which can be used for further calculations
 */
export function calculateCoffeWaterFactor(ratioConf: RatioConf): number {
    return (
        1 +
        (1 / ratioConf.relationship.waterMl) *
        ratioConf.relationship.coffeeG *
        ratioConf.waterInGroundCoffeeCapacity
    );
}

/**
 * Calculates the amount of coffee from a given amount of water size
 * @param waterML Given amount of water in ml
 * @param ratioConf Configuration for coffee
 * @returns Amount of coffee in ml
 */
export const calculateAmountOfCoffeeFromWater = (
    waterML: number,
    ratioConf: RatioConf
): number => waterML / calculateCoffeWaterFactor(ratioConf);

/**
 * Calculates the amount of coffee from a given amount of water. If water is less than 0 it will be set to 0
 * @param waterMl Amount of water
 * @param ratioConf Configuration for coffee
 * @returns Amount of coffee in ml
 */
export const calculateAmountOfCoffeeFromWaterOrZero = (
    waterMl: number,
    ratioConf: RatioConf
): number =>
    waterMl > 0 ? calculateAmountOfCoffeeFromWater(waterMl, ratioConf) : 0;

/**
 * Calculates the necessary amount of water for a target coffee size
 * @param coffeML Target amount of coffee in ml
 * @param ratioConf Configuration for coffee
 * @returns Necessary amount of water in ml
 */
export function calculateAmoutOfWaterForCoffee(
    coffeML: number,
    ratioConf: RatioConf
): number {
    return coffeML * calculateCoffeWaterFactor(ratioConf);
}

/**
 * Calculates the weight of ground coffee for target coffe amount in ml
 * @param coffeMl Amount of coffee in ml
 * @param ratioConf Configuration for coffee
 * @returns ground coffee in g
 */
export function calculateGroundCoffeWeightForCoffeeAmount(
    coffeMl: number,
    ratioConf: RatioConf
): number {
    return (
        (coffeMl / ratioConf.relationship.waterMl) *
        ratioConf.relationship.coffeeG
    );
}

/**
 * Calculates the weight of ground coffee for given amount of water in ml
 * @param waterMl Amount of water in ml
 * @param ratioConf Configuration for coffee
 * @returns ground coffee in g
 */
export function calculateGroundCoffeWeightForWaterAmount(
    waterMl: number,
    ratioConf: RatioConf
): number {
    return calculateGroundCoffeWeightForCoffeeAmount(
        calculateAmountOfCoffeeFromWater(waterMl, ratioConf),
        ratioConf
    );
}
