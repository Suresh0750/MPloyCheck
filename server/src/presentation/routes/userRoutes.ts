import express from "express";
import { userController } from "../DIP/usersDIP";
import { authorizeJwt } from "../DIP/middleware";
import { authorizeRole } from "../middlewares/authorizeRole";
import { Role } from "@/domain/entities/utils";


const userRouter = express.Router();

userRouter.post("/signup", userController.signup.bind(userController));
userRouter.post("/login",userController.login.bind(userController))
userRouter.post("/logout",authorizeJwt.execute,authorizeRole([Role.User,Role.Admin]),userController.logout.bind(userController))

export default userRouter;
