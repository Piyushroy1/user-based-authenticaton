import { Document, model } from "mongoose";
import { BaseSchema } from "../../utility/base.schema";
import { IUsers, ProfileAccess, role } from "./user.types";

export const userSchema = new BaseSchema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  photo: {
    type: String,
  },
  profileAccess: {
    type: String,
    enum: [ProfileAccess.PUBLIC, ProfileAccess.PRIVATE],
    default: ProfileAccess.PUBLIC,
  },
  role: {
    type: String,
    enum: [role.USER, role.ADMIN],
    default: role.USER,
  },
  password: {
    type: String,
  },
  googleId: {
    type: String,
  },
});

type IUsersDocument = Document & IUsers;

const userModel = model<IUsersDocument>("user", userSchema);

export default userModel;
