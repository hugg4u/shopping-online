import React from 'react';
import { Button, Form, Input, Typography } from 'antd';
import {
    EnvironmentOutlined,
    MailOutlined,
    PhoneOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const Contact = () => {
    return (
        <div
            className="min-h-screen py-8 sm:py-12 lg:py-16"
            style={{ backgroundColor: '#dde8dc' }}
        >
            <div className="responsive-container">
                <div
                    className="rounded-xl p-6 shadow-sm sm:rounded-2xl sm:p-8 lg:p-12"
                    style={{
                        backgroundColor: '#dde8dc',
                        border: '1px solid #365842',
                    }}
                >
                    <Title
                        className="responsive-title mb-8 text-center sm:mb-12"
                        style={{
                            color: '#3C2415',
                            letterSpacing: '0.05em',
                        }}
                    >
                        Liên hệ với chúng tôi
                    </Title>

                    <div className="mb-12 grid grid-cols-1 gap-6 sm:mb-16 sm:grid-cols-2 sm:gap-8 lg:mb-20 lg:grid-cols-3">
                        <div
                            className="flex flex-col items-center justify-center rounded-xl p-6 text-center transition-all duration-300 hover:shadow-md sm:p-8"
                            style={{
                                backgroundColor: '#dde8dc',
                                minHeight: '240px',
                            }}
                        >
                            <div
                                className="flex h-16 w-16 items-center justify-center rounded-full sm:h-20 sm:w-20"
                                style={{ backgroundColor: '#F5E6D3' }}
                            >
                                <PhoneOutlined
                                    className="text-2xl sm:text-3xl lg:text-4xl"
                                    style={{ color: '#C8965F' }}
                                />
                            </div>
                            <Title
                                className="mb-3 mt-4 sm:mb-4 sm:mt-6"
                                level={4}
                                style={{ color: '#3C2415' }}
                            >
                                Hotline
                            </Title>
                            <Text style={{ color: '#6B5B4F', lineHeight: 1.8 }}>
                                Gọi đến hotline chăm sóc khách hàng
                                <br />
                                <span
                                    className="text-base font-semibold sm:text-lg"
                                    style={{ color: '#C8965F' }}
                                >
                                    0912166969
                                </span>
                                <br />
                                Phục vụ 24/7
                            </Text>
                        </div>

                        <div
                            className="flex flex-col items-center justify-center rounded-xl p-6 text-center transition-all duration-300 hover:shadow-md sm:p-8"
                            style={{
                                backgroundColor: '#dde8dc',
                                minHeight: '240px',
                            }}
                        >
                            <div
                                className="flex h-16 w-16 items-center justify-center rounded-full sm:h-20 sm:w-20"
                                style={{ backgroundColor: '#F5E6D3' }}
                            >
                                <MailOutlined
                                    className="text-2xl sm:text-3xl lg:text-4xl"
                                    style={{ color: '#C8965F' }}
                                />
                            </div>
                            <Title
                                className="mb-3 mt-4 sm:mb-4 sm:mt-6"
                                level={4}
                                style={{ color: '#3C2415' }}
                            >
                                Email
                            </Title>
                            <Text style={{ color: '#6B5B4F', lineHeight: 1.8 }}>
                                Gửi email đến
                                <br />
                                <a
                                    className="text-base font-semibold sm:text-lg"
                                    href="mailto:info@somatea.vn"
                                    style={{ color: '#C8965F' }}
                                >
                                    info@somatea.vn
                                </a>
                                <br />
                                Phản hồi trong 24h
                            </Text>
                        </div>

                        <div
                            className="flex flex-col items-center justify-center rounded-xl p-6 text-center transition-all duration-300 hover:shadow-md sm:col-span-2 sm:p-8 lg:col-span-1"
                            style={{
                                backgroundColor: '#dde8dc',
                                minHeight: '240px',
                            }}
                        >
                            <div
                                className="flex h-16 w-16 items-center justify-center rounded-full sm:h-20 sm:w-20"
                                style={{ backgroundColor: '#F5E6D3' }}
                            >
                                <EnvironmentOutlined
                                    className="text-2xl sm:text-3xl lg:text-4xl"
                                    style={{ color: '#C8965F' }}
                                />
                            </div>
                            <Title
                                className="mb-3 mt-4 sm:mb-4 sm:mt-6"
                                level={4}
                                style={{ color: '#3C2415' }}
                            >
                                Địa chỉ
                            </Title>
                            <Text style={{ color: '#6B5B4F', lineHeight: 1.8 }}>
                                Chung cư Phenika,
                                <br />
                                Thạch Hòa, Thạch Thất,
                                <br />
                                TP. Hà Nội, Việt Nam
                            </Text>
                        </div>
                    </div>

                    <div className="flex justify-center">
                        <div className="w-full max-w-2xl">
                            <Title
                                className="responsive-subtitle mb-6 text-center sm:mb-8"
                                level={3}
                                style={{ color: '#3C2415' }}
                            >
                                Gửi tin nhắn cho chúng tôi
                            </Title>
                            <Form
                                className="rounded-xl border p-6 sm:p-8"
                                style={{
                                    backgroundColor: '#dde8dc',
                                    borderColor: '#365842',
                                }}
                            >
                                <Form.Item
                                    name="name"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng nhập tên của bạn!',
                                        },
                                    ]}
                                >
                                    <Input
                                        className="h-10 rounded-lg border text-sm sm:h-12 sm:text-base"
                                        placeholder="Tên của bạn"
                                        style={{
                                            borderColor: '#365842',
                                            backgroundColor: '#dde8dc',
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="email"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng nhập email của bạn!',
                                        },
                                    ]}
                                >
                                    <Input
                                        className="h-10 rounded-lg border text-sm sm:h-12 sm:text-base"
                                        placeholder="Email của bạn"
                                        style={{
                                            borderColor: '#365842',
                                            backgroundColor: '#dde8dc',
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item
                                    name="message"
                                    rules={[
                                        {
                                            required: true,
                                            message:
                                                'Vui lòng nhập tin nhắn của bạn!',
                                        },
                                    ]}
                                >
                                    <Input.TextArea
                                        className="rounded-lg border text-sm sm:text-base"
                                        placeholder="Tin nhắn của bạn"
                                        rows={6}
                                        style={{
                                            borderColor: '#365842',
                                            backgroundColor: '#dde8dc',
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        className="h-10 w-full rounded-lg border-none text-base font-bold text-white sm:h-12 sm:text-lg"
                                        htmlType="submit"
                                        style={{
                                            backgroundColor: '#C8965F',
                                        }}
                                        type="primary"
                                    >
                                        Gửi tin nhắn
                                    </Button>
                                </Form.Item>
                            </Form>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Contact;
