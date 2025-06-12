import React, { useEffect, useRef, useState } from 'react';
import { Avatar, Button, Card, Input, message, Spin } from 'antd';
import {
    CloseOutlined,
    MessageOutlined,
    RobotOutlined,
    SendOutlined,
    WechatOutlined,
} from '@ant-design/icons';
import styles from './ChatBot.module.scss';

const { TextArea } = Input;

interface Message {
    id: string;
    role: 'USER' | 'ASSISTANT';
    content: string;
    timestamp: string;
}

const ChatBot: React.FC = () => {
    const [isOpen, setIsOpen] = useState(false);
    const [messages, setMessages] = useState<Message[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isTyping, setIsTyping] = useState(false);
    const messagesEndRef = useRef<HTMLDivElement>(null);
    const messagesContainerRef = useRef<HTMLDivElement>(null);

    const quickActions = [
        { emoji: '🍃', text: 'Tư vấn loại trà' },
        { emoji: '📦', text: 'Kiểm tra đơn hàng' },
        { emoji: '☕', text: 'Cách pha trà' },
        { emoji: '🎁', text: 'Khuyến mãi' },
    ];

    const scrollToBottom = () => {
        if (messagesContainerRef.current) {
            messagesContainerRef.current.scrollTop =
                messagesContainerRef.current.scrollHeight;
        }
    };

    useEffect(() => {
        scrollToBottom();
    }, [messages, isTyping]);

    // Test scroll with sample messages when opening chatbot
    useEffect(() => {
        if (isOpen && messages.length === 0) {
            // Add some sample messages to test scrolling - về trà thay vì quần áo
            const sampleMessages: Message[] = [
                {
                    id: 'welcome',
                    role: 'ASSISTANT',
                    content:
                        'Xin chào! Tôi là trợ lý AI của SomaTea 🍃 Tôi có thể giúp bạn tìm hiểu về các loại trà cao cấp, tư vấn cách pha trà, và hỗ trợ đặt hàng. Bạn cần hỗ trợ gì hôm nay?',
                    timestamp: new Date().toLocaleTimeString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit',
                    }),
                },
            ];

            setTimeout(() => {
                setMessages(sampleMessages);
            }, 500);
        }
    }, [isOpen]);

    const sendMessage = async (content: string) => {
        if (!content.trim()) return;

        const userMessage: Message = {
            id: `user-${Date.now()}`,
            role: 'USER',
            content: content.trim(),
            timestamp: new Date().toLocaleTimeString('vi-VN', {
                hour: '2-digit',
                minute: '2-digit',
            }),
        };

        setMessages((prev) => [...prev, userMessage]);
        setInputValue('');
        setIsLoading(true);
        setIsTyping(true);

        try {
            const response = await fetch('/api/chatbot/message', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ message: content }),
            });

            if (!response.ok) {
                throw new Error('Network response was not ok');
            }

            const data = await response.json();

            // Simulate typing delay
            setTimeout(() => {
                setIsTyping(false);
                const assistantMessage: Message = {
                    id: `assistant-${Date.now()}`,
                    role: 'ASSISTANT',
                    content:
                        data.response ||
                        'Xin lỗi, tôi không thể phản hồi lúc này.',
                    timestamp: new Date().toLocaleTimeString('vi-VN', {
                        hour: '2-digit',
                        minute: '2-digit',
                    }),
                };
                setMessages((prev) => [...prev, assistantMessage]);
            }, 1000);
        } catch (error) {
            console.error('Error:', error);
            setIsTyping(false);
            message.error('Có lỗi xảy ra khi gửi tin nhắn', 3);
        } finally {
            setIsLoading(false);
        }
    };

    const handleSend = () => {
        sendMessage(inputValue);
    };

    const handleKeyPress = (e: React.KeyboardEvent) => {
        if (e.key === 'Enter' && !e.shiftKey) {
            e.preventDefault();
            handleSend();
        }
    };

    const handleQuickAction = (actionText: string) => {
        sendMessage(actionText);
    };

    const formatTime = (timestamp: string) => {
        return timestamp;
    };

    return (
        <>
            {/* Chat Toggle Button */}
            <div className={styles.chatToggle}>
                <Button
                    className={styles.toggleButton}
                    icon={isOpen ? <CloseOutlined /> : <MessageOutlined />}
                    onClick={() => setIsOpen(!isOpen)}
                    shape="circle"
                    size="large"
                />
            </div>

            {/* Chat Window */}
            {isOpen && (
                <div className={styles.chatWindow}>
                    <Card className={styles.chatCard}>
                        {/* Header */}
                        <div className={styles.chatHeader}>
                            <div className={styles.headerContent}>
                                <div className={styles.headerInfo}>
                                    <Avatar
                                        className={styles.botAvatar}
                                        icon={<RobotOutlined />}
                                        size={48}
                                    />
                                    <div className={styles.botInfo}>
                                        <h3>AI Assistant</h3>
                                        <div className={styles.status}>
                                            <div className={styles.statusDot} />
                                            <span>Đang hoạt động</span>
                                        </div>
                                    </div>
                                </div>
                                <button
                                    className={styles.closeButton}
                                    onClick={() => setIsOpen(false)}
                                >
                                    <CloseOutlined />
                                </button>
                            </div>
                        </div>

                        {/* Messages Container */}
                        <div
                            className={styles.messagesContainer}
                            ref={messagesContainerRef}
                        >
                            <div className={styles.messagesContent}>
                                {isLoading && messages.length === 0 ? (
                                    <div className={styles.loadingContainer}>
                                        <Spin size="large" />
                                        <div className={styles.loadingText}>
                                            Đang khởi tạo trợ lý AI...
                                        </div>
                                    </div>
                                ) : (
                                    <>
                                        {/* Welcome Message */}
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
                                                    Xin chào! Tôi là trợ lý AI
                                                </h3>
                                                <p>
                                                    Tôi có thể giúp bạn tìm sản
                                                    phẩm, kiểm tra đơn hàng, và
                                                    trả lời mọi câu hỏi về dịch
                                                    vụ của chúng tôi.
                                                </p>
                                            </div>
                                        )}

                                        {/* Messages */}
                                        {messages.map((msg) => (
                                            <div
                                                className={`${styles.messageWrapper} ${
                                                    msg.role === 'USER'
                                                        ? styles.userMessage
                                                        : styles.assistantMessage
                                                }`}
                                                key={msg.id}
                                            >
                                                {msg.role === 'ASSISTANT' && (
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
                                                            size={32}
                                                        />
                                                        <div
                                                            className={
                                                                styles.messageBubble
                                                            }
                                                        >
                                                            <div
                                                                className={
                                                                    styles.messageText
                                                                }
                                                            >
                                                                {msg.content}
                                                            </div>
                                                            <div
                                                                className={
                                                                    styles.messageTime
                                                                }
                                                            >
                                                                {formatTime(
                                                                    msg.timestamp
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                )}

                                                {msg.role === 'USER' && (
                                                    <div
                                                        className={
                                                            styles.messageBubble
                                                        }
                                                    >
                                                        <div
                                                            className={
                                                                styles.messageText
                                                            }
                                                        >
                                                            {msg.content}
                                                        </div>
                                                        <div
                                                            className={
                                                                styles.messageTime
                                                            }
                                                        >
                                                            {formatTime(
                                                                msg.timestamp
                                                            )}
                                                        </div>
                                                    </div>
                                                )}
                                            </div>
                                        ))}

                                        {/* Typing Indicator */}
                                        {isTyping && (
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
                                                        size={32}
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
                                                            AI đang soạn tin
                                                            nhắn...
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
                        {messages.length === 0 && !isLoading && (
                            <div className={styles.quickActions}>
                                <div className={styles.quickTitle}>
                                    Gợi ý câu hỏi
                                </div>
                                <div className={styles.actionButtons}>
                                    {quickActions.map((action, index) => (
                                        <button
                                            className={styles.actionButton}
                                            key={`action-${index}`}
                                            onClick={() =>
                                                handleQuickAction(action.text)
                                            }
                                        >
                                            {action.emoji} {action.text}
                                        </button>
                                    ))}
                                </div>
                            </div>
                        )}

                        {/* Input Area */}
                        <div className={styles.inputArea}>
                            <div className={styles.inputWrapper}>
                                <TextArea
                                    autoSize={{ minRows: 1, maxRows: 4 }}
                                    className={styles.messageInput}
                                    disabled={isLoading}
                                    onChange={(e) =>
                                        setInputValue(e.target.value)
                                    }
                                    onKeyPress={handleKeyPress}
                                    placeholder="Nhập tin nhắn của bạn..."
                                    rows={1}
                                    value={inputValue}
                                />
                                <Button
                                    className={styles.sendButton}
                                    disabled={!inputValue.trim() || isLoading}
                                    icon={<SendOutlined />}
                                    loading={isLoading}
                                    onClick={handleSend}
                                    shape="circle"
                                />
                            </div>
                        </div>
                    </Card>
                </div>
            )}
        </>
    );
};

export default ChatBot;
