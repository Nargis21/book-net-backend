"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BookingRoutes = void 0;
const express_1 = __importDefault(require("express"));
const booking_controller_1 = require("./booking.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const booking_validation_1 = require("./booking.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const users_1 = require("../../../enums/users");
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(booking_validation_1.BookingValidation.createBookingZodSchema), (0, auth_1.default)(users_1.ENUM_USER_ROLE.RENTER), booking_controller_1.BookingController.createBooking);
router.get('/', (0, auth_1.default)(users_1.ENUM_USER_ROLE.RENTER), booking_controller_1.BookingController.getBookings);
router.delete('/:id', (0, auth_1.default)(users_1.ENUM_USER_ROLE.RENTER), booking_controller_1.BookingController.deleteBooking);
exports.BookingRoutes = router;
