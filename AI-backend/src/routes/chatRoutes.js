
import  express  from 'express';
import { createConversation,getAllConversations } from "../controllers/conversation.js";

const router = express.Router();
router.get("/c",getAllConversations)
router.post("/c/newConversation",createConversation)
export default router;