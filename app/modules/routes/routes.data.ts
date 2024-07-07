import { IExcludedPaths } from "../../utility/authorize";
// import { DummyRouter } from "../dummy/dummy.routes";
import { authRouter } from "../auth/auth.routes";
import { userRouter } from "../user/user.routes";
import { Route, Routes } from "./routes.types";

export const routes: Routes = [
  new Route("/auth", authRouter),
  new Route("/user", userRouter),
];

export const excludedPaths: IExcludedPaths[] = [
  { path: "/auth/signup", method: "POST" },
  { path: "/auth/google", method: "GET" },
  { path: "/auth/google/callback", method: "GET" },
  { path: "/auth/login" , method: "POST"}
];
