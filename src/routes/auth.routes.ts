import { Router } from "express";
import { authController } from "controller/authController";
import { verifyUser } from "middlewares/authToken";


export const authRouter = Router();

authRouter.post('/register', authController.register);
authRouter.post('/login', authController.login);
authRouter.get('/logout', authController.logoutUser);
authRouter.get('/protected' , verifyUser , authController.protectedUser);