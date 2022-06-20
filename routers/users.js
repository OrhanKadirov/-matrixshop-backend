import express from "express";
import { signIn, signUp, matrixshopUsers } from "../controlers/users.js";

const router = express.Router();

router.post("/signup", signUp);
router.post("/signin", signIn);
router.get("/", matrixshopUsers);

export default router;
