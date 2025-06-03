import React from 'react';
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import {
    ClockCircleOutlined,
    EnvironmentOutlined,
    MailOutlined,
    PhoneOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const Contact = () => {
    return (
        <div
            className="min-h-screen py-16"
            style={{ backgroundColor: '#FAF6F0' }}
        >
            <div className="mx-auto max-w-[1200px] px-4">
                <div
                    className="rounded-2xl p-12 shadow-sm"
                    style={{
                        backgroundColor: '#F5F1E8',
                        border: '1px solid #E5DDD5',
                    }}
                >
                    <Title
                        className="mb-12 text-center text-4xl font-bold md:text-5xl"
                        style={{
                            color: '#3C2415',
                            letterSpacing: '0.05em',
                        }}
                    >
                        Liên hệ với chúng tôi
                    </Title>

                    <Row className="mb-20" gutter={[32, 32]}>
                        <Col
                            className="rounded-xl p-8 text-center transition-all duration-300 hover:shadow-md"
                            md={6}
                            sm={12}
                            style={{ backgroundColor: '#FAF6F0' }}
                            xs={24}
                        >
                            <PhoneOutlined
                                className="mb-6 text-5xl"
                                style={{ color: '#C8965F' }}
                            />
                            <Title
                                className="mb-3"
                                level={4}
                                style={{ color: '#3C2415' }}
                            >
                                Hotline
                            </Title>
                            <Text style={{ color: '#6B5B4F', lineHeight: 1.6 }}>
                                Gọi đến hotline chăm sóc khách hàng
                                <br />
                                <span
                                    className="font-semibold"
                                    style={{ color: '#C8965F' }}
                                >
                                    1900-1234 (miễn phí)
                                </span>
                                <br />
                                Phục vụ 24/7
                            </Text>
                        </Col>

                        <Col
                            className="rounded-xl p-8 text-center transition-all duration-300 hover:shadow-md"
                            md={6}
                            sm={12}
                            style={{ backgroundColor: '#FAF6F0' }}
                            xs={24}
                        >
                            <MailOutlined
                                className="mb-6 text-5xl"
                                style={{ color: '#C8965F' }}
                            />
                            <Title
                                className="mb-3"
                                level={4}
                                style={{ color: '#3C2415' }}
                            >
                                Email
                            </Title>
                            <Text style={{ color: '#6B5B4F', lineHeight: 1.6 }}>
                                Gửi email đến
                                <br />
                                <a
                                    className="font-semibold"
                                    href="mailto:info@somatea.vn"
                                    style={{ color: '#C8965F' }}
                                >
                                    info@somatea.vn
                                </a>
                                <br />
                                Phản hồi trong 24h
                            </Text>
                        </Col>

                        <Col
                            className="rounded-xl p-8 text-center transition-all duration-300 hover:shadow-md"
                            md={6}
                            sm={12}
                            style={{ backgroundColor: '#FAF6F0' }}
                            xs={24}
                        >
                            <EnvironmentOutlined
                                className="mb-6 text-5xl"
                                style={{ color: '#C8965F' }}
                            />
                            <Title
                                className="mb-3"
                                level={4}
                                style={{ color: '#3C2415' }}
                            >
                                Địa chỉ
                            </Title>
                            <Text style={{ color: '#6B5B4F', lineHeight: 1.6 }}>
                                123 Đường Trà, Quận 1
                                <br />
                                TP. Hồ Chí Minh
                                <br />
                                Việt Nam
                            </Text>
                        </Col>

                        <Col
                            className="rounded-xl p-8 text-center transition-all duration-300 hover:shadow-md"
                            md={6}
                            sm={12}
                            style={{ backgroundColor: '#FAF6F0' }}
                            xs={24}
                        >
                            <ClockCircleOutlined
                                className="mb-6 text-5xl"
                                style={{ color: '#C8965F' }}
                            />
                            <Title
                                className="mb-3"
                                level={4}
                                style={{ color: '#3C2415' }}
                            >
                                Giờ làm việc
                            </Title>
                            <Text style={{ color: '#6B5B4F', lineHeight: 1.6 }}>
                                Thứ 2 - Chủ nhật
                                <br />
                                <span
                                    className="font-semibold"
                                    style={{ color: '#C8965F' }}
                                >
                                    8:00 - 22:00
                                </span>
                                <br />
                                Tất cả các ngày
                            </Text>
                        </Col>
                    </Row>

                    <Row className="flex justify-center">
                        <Col md={18} sm={24} xs={24}>
                            <Title
                                className="mb-8 text-center text-3xl font-bold"
                                level={3}
                                style={{ color: '#3C2415' }}
                            >
                                Gửi tin nhắn cho chúng tôi
                            </Title>
                            <Form
                                className="rounded-xl border p-8"
                                style={{
                                    backgroundColor: '#FAF6F0',
                                    borderColor: '#E5DDD5',
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
                                        className="h-12 rounded-lg border text-base"
                                        placeholder="Tên của bạn"
                                        style={{
                                            borderColor: '#E5DDD5',
                                            backgroundColor: '#F5F1E8',
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
                                        className="h-12 rounded-lg border text-base"
                                        placeholder="Email của bạn"
                                        style={{
                                            borderColor: '#E5DDD5',
                                            backgroundColor: '#F5F1E8',
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
                                        className="rounded-lg border text-base"
                                        placeholder="Tin nhắn của bạn"
                                        rows={6}
                                        style={{
                                            borderColor: '#E5DDD5',
                                            backgroundColor: '#F5F1E8',
                                        }}
                                    />
                                </Form.Item>
                                <Form.Item>
                                    <Button
                                        className="h-12 w-full rounded-lg border-none text-lg font-bold text-white"
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
                        </Col>
                    </Row>
                </div>
            </div>
        </div>
    );
};

export default Contact;
