import express from "express";
import authRoute from "./auth-route";
import bookMarkRoute from "./bookmark-route";
// import { isUserAuthenciated } from "../middleware/authenticate-user";

const router = express.Router();

router.use("/", authRoute);
// router.use("/", isUserAuthenciated, bookMarkRoute);

export default router;
