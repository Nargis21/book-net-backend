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
exports.HouseService = void 0;
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const paginationHelpers_1 = require("../../../helpers/paginationHelpers");
const house_model_1 = require("./house.model");
const house_constant_1 = require("./house.constant");
const http_status_1 = __importDefault(require("http-status"));
const createHouse = (house) => __awaiter(void 0, void 0, void 0, function* () {
    const createdHouse = house_model_1.House.create(house);
    if (!createdHouse) {
        throw new ApiError_1.default(400, 'Failed to create house!');
    }
    return createdHouse;
});
const getAllHouses = (filters, paginationOptions) => __awaiter(void 0, void 0, void 0, function* () {
    const { searchTerm } = filters, filtersData = __rest(filters, ["searchTerm"]);
    const { page, limit, skip, sortBy, sortOrder } = paginationHelpers_1.paginationHelpers.calculatePagination(paginationOptions);
    const andConditions = [];
    if (searchTerm) {
        andConditions.push({
            $or: house_constant_1.houseSearchableFields.map(field => ({
                [field]: {
                    $regex: searchTerm,
                    $options: 'i',
                },
            })),
        });
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
    const result = yield house_model_1.House.find(whereCondition)
        .populate('owner')
        .sort(sortConditions)
        .skip(skip)
        .limit(limit);
    const total = yield house_model_1.House.countDocuments(whereCondition);
    return {
        meta: {
            page,
            limit,
            total,
        },
        data: result,
    };
});
const getOwnedHouse = (id) => __awaiter(void 0, void 0, void 0, function* () {
    const result = yield house_model_1.House.find({ owner: id }).populate('owner');
    return result;
});
const updateHouse = (userId, houseId, payload) => __awaiter(void 0, void 0, void 0, function* () {
    const house = yield house_model_1.House.findById(houseId);
    if (!house) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'House does not exist');
    }
    if (house.owner.toString() !== userId) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You are not the owner of this house');
    }
    const result = yield house_model_1.House.findOneAndUpdate({ _id: houseId }, payload, {
        new: true,
    }).populate('owner');
    return result;
});
const deleteHouse = (userId, houseId) => __awaiter(void 0, void 0, void 0, function* () {
    const house = yield house_model_1.House.findById(houseId);
    if (!house) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'house does not exist');
    }
    // if (house.owner.toString() !== userId) {
    //   throw new ApiError(
    //     httpStatus.FORBIDDEN,
    //     'You are not the owner of this house'
    //   );
    // }
    const result = yield house_model_1.House.findByIdAndDelete(houseId);
    return result;
});
exports.HouseService = {
    createHouse,
    getAllHouses,
    getOwnedHouse,
    updateHouse,
    deleteHouse,
};
