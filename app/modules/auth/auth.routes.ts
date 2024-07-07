import { NextFunction, Request, Response, Router } from "express";
import passport from "passport";
import { userProfile } from "../../utility/passport-setup";
import { ResponseHandler } from "../../utility/response.handler";
import authService from "./auth.service";
import {
  loginValidator,
  passwordResetValidator,
  resettingPasswordValidator,
  signupValidator,
} from "./auth.validation";
import { ILogin, ISignup } from "./auth.types";
import { AUTH_RESPONSES } from "./auth.responses";

export const authRouter = Router();

authRouter.get(
  "/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRouter.get(
  "/google/callback",
  passport.authenticate("google", {
    successRedirect: "/auth/success",
    failureRedirect: "/failed",
  })
);

authRouter.get("/success", async (req, res, next) => {
  try {

    const result = await authService.googleLogin({
      googleId: userProfile.id,
      email: userProfile.email,
      name: userProfile.displayName,
    });
    res.send(new ResponseHandler(result));
  } catch (error) {
    next(error);
  }
});

authRouter.post(
  "/login",
  loginValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const didLogin = await authService.login(req.body as ILogin);
      return res.send(new ResponseHandler(didLogin));
    } catch (e) {
      next(e);
    }
  }
);

authRouter.post(
  "/signup",
  signupValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await authService.creatingUser(req.body as ISignup);
      res.send(new ResponseHandler(AUTH_RESPONSES.SIGNUP_SUCCESSFUL));
    } catch (e) {
      next(e);
    }
  }
);

//email sending for password resetting
authRouter.post(
  "/",
  passwordResetValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await authService.resetPasswordLinkGeneration(req.body.email);
      res.send(new ResponseHandler(AUTH_RESPONSES.RESET_PASSWORD_LINK_SENT));
    } catch (e) {
      next(e);
    }
  }
);

// getting the new password
authRouter.post(
  "/resetPassword/:token",
  resettingPasswordValidator,
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      await authService.passwordReset(req.params.token, req.body.password);
      res.send(new ResponseHandler(AUTH_RESPONSES.PASSWORD_RESET));
    } catch (e) {
      console.log(e);
    }
  }
);

authRouter.get(
  "/logout",
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      res
        .status(200)
        .send(new ResponseHandler(AUTH_RESPONSES.LOGOUT_SUCCESSFUL));
    } catch (e) {
      next(e);
    }
  }
);
