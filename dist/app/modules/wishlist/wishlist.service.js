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
exports.WishlistService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const wishlist_model_1 = require("./wishlist.model");
const createWishlist = (wishlistData) => __awaiter(void 0, void 0, void 0, function* () {
    const createWishlist = wishlist_model_1.Wishlist.create(wishlistData);
    if (!createWishlist) {
        throw new ApiError_1.default(400, 'Failed to create wishlist!');
    }
    return createWishlist;
});
const getWishlist = (userEmail) => __awaiter(void 0, void 0, void 0, function* () {
    const wishlist = yield wishlist_model_1.Wishlist.find({ email: userEmail }).populate('book');
    return wishlist;
});
const deleteWishlist = (userEmail, wishlistId) => __awaiter(void 0, void 0, void 0, function* () {
    const wishlist = yield wishlist_model_1.Wishlist.findById(wishlistId);
    if (!wishlist) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'wishlist does not exist');
    }
    if (wishlist.email !== userEmail) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'This is not your wishlist book');
    }
    const result = yield wishlist_model_1.Wishlist.findByIdAndDelete(wishlistId);
    return result;
});
exports.WishlistService = {
    createWishlist,
    getWishlist,
    deleteWishlist,
};
