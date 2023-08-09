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
exports.CurrentListService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const currentList_model_1 = require("./currentList.model");
const createCurrentList = (currentListData) => __awaiter(void 0, void 0, void 0, function* () {
    const createCurrentList = currentList_model_1.CurrentList.create(currentListData);
    if (!createCurrentList) {
        throw new ApiError_1.default(400, 'Failed to create current list!');
    }
    return createCurrentList;
});
const getCurrentList = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const currentList = yield currentList_model_1.CurrentList.find({ email: userEmail }).populate('book');
    return currentList;
});
const deleteCurrentList = (userEmail, currentListId) => __awaiter(void 0, void 0, void 0, function* () {
    const currentList = yield currentList_model_1.CurrentList.findById(currentListId);
    if (!currentList) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'book does not exist');
    }
    if (currentList.email !== userEmail) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'This is not your listed book');
    }
    const result = yield currentList_model_1.CurrentList.findByIdAndDelete(currentListId);
    return result;
});
const updateCurrentList = (userEmail, currentListId) => __awaiter(void 0, void 0, void 0, function* () {
    const currentList = yield currentList_model_1.CurrentList.findById(currentListId);
    if (!currentList) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'book does not exist');
    }
    if (currentList.email !== userEmail) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'This is not your listed book');
    }
    currentList.isComplete = true;
    const result = yield currentList.save();
    return result;
});
exports.CurrentListService = {
    createCurrentList,
    getCurrentList,
    deleteCurrentList,
    updateCurrentList,
};
