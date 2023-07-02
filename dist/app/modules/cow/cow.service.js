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
var __rest = (this && this.__rest) || function (s, e) {
    var t = {};
    for (var p in s) if (Object.prototype.hasOwnProperty.call(s, p) && e.indexOf(p) < 0)
        t[p] = s[p];
    if (s != null && typeof Object.getOwnPropertySymbols === "function")
        for (var i = 0, p = Object.getOwnPropertySymbols(s); i < p.length; i++) {
            if (e.indexOf(p[i]) < 0 && Object.prototype.propertyIsEnumerable.call(s, p[i]))
                t[p[i]] = s[p[i]];
        }
    return t;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CowService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const cow_model_1 = require("./cow.model");
const cow_constant_1 = require("./cow.constant");
const http_status_1 = __importDefault(require("http-status"));
const createCow = (cow) => __awaiter(void 0, void 0, void 0, function* () {
    const createdCow = cow_model_1.Cow.create(cow);
    if (!createdCow) {
        throw new ApiError_1.default(400, 'Failed to create Cow!');
    }
    return createdCow;
});
const getAllCows = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm, minPrice, maxPrice } = filters, filtersData = __rest(filters, ["searchTerm", "minPrice", "maxPrice"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: cow_constant_1.cowSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
    }
    if (minPrice) {
        andConditions.push({ price: { $gte: minPrice } });
    }
    if (maxPrice) {
        andConditions.push({ price: { $lte: maxPrice } });
    }
    if (Object.keys(filtersData).length) {
        andConditions.push({
            $and: Object.entries(filtersData).map(([field, value]) => ({
                [field]: value,
            })),
        });
    }
    const sortConditions = {};
    if (sortBy && sortOrder) {
        sortConditions[sortBy] = sortOrder;
    }
    const whereCondition = andConditions.length > 0 ? { $and: andConditions } : {};
    const result = yield cow_model_1.Cow.find(whereCondition)
        .populate('seller')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield cow_model_1.Cow.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getSingleCow = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield cow_model_1.Cow.findById(id).populate('seller');
    return result;
});
const updateCow = (userId, cowId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const cow = yield cow_model_1.Cow.findById(cowId);
    if (!cow) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Cow does not exist');
    }
    if (cow.seller.toString() !== userId) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You are not the seller of this cow');
    }
    const result = yield cow_model_1.Cow.findOneAndUpdate({ _id: cowId }, payload, {
        new: true,
    }).populate('seller');
    return result;
});
const deleteCow = (userId, cowId) => __awaiter(void 0, void 0, void 0, function* () {
    const cow = yield cow_model_1.Cow.findById(cowId);
    if (!cow) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Cow does not exist');
    }
    if (cow.seller.toString() !== userId) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You are not the seller of this cow');
    }
    const result = yield cow_model_1.Cow.findByIdAndDelete(cowId);
    return result;
});
exports.CowService = {
    createCow,
    getAllCows,
    getSingleCow,
    updateCow,
    deleteCow,
};
