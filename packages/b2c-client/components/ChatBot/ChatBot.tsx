/* eslint-disable max-lines */
import {
    CloseOutlined,
    MessageOutlined,
    RobotOutlined,
    SendOutlined,
    WechatOutlined,
} from '@ant-design/icons';
import * as request from '@shopping/common/utils/http-request';
import { useMutation } from '@tanstack/react-query';
import { Avatar, Button, Spin } from 'antd';
import React, { useEffect, useRef, useState } from 'react';
import { toast } from 'react-toastify';
import styles from './ChatBot.module.scss';

interface Message {
    id: string;
    content: string;
    role: 'USER' | 'ASSISTANT';
    createdAt: string;
    metadata?: Record<string, unknown>;
}

interface Conversation {
    id: string;
    sessionId: string;
    messages: Message[];
}

const ChatBot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [inputMessage, setInputMessage] = useState('');
    const [conversation, setConversation] = useState<Conversation | null>(null);
    const [messages, setMessages] = useState<Message[]>([]);
    const messagesEndRef = useRef<HTMLDivElement>(null);

    // Auto-scroll to bottom when new messages arrive
    const scrollToBottom = () => {
        messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages]);

    // Initialize conversation
    const { mutate: initConversation, isPending: initLoading } = useMutation({
        mutationFn: (sessionId?: string) => {
            return request
                .post('chatbot/conversation', { sessionId })
                .then((res) => res.data);
        },
        onSuccess: (res) => {
            setConversation(res.data);
            setMessages(res.data.messages || []);

            // Add welcome message if no messages exist
            if (!res.data.messages || res.data.messages.length === 0) {
                const welcomeMessage: Message = {
                    id: `welcome-${Date.now()}`,
                    content:
                        'Xin chào! 👋 Tôi là trợ lý AI của SomaTea - cửa hàng trà cao cấp. Tôi có thể giúp bạn tư vấn về các loại trà, cách pha trà, kiểm tra đơn hàng và các dịch vụ khác. Bạn cần hỗ trợ gì không?',
                    role: 'ASSISTANT',
                    createdAt: new Date().toISOString(),
                };
                setMessages([welcomeMessage]);
            }
        },
        onError: () => {
            toast.error('Không thể kết nối chatbot', {
                position: 'bottom-right',
            });
        },
    });

    // Send message
    const { mutate: sendMessage, isPending: sendLoading } = useMutation({
        mutationFn: (data: { conversationId: string; content: string }) => {
            return request.post('chatbot/send', data).then((res) => res.data);
        },
        onSuccess: (res) => {
            const { userMessage, assistantMessage } = res.data;
            setMessages((prev) => [...prev, userMessage, assistantMessage]);
            setInputMessage('');
        },
        onError: () => {
            toast.error('Không thể gửi tin nhắn', {
                position: 'bottom-right',
            });
        },
    });

    const handleOpenChat = () => {
        setIsOpen(true);
        if (!conversation) {
            const sessionId =
                localStorage.getItem('chatSessionId') || undefined;
            initConversation(sessionId);
        }
    };

    const handleCloseChat = () => {
        setIsOpen(false);
    };

    const handleSendMessage = () => {
        if (!inputMessage.trim() || !conversation) return;

        sendMessage({
            conversationId: conversation.id,
            content: inputMessage.trim(),
        });
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSendMessage();
        }
    };

    const formatTime = (timestamp: string) => {
        return new Date(timestamp).toLocaleTimeString('vi-VN', {
            hour: '2-digit',
            minute: '2-digit',
        });
    };

    // Quick action buttons for tea business
    const quickActions = [
        {
            text: '🍃 Tư vấn loại trà',
            action: () => setInputMessage('Tôi muốn tìm hiểu về các loại trà'),
        },
        {
            text: '📦 Kiểm tra đơn hàng',
            action: () => setInputMessage('Kiểm tra đơn hàng của tôi'),
        },
        {
            text: '☕ Cách pha trà',
            action: () => setInputMessage('Hướng dẫn cách pha trà ngon'),
        },
        {
            text: '🎁 Khuyến mãi',
            action: () =>
                setInputMessage('Có chương trình khuyến mãi gì không?'),
        },
    ];

    const handleQuickAction = (action: () => void) => {
        action();
        // Auto send the message after a short delay
        setTimeout(() => {
            if (conversation && inputMessage) {
                handleSendMessage();
            }
        }, 100);
    };

    return (
        <div>
            {/* Chat Toggle Button */}
            <div className={styles.chatToggle}>
                <Button
                    className={styles.toggleButton}
                    icon={<MessageOutlined className="text-4xl" />}
                    onClick={handleOpenChat}
                    shape="circle"
                    size="large"
                    type="primary"
                />
            </div>

            {/* Chat Window */}
            {isOpen && (
                <div className={styles.chatWindow}>
                    <div className={styles.chatCard}>
                        {/* Header */}
                        <div className={styles.chatHeader}>
                            <div className={styles.headerContent}>
                                <div className={styles.headerInfo}>
                                    <Avatar
                                        className={styles.botAvatar}
                                        icon={<RobotOutlined />}
                                        size={32}
                                    />
                                    <div className={styles.botInfo}>
                                        <h3>SomaTea Assistant</h3>
                                        <div className={styles.status}>
                                            <div className={styles.statusDot} />
                                            <span>Đang hoạt động</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    aria-label="Close chat"
                                    className={styles.closeButton}
                                    onClick={handleCloseChat}
                                    type="button"
                                >
                                    <CloseOutlined />
                                </button>
                            </div>
                        </div>

                        {/* Messages Container */}
                        <div className={styles.messagesContainer}>
                            <div className={styles.messagesContent}>
                                {initLoading ? (
                                    <div className={styles.loadingContainer}>
                                        <Spin size="default" />
                                        <div className={styles.loadingText}>
                                            Đang kết nối với trợ lý AI...
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        {messages.length === 0 && (
                                            <div
                                                className={
                                                    styles.welcomeMessage
                                                }
                                            >
                                                <WechatOutlined
                                                    className={
                                                        styles.welcomeIcon
                                                    }
                                                />
                                                <h3>
                                                    Chào mừng đến SomaTea! 🍃
                                                </h3>
                                                <p>
                                                    Tôi là trợ lý AI chuyên về
                                                    trà. Hãy hỏi tôi về các loại
                                                    trà, cách pha trà hoặc bất
                                                    kỳ thắc mắc nào!
                                                </p>
                                            </div>
                                        )}

                                        {messages.map((message) => (
                                            <div
                                                className={`${styles.messageWrapper} ${
                                                    message.role === 'USER'
                                                        ? styles.userMessage
                                                        : styles.assistantMessage
                                                }`}
                                                key={message.id}
                                            >
                                                {message.role ===
                                                    'ASSISTANT' && (
                                                    <div
                                                        className={
                                                            styles.messageContent
                                                        }
                                                    >
                                                        <Avatar
                                                            className={
                                                                styles.messageAvatar
                                                            }
                                                            icon={
                                                                <RobotOutlined />
                                                            }
                                                            size={24}
                                                        />
                                                        <div
                                                            className={
                                                                styles.messageBubble
                                                            }
                                                        >
                                                            <p
                                                                className={
                                                                    styles.messageText
                                                                }
                                                            >
                                                                {
                                                                    message.content
                                                                }
                                                            </p>
                                                            <div
                                                                className={
                                                                    styles.messageTime
                                                                }
                                                            >
                                                                {formatTime(
                                                                    message.createdAt
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {message.role === 'USER' && (
                                                    <div
                                                        className={
                                                            styles.messageBubble
                                                        }
                                                    >
                                                        <p
                                                            className={
                                                                styles.messageText
                                                            }
                                                        >
                                                            {message.content}
                                                        </p>
                                                        <div
                                                            className={
                                                                styles.messageTime
                                                            }
                                                        >
                                                            {formatTime(
                                                                message.createdAt
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}

                                        {/* Typing Indicator */}
                                        {sendLoading && (
                                            <div
                                                className={`${styles.messageWrapper} ${styles.assistantMessage}`}
                                            >
                                                <div
                                                    className={
                                                        styles.messageContent
                                                    }
                                                >
                                                    <Avatar
                                                        className={
                                                            styles.messageAvatar
                                                        }
                                                        icon={<RobotOutlined />}
                                                        size={24}
                                                    />
                                                    <div
                                                        className={
                                                            styles.typingIndicator
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                styles.typingDots
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    styles.dot
                                                                }
                                                            />
                                                            <div
                                                                className={
                                                                    styles.dot
                                                                }
                                                            />
                                                            <div
                                                                className={
                                                                    styles.dot
                                                                }
                                                            />
                                                        </div>
                                                        <span
                                                            className={
                                                                styles.typingText
                                                            }
                                                        >
                                                            Đang tư vấn...
                                                        </span>
                                                    </div>
                                                </div>
                                            </div>
                                        )}

                                        <div ref={messagesEndRef} />
                                    </>
                                )}
                            </div>
                        </div>

                        {/* Quick Actions */}
                        {!initLoading && messages.length <= 1 && (
                            <div className={styles.quickActions}>
                                <div className={styles.quickTitle}>
                                    Câu hỏi thường gặp
                                </div>
                                <div className={styles.actionButtons}>
                                    {quickActions.map((action, index) => (
                                        <button
                                            className={styles.actionButton}
                                            key={action.text}
                                            onClick={() =>
                                                handleQuickAction(action.action)
                                            }
                                            type="button"
                                        >
                                            {action.text}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Input Area */}
                        <div className={styles.inputArea}>
                            <div className={styles.inputWrapper}>
                                <input
                                    className={styles.messageInput}
                                    disabled={sendLoading || !conversation}
                                    onChange={(e) =>
                                        setInputMessage(e.target.value)
                                    }
                                    onKeyPress={handleKeyPress}
                                    placeholder="Nhập câu hỏi về trà..."
                                    type="text"
                                    value={inputMessage}
                                />
                                <Button
                                    className={styles.sendButton}
                                    disabled={
                                        !inputMessage.trim() ||
                                        !conversation ||
                                        sendLoading
                                    }
                                    icon={<SendOutlined />}
                                    loading={sendLoading}
                                    onClick={handleSendMessage}
                                    shape="circle"
                                    size="small"
                                    type="primary"
                                />
                            </div>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ChatBot;
