import { Router } from "express";
import * as MC from "./massage.controller.js";
import { auth } from "../../middelware/auth.js";
import { massage } from "./massage.validation.js";
import { validate } from "../../middelware/validation.js";

const router = Router();

router.post("/add", auth(),validate(massage), MC.addMessage);
router.get("/GetMessage", auth(), MC.getMessages);
router.delete("/delete/:messageId", auth(), MC.deleteMessage);


export default router;
