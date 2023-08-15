"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const user_model_1 = require("./user.model");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
//create user function
const createUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email } = payload;
    //checking wheater the updated data is emty object or not
    if (!Object.keys(payload).length) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, "You did not enter anything !");
    }
    const result = yield user_model_1.User.create(payload);
    //check whetehr the user exist or not
    const isUserExist = yield user_model_1.User.isUserExist(email);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exist !");
    }
    const { email: userEmail, name: userName } = payload;
    const { _id: userId } = isUserExist;
    //create access token
    const accessToken = jwtHelpers_1.JwtHelpers.createToken({ userEmail, userName, userId }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    //create refresh token
    const refreshToken = jwtHelpers_1.JwtHelpers.createToken({ userEmail }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
        result,
    };
});
exports.UserService = {
    createUser,
};
