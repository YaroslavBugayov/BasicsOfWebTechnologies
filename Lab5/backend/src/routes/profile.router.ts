import express from "express";
import {profileController} from "../controllers/profile.controller";

const router = express.Router();

router.get('/', profileController.get);
router.put('/change', profileController.change);

export default router;