"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = require("express");
const apiController_1 = __importDefault(require("../controllers/apiController"));
const apiRouter = (0, express_1.Router)();
// 1. Fetch "Mars-Earht Comparison" data
// Test URL format (for POSTMAN): http://localhost:3000/api/comparisonData?lat=33.44&lon=-94.04
// TODO: Process the data and only send to the front-end what's necessary
apiRouter.get('/comparisonData', apiController_1.default.fetchEarthData, apiController_1.default.fetchImageOfEarthLocation, apiController_1.default.fetchMarsData, (req, res) => {
    res.status(200).json(res.locals.weatherData);
});
// 2. Fetch "Picture of the day" data
apiRouter.get('/pod', apiController_1.default.fetchPod, (req, res) => {
    res.status(200).json(res.locals.pod);
});
// 3. TODO: Fetch "Random 6 Pictures" from Mars
// (Optional) Dynamic variable - SOL
// https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?sol=1000&api_key=4Ft01vTgsi4Gp07fqeIlcrjaGJ0AO3fz1KHQaL8m
// https://api.nasa.gov/mars-photos/api/v1/rovers/curiosity/photos?earth_date=2024-6-6&api_key=4Ft01vTgsi4Gp07fqeIlcrjaGJ0AO3fz1KHQaL8m
// 4. TODO: Make an AI API call to talk to the Martian
exports.default = apiRouter;
