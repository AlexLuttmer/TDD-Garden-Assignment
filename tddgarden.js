// TDD Garden Assignment - Alex Luttmer

// Functions

const getYieldForPlant = function (plant) {
    return plant.yield;
}

const getYieldForCrop = function (crop, weather) {
    if (!weather) {
        return (crop.numPlants * getYieldForPlant(crop.cropType));
    } else {
        let yieldBeforeFactors = crop.numPlants * getYieldForPlant(crop.cropType);   
        let sunFactor = weather.sun;
        let windFactor = weather.wind;
        let rainFactor = weather.rain;
        let sunFactorForCrop = (crop.cropType.factor.sun[sunFactor] + 100) / 100;
        let windFactorForCrop = (crop.cropType.factor.wind[windFactor] + 100) / 100;
        let rainFactorForCrop = (crop.cropType.factor.rain[rainFactor] + 100) / 100;
        let yieldAfterFactors = yieldBeforeFactors * sunFactorForCrop * windFactorForCrop * rainFactorForCrop;
        return Math.round(yieldAfterFactors);
    }
}

const getTotalYield = function (crops, weather) {
    let allCrops = crops.crops;
    let totalYieldArray = [];
    allCrops.forEach((crop) => {
        let cropYield = getYieldForCrop(crop, weather);
        totalYieldArray.push(cropYield);
    })
    return totalYieldArray.reduce((a, b) => a + b);
}

const getCostForCrop = function (crop) {
    return crop.cropType.cost * crop.numPlants;
}

const getRevenueForCrop = function (crop, weather) {
    if (!weather) {
        return crop.cropType.yield * crop.cropType.sale_price * crop.numPlants;
    } else {
        let yieldForCrop = getYieldForCrop(crop, weather);
        return yieldForCrop * crop.cropType.sale_price;
    }
}

const getProfitForCrop = function (crop, weather) {
    return getRevenueForCrop(crop, weather) - getCostForCrop(crop);
}

const getTotalProfit = function (cropsInput, weather) {
    console.log("Total profit for crops: ");
    console.log("");
    let costArray = [];
    let revenueArray = [];
    let profitArray = [];
    let someCrops = cropsInput.crops;
    someCrops.forEach((crop) => {
        console.log("Crop species: ", crop.cropType.name);
        console.log("Number of plants: ", crop.numPlants);
        console.log("Yield per plant: ", getYieldForPlant(crop.cropType) , "kg");
        console.log("Crop yield before weather factors: ", getYieldForCrop(crop), "kg")
        console.log("Crop yield after weather factors: ", getYieldForCrop(crop, weather), "kg");
        console.log("Sale price per kg: €", crop.cropType.sale_price);
        console.log("Crop revenue: €", getRevenueForCrop(crop, weather));
        console.log("Crop cost: €", getCostForCrop(crop));
        console.log("Crop profit: €", getProfitForCrop(crop, weather));
        console.log("");
        costArray.push(getCostForCrop(crop));
        revenueArray.push(getRevenueForCrop(crop, weather));
        profitArray.push(getProfitForCrop(crop, weather));
    })
    let totalCost = costArray.reduce((a, b) => a + b);
    let totalRevenue = revenueArray.reduce((a, b) => a + b);
    let totalProfit = profitArray.reduce((a, b) => a + b);
    console.log("Total yield: ", getTotalYield(cropsInput, weather), "kg");
    console.log("Total revenue: €", totalRevenue);
    console.log("Total cost: €", totalCost);
    console.log("");
    console.log("Total profit: €", Math.round(totalProfit));
    return Math.round(totalProfit);
}

// Exports

module.exports = {
    getYieldForPlant,
    getYieldForCrop,
    getTotalYield,
    getCostForCrop,
    getRevenueForCrop,
    getTotalProfit
};

