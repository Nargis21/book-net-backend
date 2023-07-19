"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Booking = void 0;
const mongoose_1 = require("mongoose");
const BookingSchema = new mongoose_1.Schema({
    name: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    phoneNumber: {
        type: String,
        required: true,
    },
    renter: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    house: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'House',
        required: true,
    },
}, {
    timestamps: true,
});
exports.Booking = (0, mongoose_1.model)('Booking', BookingSchema);
