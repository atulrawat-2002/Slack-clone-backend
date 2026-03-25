import express from "express";
import { getPaginatedMessagesController } from "../../controllers/messageController.js";
import { isAuthenticated } from "../../middlewares/authMiddleware.js";


const router  = express.Router();


router.get('/:channelId/:workSpaceId', isAuthenticated, getPaginatedMessagesController);


export default router;