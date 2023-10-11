import express from "express";
import {profileController} from "../controllers/profile.controller";
import {validate} from "express-validation";
import {validations} from "../validations/validations";

const router = express.Router();

router.get('/', profileController.get);
router.put('/change', validate(validations.profileChangeValidation), profileController.change);

export default router;