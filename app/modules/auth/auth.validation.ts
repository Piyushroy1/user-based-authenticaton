import { body, param } from "express-validator";
import { validate } from "../../utility/validate";
export const loginValidator = [
  body("email").isEmail().notEmpty().withMessage("email is required"),
  body("password")
    .isString()
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("password is invalid"),
  validate,
];

export const signupValidator = [
  body("name").isString().notEmpty().withMessage("name is required"),
  body("email").isEmail().notEmpty().withMessage("email is required"),
  body("password")
    .isString()
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("password is invalid"),
  body("confirmPassword")
    .isString()
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("Confirm password is invalid"),
];

export const passwordResetValidator = [
  body("email").isEmail().notEmpty().withMessage("email is required"),
  validate,
];

export const resettingPasswordValidator = [
  body("password")
    .isString()
    .notEmpty()
    .isLength({ min: 5 })
    .withMessage("password is invalid"),
  validate,
];
