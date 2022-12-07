// Imports

const {getYieldForPlant, 
    getYieldForCrop, 
    getTotalYield,
    getCostForCrop,
    getRevenueForCrop,
    getTotalProfit 
} = require("./tddgarden");


// Plant data

const corn = {
    name: "corn",
    yield: 3,
    cost: 1.5,
    sale_price: 3,

    factor: {
        
        sun: {
            low: -25,
            medium: 0,
            high: 35,
        },

        wind: {
            low: 25,
            medium: 0,
            high: -40    
        },

        rain: {
            low: -10,
            medium: 0,
            high: 35    
        }
    }
};

const pumpkin = {
    name: "pumpkin",
    yield: 4,
    cost: 2,
    sale_price: 4,

    factor: {
        
        sun: {
            low: -40,
            medium: -20,
            high: 0,
        },

        wind: {
            low: 0,
            medium: 0,
            high: 0    
        },

        rain: {
            low: -20,
            medium: 25,
            high: 40    
        }
    }
};

const potato = {
    name: "potato",
    yield: 3,
    cost: 1.75,
    sale_price: 2,

    factor: {
        
        sun: {
            low: 25,
            medium: 0,
            high: -35,
        },

        wind: {
            low: 25,
            medium: 0,
            high: -40    
        },

        rain: {
            low: -20,
            medium: 25,
            high: 60    
        }
    }
}

// Tests 

// getYieldForPlant Tests

    describe("getYieldForPlant", () => {

        test("Get yield for plant", () => {
            expect(getYieldForPlant(corn)).toBe(3);
            expect(getYieldForPlant(pumpkin)).toBe(4);
            expect(getYieldForPlant(potato)).toBe(3);
        });
    });

// getYieldForCrop Tests

    describe("getYieldForCrop", () => {
        
        test("Get yield for crop - no weather factors ", () => {

            const cropA = {
                cropType: corn,
                numPlants: 10,
            };

            const cropB = {
                cropType: pumpkin,
                numPlants: 12
            };

            const cropC = {
                cropType: potato,
                numPlants: 14
            };
            expect(getYieldForCrop(cropA)).toBe(30);
            expect(getYieldForCrop(cropB)).toBe(48);
            expect(getYieldForCrop(cropC)).toBe(42);
        });

        test("Get yield for crop - with weather factors", () => {

            const cropA = {
                cropType: corn,
                numPlants: 10,
            };

            const cropB = {
                cropType: pumpkin,
                numPlants: 12
            };

            const cropC = {
                cropType: potato,
                numPlants: 14
            };

            const weatherA = {sun: "low", wind: "low", rain: "high"};
            const weatherB = {sun: "low", wind: "high", rain: "medium"};
            
            expect(getYieldForCrop(cropA, weatherA)).toBe(38);
            expect(getYieldForCrop(cropA, weatherB)).toBe(14);
            expect(getYieldForCrop(cropB, weatherA)).toBe(40);
            expect(getYieldForCrop(cropB, weatherB)).toBe(36);
            expect(getYieldForCrop(cropC, weatherA)).toBe(105);
            expect(getYieldForCrop(cropC, weatherB)).toBe(39);
        });
    });

// getTotalYield Tests
    
    describe("getTotalYield", () => {
        
        test("Calculate total yield with multiple crops - no weather factors", () => {
            
            const crops = [
                { cropType: corn, numPlants: 10 },
                { cropType: pumpkin, numPlants: 5 },
            ];

            expect(getTotalYield({ crops })).toBe(50);
        });

        test("Calculate total yield with multiple crops - with weather factors", () => {
            
            const cropsA = [
                { cropType: corn, numPlants: 10 }, // 30
                { cropType: pumpkin, numPlants: 5 }, // 20
            ];

            const cropsB = [
                { cropType: pumpkin, numPlants: 10 }, // 40
                { cropType: potato, numPlants: 5 }, // 15
            ];

            const weatherA = {sun: "low", wind: "medium", rain: "low"};
            const weatherB = {sun: "medium", wind: "high", rain: "medium"};
            const weatherC = {sun: "high", wind: "low", rain: "high"};
     
            expect(getTotalYield({ crops:cropsA }, weatherA)).toBe(30);
            expect(getTotalYield({ crops:cropsA }, weatherB)).toBe(38);
            expect(getTotalYield({ crops:cropsA }, weatherC)).toBe(96);
            expect(getTotalYield({ crops:cropsB }, weatherA)).toBe(34);
            expect(getTotalYield({ crops:cropsB }, weatherB)).toBe(51);
            expect(getTotalYield({ crops:cropsB }, weatherC)).toBe(76);
        });
    
        test("Calculate total yield with 0 amount", () => {
            const corn = {
                name: "corn",
                yield: 3,
            };
            const crops = [{ cropType: corn, numPlants: 0 }];
            expect(getTotalYield({ crops })).toBe(0);
        });
    });


// getCostForCrop Tests

describe("getCostForCrop", () => {
    
    test("Get cost for crop", () => {

        const cropA = {cropType: corn, numPlants: 10};
        const cropB = {cropType: pumpkin, numPlants: 20};
        const cropC = {cropType: potato, numPlants: 30};

        expect(getCostForCrop(cropA)).toBe(15);
        expect(getCostForCrop(cropB)).toBe(40);
        expect(getCostForCrop(cropC)).toBe(52.5);
    });
});

// getRevenueForCrop Tests

describe("getRevenueForCrop", () => {
    
    test("Get revenue for crop - no weather factors", () => {
        const cropA = {cropType: corn, numPlants: 10};
        const cropB = {cropType: pumpkin, numPlants: 10};
        const cropC = {cropType: potato, numPlants: 10};

        expect(getRevenueForCrop(cropA)).toBe(90);
        expect(getRevenueForCrop(cropB)).toBe(160);
        expect(getRevenueForCrop(cropC)).toBe(60);
    });

    test("Get revenue for crop - with weather factors", () => {
        const cropA = {cropType: corn, numPlants: 10};
        const cropB = {cropType: pumpkin, numPlants: 10};

        const weatherA = {sun: "medium", wind: "high", rain: "medium"}
        const weatherB = {sun: "high", wind: "low", rain: "high"}

        expect(getRevenueForCrop(cropA, weatherA)).toBe(54);
        expect(getRevenueForCrop(cropA, weatherB)).toBe(204);
        expect(getRevenueForCrop(cropB, weatherA)).toBe(160);
        expect(getRevenueForCrop(cropB, weatherB)).toBe(224);
    });
});

// getTotalProfit Tests

describe("getTotalProfit", () => {

    test("Get profit for crops", () => {
        const cropsA = [
            { cropType: corn, numPlants: 5 },
            { cropType: pumpkin, numPlants: 5 },
        ];

        const cropsB = [
            { cropType: pumpkin, numPlants: 10 },
            { cropType: potato, numPlants: 10}
        ];

        const cropsC = [
            { cropType: corn, numPlants: 10 },
            { cropType: pumpkin, numPlants: 5 },
            { cropType: potato, numPlants: 10}
        ];

        const weatherA = {sun: "medium", wind: "high", rain: "medium"};
        const weatherB = {sun: "high", wind: "low", rain: "high"};
        
        expect(getTotalProfit({ crops:cropsA }, weatherA)).toBe(90);
        expect(getTotalProfit({ crops:cropsA }, weatherB)).toBe(197);
        expect(getTotalProfit({ crops:cropsB }, weatherA)).toBe(169);
        expect(getTotalProfit({ crops:cropsB }, weatherB)).toBe(265);
        expect(getTotalProfit({ crops:cropsC }, weatherA)).toBe(138);
        expect(getTotalProfit({ crops:cropsC }, weatherB)).toBe(352);
    });
});