import { createToken, verifyToken } from "../../utility/authorize";
import { sendEmail } from "../../utility/email";
import { comparePassword, createHash } from "../../utility/password";
import userService from "../user/user.service";
import { AUTH_RESPONSES } from "./auth.responses";
import { ILogin, ISignup } from "./auth.types";

const googleLogin = async (googleLoginDetails: ILogin) => {
  try {
    const response = await userService.getOneUser({
      googleId: googleLoginDetails.googleId,
      email: googleLoginDetails.email,
      name: googleLoginDetails.name,
    });
    if (!response) await userService.createUser(googleLoginDetails);
    const user: any = await userService.getOneUser({
      googleId: googleLoginDetails.googleId,
      email: googleLoginDetails.email,
      name: googleLoginDetails.name,
    });
    const token = createToken({
        id: user?._id,
        role: user?.role,
    });
    return {
      message: `LOGIN SUCCESSFUL, WELCOME ${user?.name}`,
      token,
    };
  } catch (error) {
    throw error;
  }
};

const login = async (credentials: ILogin) => {
  try {
    const user: any = await userService.getOneUser({
      email: credentials.email,
    });
    if (
      user &&
      (await comparePassword(
        credentials.password as string,
        user.password || ""
      ))
    ) {
      const token = createToken({ id: user!._id, role: user!.role });
      return {
        message: `LOGIN SUCCESSFUL, WELCOME ${user?.name}`,
        token,
      };
    } else AUTH_RESPONSES.NOT_FOUND;
  } catch (e) {
    throw AUTH_RESPONSES.NOT_FOUND;
  }
};

const creatingUser = async (user: ISignup) => {
  try {
    const existingUser = await userService.getOneUser({ email: user.email });
    if (existingUser) throw AUTH_RESPONSES.ALREADY_EXIST;
    const hashedPassword = await createHash(user.password);
    const userObj = { ...user, password: hashedPassword };
    const didCreate = await userService.createUser(userObj as ISignup);
    return didCreate;
  } catch (e) {
    throw e;
  }
};

const resetPasswordLinkGeneration = async (userEmail: string) => {
  try {
    const user = await userService.getOneUser({ email: userEmail });
    if (user) {
      const token = createToken({ id: user._id });
      const link = `<a href=http:// 192.168.0.104:3001/reset-password/${token} target="_blank" rel="noopener noreferrer">Click here to reset password</a>`;
      sendEmail(
        userEmail,
        "RESET PASSWORD LINK",
        `Hi ${user.name} ,
       Please click on the link below to reset your password`,
        link
      );
      return true;
    }
  } catch (e) {
    throw AUTH_RESPONSES.NOT_FOUND;
  }
};

const passwordReset = async (token: string, password: string) => {
  try {
    const payload: any = verifyToken(token);
    const user = await userService.getOneUser({ id: payload.id });
    if (user) {
      const newPassword = await createHash(password);
      const didUpdate = await userService.updatePassword(
        payload.id,
        newPassword
      );
      if (didUpdate) {
        return true;
      }
    }
  } catch (e) {
    throw AUTH_RESPONSES.NOT_FOUND;
  }
};

export default {
  googleLogin,
  login,
  creatingUser,
  resetPasswordLinkGeneration,
  passwordReset,
};
