"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.HouseRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const house_validation_1 = require("./house.validation");
const house_controller_1 = require("./house.controller");
const users_1 = require("../../../enums/users");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/', (0, auth_1.default)(users_1.ENUM_USER_ROLE.OWNER), (0, validateRequest_1.default)(house_validation_1.HouseValidation.createHouseZodSchema), house_controller_1.HouseController.createHouse);
router.get('/getOwned', (0, auth_1.default)(users_1.ENUM_USER_ROLE.OWNER), house_controller_1.HouseController.getOwnedHouse);
router.patch('/:id', (0, auth_1.default)(users_1.ENUM_USER_ROLE.OWNER), (0, validateRequest_1.default)(house_validation_1.HouseValidation.updateHouseZodSchema), house_controller_1.HouseController.updateHouse);
router.delete('/:id', (0, auth_1.default)(users_1.ENUM_USER_ROLE.OWNER), house_controller_1.HouseController.deleteHouse);
router.get('/', house_controller_1.HouseController.getAllHouses);
exports.HouseRoutes = router;
