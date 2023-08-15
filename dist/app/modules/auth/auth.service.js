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
exports.AuthService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const user_model_1 = require("../user/user.model");
//user log in function
const loginUser = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { email, password } = payload;
    //check whetehr the user exist or not
    const isUserExist = yield user_model_1.User.isUserExist(email);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exist !");
    }
    //match password
    const isPasswordMatched = yield user_model_1.User.isPasswordMatched(password, isUserExist.password);
    if (isUserExist.password && !isPasswordMatched) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, "Password is incorrect !");
    }
    const { email: userEmail, name: userName, _id: userId } = isUserExist;
    //create access token
    const accessToken = jwtHelpers_1.JwtHelpers.createToken({ userEmail, userName, userId }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    //create refresh token
    const refreshToken = jwtHelpers_1.JwtHelpers.createToken({ userEmail }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
//refresh token for generating new access token for user function
const refreshToken = (token) => __awaiter(void 0, void 0, void 0, function* () {
    //verify token
    let verifiedToken = null;
    try {
        verifiedToken = jwtHelpers_1.JwtHelpers.verifyToken(token, config_1.default.jwt.refresh_secret);
    }
    catch (err) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Invalid refresh token");
    }
    //check deleted user's refresh token
    const { userEmail } = verifiedToken;
    const currentUser = yield user_model_1.User.findOne({ email: userEmail });
    if (!currentUser) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, "Invalid User");
    }
    const isUserExist = yield user_model_1.User.isUserExist(currentUser.email);
    if (!isUserExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, "User does not exist !");
    }
    //generate new access token
    const newAccessToken = jwtHelpers_1.JwtHelpers.createToken({
        email: isUserExist.email,
    }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    return {
        accessToken: newAccessToken,
    };
});
exports.AuthService = {
    loginUser,
    refreshToken,
};
