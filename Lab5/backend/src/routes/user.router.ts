import {userController} from "../controllers/user.controller";
import express from "express";

const router = express.Router();

router.post('/registration', userController.registration);
router.post('/login', userController.login);
router.post('/logout', userController.logout);
router.get('/refresh', userController.refresh);

export default router;