import db from "../connection/firebase.js"
import { v4 as uuidv4 } from 'uuid';

export async function getAllConversations(req, res) {
    try{
        const snapshot = await db.collection('AI-Platform').get();
        const conversations = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
        res.status(200).json({ message: 'Chats retrieved successfully', conversations });

    }catch(err){
        console.error("Error fetching conversation", err);
        res.status(500).json({ error: "Internal Server Error" });
    }
}
export async function createConversation(req, res) {
    try {
      const { message, conversationId } = req.body;
  
      if (!message || !Array.isArray(message)) {
        return res.status(400).json({ error: "Message array is required." });
      }
      console.log("message",message)
      const docId = conversationId || uuidv4(); // nếu đã gửi conversationId thì dùng
  
      const conversationRef = db.collection('AI-Platform').doc(docId);
  
      const conversationDoc = await conversationRef.get();
  
      if (conversationDoc.exists) {
        
        const existingData = conversationDoc.data();
  
        const updatedMessages = [...(existingData.messages || []), ...message];
  
        await conversationRef.update({
          messages: updatedMessages,
          updatedAt: new Date(),
        });
  
        res.status(200).json({ message: 'Conversation updated', conversationId: docId });
      } else {
        const newConversation = {
          id: docId,
          title: message[0].message,
          messages: message,
          createdAt: new Date(),
          updatedAt: new Date(),
        };
  
        await conversationRef.set(newConversation);
  
        res.status(201).json({ message: 'Conversation created', conversationId: docId });
      }
    } catch (err) {
      console.error("Error creating or updating conversation", err);
      res.status(500).json({ error: "Internal Server Error" });
    }
  }
  

