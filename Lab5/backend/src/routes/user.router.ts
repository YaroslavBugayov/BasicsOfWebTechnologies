import {userController} from "../controllers/user.controller";
import express from "express";
import {validate} from "express-validation";
import {validations} from "../validations/validations";

const router = express.Router();

router.post('/registration', validate(validations.registrationValidation), userController.registration);
router.post('/login', validate(validations.loginValidation), userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);

export default router;