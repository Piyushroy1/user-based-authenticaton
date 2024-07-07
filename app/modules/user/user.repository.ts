import { ILogin } from "../auth/auth.types";
import userModel from "./user.schema";
import { IUsers } from "./user.types";

const getOne = (criteria: IUsers) => userModel.findOne({ ...criteria });

const createOne = (userCredentials: ILogin) =>
  userModel.create({ ...userCredentials });

const updateOne = (id: string, criteria: IUsers) =>
  userModel.updateOne({ _id: id }, { $set: { ...criteria } });

const findAll = () => userModel.find();

const findPublicUsers = (publicUsers: object) =>
  userModel.find({ ...publicUsers });

export default {
  getOne,
  createOne,
  updateOne,
  findAll,
  findPublicUsers,
};
