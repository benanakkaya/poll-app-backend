import express from "express";
import { registerController, loginController,fetchUserDataController } from "../controllers/userController.js";

const router = express.Router();


router.post("/register", registerController);
router.post("/login", loginController);
router.post("/fetchUserData", fetchUserDataController);




export default router;