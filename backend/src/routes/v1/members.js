import express from "express";
import { isUserMemberOfWorkSpaceController } from "../../controllers/memberController.js";
import { isAuthenticated } from "../../middlewares/authMiddleware.js";


const router = express.Router();

router.get('/workspace/:workSpaceId', isAuthenticated, isUserMemberOfWorkSpaceController)

export default router;