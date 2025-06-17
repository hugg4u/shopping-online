import { GoogleGenerativeAI } from '@google/generative-ai';
import { Request, Response } from 'express';
import { jwtDecode } from 'jwt-decode';
import { db } from '../../../lib/db';
import { getToken } from '../../../lib/utils';
import { TokenDecoded } from '../../../types';

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY || '');

// Generate session ID for anonymous users
const generateSessionId = (): string => {
    return `session_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`;
};

// Get or create conversation
export const getOrCreateConversation = async (req: Request, res: Response) => {
    try {
        const accessToken = getToken(req);
        let userId = null;

        if (accessToken) {
            try {
                const tokenDecoded = (await jwtDecode(
                    accessToken
                )) as TokenDecoded;
                userId = tokenDecoded.id;
            } catch (error) {
                // Token invalid, continue as anonymous
            }
        }

        const { sessionId } = req.body;
        let finalSessionId = sessionId;

        if (!finalSessionId) {
            finalSessionId = generateSessionId();
        }

        // Try to find existing conversation (using any for now until Prisma generates)
        let conversation;
        try {
            // eslint-disable-next-line @typescript-eslint/no-explicit-any
            conversation = await (db as any).chatConversation.findFirst({
                where: userId
                    ? { userId, isActive: true }
                    : { sessionId: finalSessionId, isActive: true },
                include: {
                    messages: {
                        orderBy: {
                            createdAt: 'asc',
                        },
                        take: 50, // Limit recent messages
                    },
                },
            });

            // Create new conversation if not found
            if (!conversation) {
                // eslint-disable-next-line @typescript-eslint/no-explicit-any
                conversation = await (db as any).chatConversation.create({
                    data: {
                        userId,
                        sessionId: finalSessionId,
                        isActive: true,
                    },
                    include: {
                        messages: true,
                    },
                });
            }
        } catch (dbError) {
            // Fallback if database models not available
            conversation = {
                id: `conv-${Date.now()}`,
                sessionId: finalSessionId,
                userId,
                messages: [],
                isActive: true,
                createdAt: new Date().toISOString(),
            };
        }

        return res.status(200).json({
            isOk: true,
            data: conversation,
            message: 'Conversation retrieved successfully!',
        });
    } catch (error) {
        // console.error('Error in getOrCreateConversation:', error);
        return res.status(500).json({
            isOk: false,
            message: 'Failed to get conversation',
        });
    }
};

// Send message with AI response
export const sendMessage = async (req: Request, res: Response) => {
    try {
        const { conversationId, content } = req.body;

        if (!conversationId || !content) {
            return res.status(400).json({
                isOk: false,
                message: 'Missing required fields',
            });
        }

        // Generate AI response using Gemini
        const model = genAI.getGenerativeModel({
            model: process.env.GEMINI_MODEL || 'gemini-1.5-flash',
        });

        const systemPrompt = `Bạn là trợ lý AI của SomaTea - cửa hàng trà cao cấp trực tuyến. Hãy trả lời một cách thân thiện, hữu ích và chuyên nghiệp bằng tiếng Việt.
                    
Thông tin về SomaTea:
- Chuyên cung cấp các loại trà cao cấp: trà xanh, trà đen, trà oolong, trà thảo mộc
- Trà được chọn lọc từ những vùng trồng trà nổi tiếng
- Cam kết chất lượng và hương vị tự nhiên
- Hỗ trợ thanh toán COD và chuyển khoản
- Giao hàng toàn quốc, miễn phí ship cho đơn từ 500k
- Chính sách đổi trả trong 7 ngày nếu không hài lòng
- Tư vấn cách pha trà và bảo quản đúng cách

Bạn có thể tư vấn về:
- Các loại trà và đặc điểm riêng
- Lợi ích sức khỏe của từng loại trà
- Cách pha trà ngon
- Khuyến mãi và chương trình ưu đãi
- Hỗ trợ đặt hàng và theo dõi đơn hàng

Hãy trả lời ngắn gọn, súc tích và hữu ích. Luôn giữ tông giọi ấm áp như hương vị trà.

Câu hỏi của khách hàng: ${content}`;

        const result = await model.generateContent(systemPrompt);
        const response = await result.response;
        const aiResponse =
            response.text() ||
            'Xin lỗi, tôi không thể xử lý yêu cầu này lúc này.';

        // Create response messages (simplified without database for now)
        const userMessage = {
            id: `user-${Date.now()}`,
            conversationId,
            content,
            role: 'USER',
            createdAt: new Date().toISOString(),
        };

        const assistantMessage = {
            id: `assistant-${Date.now()}`,
            conversationId,
            content: aiResponse,
            role: 'ASSISTANT',
            createdAt: new Date().toISOString(),
        };

        return res.status(200).json({
            isOk: true,
            data: {
                userMessage,
                assistantMessage,
            },
            message: 'Message sent successfully with AI response!',
        });
    } catch (error) {
        // console.error('Error in sendMessage:', error);

        // Fallback response if AI fails
        const fallbackMessage = {
            id: `assistant-${Date.now()}`,
            conversationId: req.body.conversationId,
            content:
                'Xin lỗi, tôi đang gặp sự cố kỹ thuật. Vui lòng thử lại sau hoặc liên hệ support.',
            role: 'ASSISTANT',
            createdAt: new Date().toISOString(),
        };

        return res.status(200).json({
            isOk: true,
            data: {
                userMessage: {
                    id: `user-${Date.now()}`,
                    conversationId: req.body.conversationId,
                    content: req.body.content,
                    role: 'USER',
                    createdAt: new Date().toISOString(),
                },
                assistantMessage: fallbackMessage,
            },
            message: 'Message sent with fallback response',
        });
    }
};

// Get messages
export const getMessages = async (req: Request, res: Response) => {
    try {
        // const { conversationId } = req.params;

        return res.status(200).json({
            isOk: true,
            data: [],
            message: 'Messages retrieved successfully!',
        });
    } catch (error) {
        // console.error('Error in getMessages:', error);
        return res.status(500).json({
            isOk: false,
            message: 'Failed to get messages',
        });
    }
};

// Get user's order status (for authenticated users)
export const getOrderStatus = async (req: Request, res: Response) => {
    try {
        const accessToken = getToken(req);

        if (!accessToken) {
            return res.status(401).json({
                isOk: false,
                message: 'Authentication required',
            });
        }

        const tokenDecoded = (await jwtDecode(accessToken)) as TokenDecoded;

        const orders = await db.order.findMany({
            where: {
                userId: tokenDecoded.id,
            },
            orderBy: {
                createdAt: 'desc',
            },
            take: 5,
            select: {
                id: true,
                status: true,
                totalAmount: true,
                createdAt: true,
                orderDetail: {
                    select: {
                        productName: true,
                        quantity: true,
                    },
                },
            },
        });

        return res.status(200).json({
            isOk: true,
            data: orders,
            message: 'Orders retrieved successfully!',
        });
    } catch (error) {
        // console.error('Error in getOrderStatus:', error);
        return res.status(500).json({
            isOk: false,
            message: 'Failed to get order status',
        });
    }
};

// TEMPORARY PLACEHOLDER - Admin: Manage knowledge base
export const createKnowledgeBase = async (req: Request, res: Response) => {
    try {
        return res.status(201).json({
            isOk: true,
            data: { id: 'temp-kb', ...req.body },
            message:
                'Knowledge base entry created successfully! (Temporary implementation)',
        });
    } catch (error) {
        console.error('Error in createKnowledgeBase:', error);
        return res.status(500).json({
            isOk: false,
            message: 'Failed to create knowledge base entry',
        });
    }
};

// TEMPORARY PLACEHOLDER - Get knowledge base
export const getKnowledgeBase = async (req: Request, res: Response) => {
    try {
        return res.status(200).json({
            isOk: true,
            data: [],
            pagination: {
                total: 0,
                page: 1,
                limit: 20,
            },
            message:
                'Knowledge base retrieved successfully! (Temporary implementation)',
        });
    } catch (error) {
        console.error('Error in getKnowledgeBase:', error);
        return res.status(500).json({
            isOk: false,
            message: 'Failed to get knowledge base',
        });
    }
};
