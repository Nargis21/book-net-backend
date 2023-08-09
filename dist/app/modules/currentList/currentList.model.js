"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentList = void 0;
const mongoose_1 = require("mongoose");
const CurrentListSchema = new mongoose_1.Schema({
    email: {
        type: String,
        required: true,
    },
    isComplete: {
        type: Boolean,
        default: false,
    },
    book: {
        type: mongoose_1.Schema.Types.ObjectId,
        ref: 'Book',
        required: true,
    },
}, {
    timestamps: true,
});
exports.CurrentList = (0, mongoose_1.model)('CurrentList', CurrentListSchema);
