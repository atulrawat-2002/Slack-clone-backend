import express from "express";

import { signinController, signupController } from "../../controllers/userControllers.js";
import { validate } from "../../validators/zodValidator.js";
import { userSigninSchema, userSignupSchema } from "../../validators/userSchema.js";


const router = express.Router();

router.post('/signup', validate(userSignupSchema), signupController);
router.post('/signin', validate(userSigninSchema), signinController);


export default router;