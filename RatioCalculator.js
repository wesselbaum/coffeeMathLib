"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.calculateCoffeeFromGrounds = exports.calculateWaterFromGrounds = exports.calculateGroundsFromWater = exports.calculateGroundsFromCoffee = exports.calculateWaterFromCoffee = exports.calculateCoffeeFromWater = exports.calculateCoffeeWaterFactor = exports.getWaterInGroundCoffee = void 0;
const getWaterInGroundCoffee = (coffeeAmountMl, ratioConf) => calculateWaterFromCoffee(coffeeAmountMl, ratioConf) - coffeeAmountMl;
exports.getWaterInGroundCoffee = getWaterInGroundCoffee;
/**
 * Calculates the coffee - water - factor which is needed for further calculations
 * @param ratioConf Configuration of coffee properties and preferences
 * @returns Factor which can be used for further calculations
 */
function calculateCoffeeWaterFactor(ratioConf) {
    return (1 +
        (1 / ratioConf.relationship.waterMl) *
            ratioConf.relationship.coffeeG *
            ratioConf.waterInGroundCoffeeCapacity);
}
exports.calculateCoffeeWaterFactor = calculateCoffeeWaterFactor;
/**
 * Calculates the amount of coffee from a given amount of water size
 * @param waterML Given amount of water in ml
 * @param ratioConf Configuration for coffee
 * @returns Amount of coffee in ml
 */
const calculateCoffeeFromWater = (waterML, ratioConf) => waterML / calculateCoffeeWaterFactor(ratioConf);
exports.calculateCoffeeFromWater = calculateCoffeeFromWater;
/**
 * Calculates the necessary amount of water for a target coffee size
 * @param coffeeML Target amount of coffee in ml
 * @param ratioConf Configuration for coffee
 * @returns Necessary amount of water in ml
 */
function calculateWaterFromCoffee(coffeeML, ratioConf) {
    return coffeeML * calculateCoffeeWaterFactor(ratioConf);
}
exports.calculateWaterFromCoffee = calculateWaterFromCoffee;
/**
 * Calculates the weight of ground coffee for target coffee amount in ml
 * @param coffeeMl Amount of coffee in ml
 * @param ratioConf Configuration for coffee
 * @returns ground coffee in g
 */
function calculateGroundsFromCoffee(coffeeMl, ratioConf) {
    return ((coffeeMl / ratioConf.relationship.waterMl) * ratioConf.relationship.coffeeG);
}
exports.calculateGroundsFromCoffee = calculateGroundsFromCoffee;
/**
 * Calculates the weight of ground coffee for given amount of water in ml
 * @param waterMl Amount of water in ml
 * @param ratioConf Configuration for coffee
 * @returns ground coffee in g
 */
function calculateGroundsFromWater(waterMl, ratioConf) {
    return calculateGroundsFromCoffee((0, exports.calculateCoffeeFromWater)(waterMl, ratioConf), ratioConf);
}
exports.calculateGroundsFromWater = calculateGroundsFromWater;
function calculateWaterFromGrounds(groundsG, ratioConf) {
    return calculateWaterFromCoffee(calculateCoffeeFromGrounds(groundsG, ratioConf), ratioConf);
}
exports.calculateWaterFromGrounds = calculateWaterFromGrounds;
function calculateCoffeeFromGrounds(groundsG, ratioConf) {
    return ((groundsG * ratioConf.relationship.waterMl) / ratioConf.relationship.coffeeG);
}
exports.calculateCoffeeFromGrounds = calculateCoffeeFromGrounds;
