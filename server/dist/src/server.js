"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const dotenv_1 = __importDefault(require("dotenv"));
const express_1 = __importDefault(require("express"));
const path_1 = __importDefault(require("path"));
const api_1 = __importDefault(require("../routes/api"));
const cors_1 = __importDefault(require("cors"));
dotenv_1.default.config();
const PORT = process.env.PORT || 3000;
const app = (0, express_1.default)();
app.use(express_1.default.json());
app.use(express_1.default.urlencoded());
app.use((0, cors_1.default)());
app.use(express_1.default.static(path_1.default.resolve(__dirname, '../client')));
app.use('/api', api_1.default);
app.get('/', (req, res) => {
    res.status(200).send('API is working...');
});
// https://stackoverflow.com/questions/50218878/typescript-express-error-function
const errorHandler = (err, req, res, next) => {
    const defaultErr = {
        log: 'Express error handler caught unknown middleware error',
        status: 500,
        message: { err: 'An error occurred' },
    };
    const errorObj = Object.assign(defaultErr, err);
    res.status(errorObj.status).json(errorObj.message);
};
app.use(errorHandler);
app.listen(PORT, () => {
    console.log(`Listening to port: ${PORT}`);
});
