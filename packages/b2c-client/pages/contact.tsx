import React from 'react';
import { Button, Col, Form, Input, Row, Typography } from 'antd';
import {
    EnvironmentOutlined,
    MailOutlined,
    PhoneOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const Contact = () => {
    return (
        <div
            className="min-h-screen py-16"
            style={{ backgroundColor: '#dde8dc' }}
        >
            <div className="mx-auto max-w-[1200px] px-4">
                <div
                    className="rounded-2xl p-12 shadow-sm"
                    style={{
                        backgroundColor: '#dde8dc',
                        border: '1px solid #365842',
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

                    <Row className="mb-20" gutter={[32, 32]} justify="center">
                        <Col
                            className="rounded-xl p-8 text-center transition-all duration-300 hover:shadow-md"
                            lg={7}
                            md={8}
                            sm={12}
                            style={{
                                backgroundColor: '#dde8dc',
                                minHeight: '280px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            xs={24}
                        >
                            <div
                                className="flex h-20 w-20 items-center justify-center rounded-full"
                                style={{ backgroundColor: '#F5E6D3' }}
                            >
                                <PhoneOutlined
                                    className="text-4xl"
                                    style={{ color: '#C8965F' }}
                                />
                            </div>
                            <Title
                                className="mb-4 mt-6"
                                level={4}
                                style={{ color: '#3C2415' }}
                            >
                                Hotline
                            </Title>
                            <Text style={{ color: '#6B5B4F', lineHeight: 1.8 }}>
                                Gọi đến hotline chăm sóc khách hàng
                                <br />
                                <span
                                    className="text-lg font-semibold"
                                    style={{ color: '#C8965F' }}
                                >
                                    0912166969
                                </span>
                                <br />
                                Phục vụ 24/7
                            </Text>
                        </Col>

                        <Col
                            className="rounded-xl p-8 text-center transition-all duration-300 hover:shadow-md"
                            lg={7}
                            md={8}
                            sm={12}
                            style={{
                                backgroundColor: '#dde8dc',
                                minHeight: '280px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            xs={24}
                        >
                            <div
                                className="flex h-20 w-20 items-center justify-center rounded-full"
                                style={{ backgroundColor: '#F5E6D3' }}
                            >
                                <MailOutlined
                                    className="text-4xl"
                                    style={{ color: '#C8965F' }}
                                />
                            </div>
                            <Title
                                className="mb-4 mt-6"
                                level={4}
                                style={{ color: '#3C2415' }}
                            >
                                Email
                            </Title>
                            <Text style={{ color: '#6B5B4F', lineHeight: 1.8 }}>
                                Gửi email đến
                                <br />
                                <a
                                    className="text-lg font-semibold"
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
                            lg={7}
                            md={8}
                            sm={12}
                            style={{
                                backgroundColor: '#dde8dc',
                                minHeight: '280px',
                                display: 'flex',
                                flexDirection: 'column',
                                alignItems: 'center',
                                justifyContent: 'center',
                            }}
                            xs={24}
                        >
                            <div
                                className="flex h-20 w-20 items-center justify-center rounded-full"
                                style={{ backgroundColor: '#F5E6D3' }}
                            >
                                <EnvironmentOutlined
                                    className="text-4xl"
                                    style={{ color: '#C8965F' }}
                                />
                            </div>
                            <Title
                                className="mb-4 mt-6"
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
                                        className="h-12 rounded-lg border text-base"
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
                                        className="h-12 rounded-lg border text-base"
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
                                        className="rounded-lg border text-base"
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
