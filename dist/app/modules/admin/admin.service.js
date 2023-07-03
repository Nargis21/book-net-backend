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
exports.AdminService = void 0;
const http_status_1 = __importDefault(require("http-status"));
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const admin_model_1 = require("./admin.model");
const jwtHelpers_1 = require("../../../helpers/jwtHelpers");
const config_1 = __importDefault(require("../../../config"));
const createAdmin = (admin) => __awaiter(void 0, void 0, void 0, function* () {
    const createdAdmin = yield admin_model_1.Admin.create(admin);
    if (!createdAdmin) {
        throw new ApiError_1.default(400, 'Failed to create admin!');
    }
    // Exclude the password field from the response
    const responseAdmin = yield admin_model_1.Admin.findById(createdAdmin._id).select('-password');
    return responseAdmin;
});
const loginAdmin = (payload) => __awaiter(void 0, void 0, void 0, function* () {
    const { phoneNumber, password } = payload;
    //check admin exist
    const isAdminExist = yield admin_model_1.Admin.isAdminExist(phoneNumber);
    if (!isAdminExist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Admin does not found');
    }
    const { _id, password: savedPassword, role } = isAdminExist;
    //check password
    if (!(yield admin_model_1.Admin.isPasswordMatched(password, savedPassword))) {
        throw new ApiError_1.default(http_status_1.default.UNAUTHORIZED, 'Password is incorrect');
    }
    //create access token
    const accessToken = jwtHelpers_1.jwtHelpers.createToken({ _id, role }, config_1.default.jwt.secret, config_1.default.jwt.expires_in);
    //create refresh token
    const refreshToken = jwtHelpers_1.jwtHelpers.createToken({ _id, role }, config_1.default.jwt.refresh_secret, config_1.default.jwt.refresh_expires_in);
    return {
        accessToken,
        refreshToken,
    };
});
exports.AdminService = {
    createAdmin,
    loginAdmin,
};
