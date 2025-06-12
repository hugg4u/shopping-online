import { Router } from 'express';
import { isAdmin, isAuthenticated } from '../../middlewares';
import {
    createKnowledgeBase,
    getKnowledgeBase,
    getMessages,
    getOrCreateConversation,
    getOrderStatus,
    sendMessage,
} from '../controllers/chatbot';

export default (router: Router) => {
    // Public chatbot routes
    router.post('/chatbot/conversation', getOrCreateConversation);
    router.post('/chatbot/send', sendMessage);
    router.get('/chatbot/messages/:conversationId', getMessages);

    // Authenticated routes
    router.get('/chatbot/orders', isAuthenticated, getOrderStatus);

    // Admin routes for knowledge base management
    router.post(
        '/chatbot/knowledge',
        isAuthenticated,
        isAdmin,
        createKnowledgeBase
    );
    router.get(
        '/chatbot/knowledge',
        isAuthenticated,
        isAdmin,
        getKnowledgeBase
    );
};
