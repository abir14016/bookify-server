"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserValidation = void 0;
const zod_1 = __importDefault(require("zod"));
const createUserZodSchema = zod_1.default.object({
    body: zod_1.default.object({
        email: zod_1.default
            .string({
            required_error: "Eamil is required",
        })
            .email(),
        password: zod_1.default.string({
            required_error: "password is required",
        }),
        name: zod_1.default.string({
            required_error: "Name is required",
        }),
    }),
});
exports.UserValidation = {
    createUserZodSchema,
};
