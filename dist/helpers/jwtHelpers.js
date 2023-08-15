"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.JwtHelpers = void 0;
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
//utility function for creating token
const createToken = (payload, secret, expireTime) => {
    return jsonwebtoken_1.default.sign(payload, secret, {
        expiresIn: expireTime,
    });
};
//utility function for verifying token
const verifyToken = (token, secret) => {
    return jsonwebtoken_1.default.verify(token, secret);
};
exports.JwtHelpers = {
    createToken,
    verifyToken,
};
