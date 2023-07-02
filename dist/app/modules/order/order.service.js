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
exports.OrderService = void 0;
const mongoose_1 = require("mongoose");
const ApiError_1 = __importDefault(require("../../../errors/ApiError"));
const http_status_1 = __importDefault(require("http-status"));
const cow_model_1 = require("../cow/cow.model");
const order_model_1 = require("./order.model");
const user_model_1 = require("../user/user.model");
const createOrder = (orderData) => __awaiter(void 0, void 0, void 0, function* () {
    //get cow data
    const cowData = yield cow_model_1.Cow.findById(orderData.cow);
    //get buyer data
    const buyerData = yield user_model_1.User.findById(orderData.buyer);
    //get seller data
    const sellerData = yield user_model_1.User.findById(cowData === null || cowData === void 0 ? void 0 : cowData.seller);
    //check enough balance
    if (cowData && buyerData && cowData.price > buyerData.budget) {
        throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'You have not sufficient money to buy this cow');
    }
    let newOrder = null;
    const session = yield (0, mongoose_1.startSession)();
    try {
        session.startTransaction();
        // Update cow's label to 'sold out'
        if (cowData) {
            cowData.label = 'sold out';
            yield cowData.save();
        }
        // Deduct cost from buyer's budget
        if (cowData && buyerData) {
            buyerData.budget -= cowData.price;
            yield buyerData.save();
        }
        // Add money to seller's income
        if (cowData && sellerData) {
            sellerData.income += cowData.price;
            yield sellerData.save();
        }
        //create order
        const createdOrder = yield order_model_1.Order.create([orderData], { session });
        if (!createdOrder.length) {
            throw new ApiError_1.default(http_status_1.default.BAD_REQUEST, 'Failed to create order');
        }
        newOrder = createdOrder[0];
        yield session.commitTransaction();
        yield session.endSession();
    }
    catch (err) {
        yield session.abortTransaction();
        yield session.endSession();
        throw err;
    }
    if (newOrder) {
        newOrder = yield order_model_1.Order.findOne({ _id: newOrder._id })
            .populate({
            path: 'cow',
            populate: [
                {
                    path: 'seller',
                },
            ],
        })
            .populate('buyer');
    }
    return newOrder;
});
const getAllOrders = (userId, role) => __awaiter(void 0, void 0, void 0, function* () {
    const orders = yield order_model_1.Order.find()
        .populate({
        path: 'cow',
        populate: [
            {
                path: 'seller',
            },
        ],
    })
        .populate('buyer');
    let filteredOrders = [];
    if (role === 'admin') {
        // Admin can access all orders
        filteredOrders = orders;
    }
    else if (role === 'buyer') {
        // Buyer can access their own orders
        filteredOrders = orders.filter(order => order.buyer._id.toString() === userId);
    }
    else if (role === 'seller') {
        // Seller can access orders related to their cows
        filteredOrders = orders.filter(order => order.cow.seller._id.toString() === userId);
    }
    return filteredOrders;
});
const getSingleOrder = (userId, orderId, role) => __awaiter(void 0, void 0, void 0, function* () {
    const order = yield order_model_1.Order.findById(orderId)
        .populate({
        path: 'cow',
        populate: [
            {
                path: 'seller',
            },
        ],
    })
        .populate('buyer');
    if (!order) {
        throw new ApiError_1.default(http_status_1.default.NOT_FOUND, 'Order does not exist');
    }
    if (role === 'seller' && order.cow.seller._id.toString() !== userId) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You are not the seller of this order');
    }
    if (role === 'buyer' && order.buyer._id.toString() !== userId) {
        throw new ApiError_1.default(http_status_1.default.FORBIDDEN, 'You are not the buyer of this order');
    }
    return order;
});
exports.OrderService = {
    createOrder,
    getAllOrders,
    getSingleOrder,
};
