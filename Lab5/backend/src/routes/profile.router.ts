import express from "express";
import {profileController} from "../controllers/profile.controller";
import {validate} from "express-validation";
import {validations} from "../validations/validations";
import adminRoleMiddleware from "../middlewares/admin-role.middleware";
import moderatorRoleMiddleware from "../middlewares/moderator-role.middleware";

const router = express.Router();

router.get('/:id', moderatorRoleMiddleware, profileController.getById);
router.get('/', profileController.get);
router.put('/change', validate(validations.profileChangeValidation), profileController.change);
router.put('/change/:id', validate(validations.profileChangeValidation), adminRoleMiddleware, profileController.changeById);
router.delete('/delete', adminRoleMiddleware)

export default router;