"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AdminRoutes = void 0;
const express_1 = __importDefault(require("express"));
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const admin_validation_1 = require("./admin.validation");
const admin_controller_1 = require("./admin.controller");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const users_1 = require("../../../enums/users");
const router = express_1.default.Router();
router.post('/create-admin', (0, validateRequest_1.default)(admin_validation_1.AdminValidation.createAdminZodSchema), admin_controller_1.AdminController.createAdmin);
router.get('/my-profile', (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN), admin_controller_1.AdminController.getProfile);
router.patch('/my-profile', (0, auth_1.default)(users_1.ENUM_USER_ROLE.ADMIN), (0, validateRequest_1.default)(admin_validation_1.AdminValidation.updateAdminProfileZodSchema), admin_controller_1.AdminController.updateProfile);
router.post('/login', (0, validateRequest_1.default)(admin_validation_1.AdminValidation.loginAdminZodSchema), admin_controller_1.AdminController.loginAdmin);
exports.AdminRoutes = router;
