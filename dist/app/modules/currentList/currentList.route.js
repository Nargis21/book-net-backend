"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CurrentListRoutes = void 0;
const express_1 = __importDefault(require("express"));
const currentList_controller_1 = require("./currentList.controller");
const validateRequest_1 = __importDefault(require("../../middlewares/validateRequest"));
const currentList_validation_1 = require("./currentList.validation");
const auth_1 = __importDefault(require("../../middlewares/auth"));
const router = express_1.default.Router();
router.post('/', (0, validateRequest_1.default)(currentList_validation_1.CurrentListValidation.createCurrentListZodSchema), (0, auth_1.default)(), currentList_controller_1.CurrentListController.createCurrentList);
router.delete('/:id', (0, auth_1.default)(), currentList_controller_1.CurrentListController.deleteCurrentList);
router.patch('/:id', (0, auth_1.default)(), currentList_controller_1.CurrentListController.updateCurrentList);
router.get('/', (0, auth_1.default)(), currentList_controller_1.CurrentListController.getCurrentList);
exports.CurrentListRoutes = router;
