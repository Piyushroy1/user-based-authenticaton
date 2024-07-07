import { ILogin } from "../auth/auth.types";
import { USER_RESPONSE } from "./user.constants";
import userRepository from "./user.repository";
import { IUsers } from "./user.types";

const createUser = async (loginDetails: ILogin) => {
  try {
    const response = await userRepository.createOne(loginDetails);
    return response;
  } catch (error) {
    throw error;
  }
};

const getOneUser = async (criteria: object) => {
  try {
    const user = await userRepository.getOne(criteria);
    return user;
  } catch (e) {
    throw e;
  }
};

const updatePassword = async (id: string, userPassword: string) => {
  try {
    const didUpdate = await userRepository.updateOne(id, {
      password: userPassword,
    });
    return didUpdate;
  } catch (e) {
    USER_RESPONSE.NOT_FOUND;
  }
};

const updateUser = async (id: string, user: IUsers) => {
  try {
    const didUpdate = await userRepository.updateOne(id, user);
    return didUpdate;
  } catch (e) {
    USER_RESPONSE.NOT_FOUND;
  }
};

const getAllUsers = async () => {
  try {
    return await userRepository.findAll();
  } catch (error) {
    throw error;
  }
};

const getAllPublicUsers = async () => {
  try {
    return await userRepository.findPublicUsers({ profileAccess: "public" });
  } catch (error) {
    throw USER_RESPONSE.NOT_FOUND;
  }
};

export default {
  createUser,
  getOneUser,
  updatePassword,
  updateUser,
  getAllUsers,
  getAllPublicUsers,
};
