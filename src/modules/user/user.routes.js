import { Router } from "express";
const router = Router();
import * as UC from "./user.controller.js";
import { auth } from "../../middelware/auth.js";
import { validate } from "../../middelware/validation.js";
import * as UV from "./userValidation.js";


router.post("/signup",validate(UV.signupvalidation),UC.signup);
router.post("/signin",validate(UV.signinvalidation), UC.signin);
router.get("/profile", auth(),UC.profile);
router.post("/confirm", UC.confirmEmail);

export default router;
