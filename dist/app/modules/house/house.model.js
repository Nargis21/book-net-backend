"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.House = void 0;
const mongoose_1 = require("mongoose");
const HouseSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    address: {
        type: String,
        required: true,
    },
    city: {
        type: String,
        required: true,
    },
    bedrooms: {
        type: Number,
        required: true,
    },
    bathrooms: {
        type: Number,
        required: true,
    },
    roomSize: {
        type: Number,
        required: true,
    },
    picture: {
        type: String,
        required: true,
    },
    availabilityDate: {
        type: String,
        required: true,
    },
    rentPerMonth: {
        type: Number,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    description: {
        type: String,
        required: true,
    },
    owner: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
}, {
    timestamps: true,
});
exports.House = (0, mongoose_1.model)('House', HouseSchema);
