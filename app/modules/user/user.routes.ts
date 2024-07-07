import { NextFunction, Request, Response, Router } from "express";
import { ResponseHandler } from "../../utility/response.handler";
import userService from "./user.service";
import { IUsers } from "./user.types";
import { upload } from "../../utility/file.upload";
import { permit } from "../../utility/authorize";
import { ROLES } from "../../utility/roles.constants";

export const userRouter = Router();

userRouter.get(
  "/single-user-details",
  permit([ROLES.ADMIN, ROLES.USER]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const user = await userService.getOneUser({
        email: req.query.email as string,
      });
      res.send(new ResponseHandler(user));
    } catch (error) {
      next(error);
    }
  }
);

userRouter.patch(
  "/",
  permit([ROLES.ADMIN, ROLES.USER]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const reqObjectToBeUpdated = req.body as IUsers;
      await userService.updateUser(
        req.query.userId as string,
        reqObjectToBeUpdated
      );
      res.send(new ResponseHandler("User has been updated successfully"));
    } catch (error) {
      next(error);
    }
  }
);

userRouter.post(
  "/upload",
  permit([ROLES.ADMIN, ROLES.USER]),
  upload.single("image"),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const uploadedImage = `${req.protocol}://${req.get("host")}/${
        req.file?.path
      }`;
      await userService.updateUser(req.query.userId as string, {
        photo: uploadedImage,
      });
      res.send(new ResponseHandler("Photo uploaded successfully"));
    } catch (error) {
      next(error);
    }
  }
);

userRouter.get(
  "/all-profiles",
  permit([ROLES.ADMIN]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await userService.getAllUsers();
      res.send(new ResponseHandler(users));
    } catch (error) {
      next(error);
    }
  }
);

userRouter.get(
  "/public-profiles",
  permit([ROLES.ADMIN, ROLES.USER]),
  async (req: Request, res: Response, next: NextFunction) => {
    try {
      const users = await userService.getAllPublicUsers();
      res.send(new ResponseHandler(users));
    } catch (error) {
      next(error);
    }
  }
);
