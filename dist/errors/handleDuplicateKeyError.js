"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const http_status_1 = __importDefault(require("http-status"));
const handleDuplicateKeyError = (error) => {
    var _a;
    const fieldWithError = Object.keys((_a = error === null || error === void 0 ? void 0 : error.keyPattern) !== null && _a !== void 0 ? _a : {})[0] || '';
    const errors = [
        {
            path: fieldWithError,
            message: 'Already Exist',
        },
    ];
    return {
        statusCode: http_status_1.default.CONFLICT,
        message: 'Data already exist',
        errorMessages: errors,
    };
};
exports.default = handleDuplicateKeyError;
