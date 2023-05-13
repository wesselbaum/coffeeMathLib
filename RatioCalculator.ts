export interface RatioConf {
  waterInGroundCoffeeCapacity: number;
  relationship: {
    coffeeG: number;
    waterMl: number;
  };
}

export const getWaterInGroundCoffee = (
  coffeeAmountMl: number,
  ratioConf: RatioConf
) => calculateWaterFromCoffee(coffeeAmountMl, ratioConf) - coffeeAmountMl;

/**
 * Calculates the coffee - water - factor which is needed for further calculations
 * @param ratioConf Configuration of coffee properties and preferences
 * @returns Factor which can be used for further calculations
 */
export function calculateCoffeeWaterFactor(ratioConf: RatioConf): number {
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
export const calculateCoffeeFromWater = (
  waterML: number,
  ratioConf: RatioConf
): number => waterML / calculateCoffeeWaterFactor(ratioConf);

/**
 * Calculates the necessary amount of water for a target coffee size
 * @param coffeeML Target amount of coffee in ml
 * @param ratioConf Configuration for coffee
 * @returns Necessary amount of water in ml
 */
export function calculateWaterFromCoffee(
  coffeeML: number,
  ratioConf: RatioConf
): number {
  return coffeeML * calculateCoffeeWaterFactor(ratioConf);
}

/**
 * Calculates the weight of ground coffee for target coffee amount in ml
 * @param coffeeMl Amount of coffee in ml
 * @param ratioConf Configuration for coffee
 * @returns ground coffee in g
 */
export function calculateGroundsFromCoffee(
  coffeeMl: number,
  ratioConf: RatioConf
): number {
  return (
    (coffeeMl / ratioConf.relationship.waterMl) * ratioConf.relationship.coffeeG
  );
}

/**
 * Calculates the weight of ground coffee for given amount of water in ml
 * @param waterMl Amount of water in ml
 * @param ratioConf Configuration for coffee
 * @returns ground coffee in g
 */
export function calculateGroundsFromWater(
  waterMl: number,
  ratioConf: RatioConf
): number {
  return calculateGroundsFromCoffee(
    calculateCoffeeFromWater(waterMl, ratioConf),
    ratioConf
  );
}

export function calculateWaterFromGrounds(
  groundsG: number,
  ratioConf: RatioConf
): number {
  return calculateWaterFromCoffee(
    calculateCoffeeFromGrounds(groundsG, ratioConf),
    ratioConf
  );
}

export function calculateCoffeeFromGrounds(
  groundsG: number,
  ratioConf: RatioConf
): number {
  return (
    (groundsG * ratioConf.relationship.waterMl) / ratioConf.relationship.coffeeG
  );
}
