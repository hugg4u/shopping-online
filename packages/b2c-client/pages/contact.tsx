import React from 'react';
import { Button, Col, Form, Input, Layout, Row, Typography } from 'antd';
import {
    EnvironmentOutlined,
    MailOutlined,
    PhoneOutlined,
} from '@ant-design/icons';

const { Title, Text } = Typography;

const Contact = () => {
    return (
        <Layout.Content className="mx-auto max-w-[1200px] rounded-2xl bg-gradient-to-br from-white to-gray-50 p-12 shadow-xl">
            <Title className="mb-12 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-center text-5xl font-bold text-transparent">
                Liên hệ với chúng tôi
            </Title>

            <Row className="mb-20" gutter={[32, 32]}>
                <Col
                    className="group rounded-2xl bg-white p-8 text-center shadow-lg transition-all duration-500 ease-in-out hover:-translate-y-3 hover:shadow-2xl"
                    md={8}
                    sm={12}
                    xs={24}
                >
                    <PhoneOutlined className="mb-6 text-6xl text-blue-500 transition-transform duration-300 group-hover:scale-110" />
                    <Title className="mb-3 text-xl text-gray-800" level={4}>
                        Hotline
                    </Title>
                    <Text className="text-base leading-relaxed text-gray-600">
                        Gọi đến hotline chăm sóc khách hàng của chúng tôi tại
                        <span className="font-semibold text-blue-600">
                            {' '}
                            (123) 456-7890{' '}
                        </span>
                        (9h sáng – 9h tối) 7 ngày trong tuần nếu bạn cần bất kỳ
                        thông tin hoặc hỗ trợ nào từ The Perfume.
                    </Text>
                </Col>
                <Col
                    className="group rounded-2xl bg-white p-8 text-center shadow-lg transition-all duration-500 ease-in-out hover:-translate-y-3 hover:shadow-2xl"
                    md={8}
                    sm={12}
                    xs={24}
                >
                    <MailOutlined className="mb-6 text-6xl text-green-500 transition-transform duration-300 group-hover:scale-110" />
                    <Title className="mb-3 text-xl text-gray-800" level={4}>
                        Email
                    </Title>
                    <Text className="text-base leading-relaxed text-gray-600">
                        Gửi email đến{' '}
                        <a
                            className="font-semibold text-green-600 transition-colors duration-300 hover:text-green-700"
                            href="mailto:perfumeshop1830@gmail.com"
                        >
                            perfumeshop1830@gmail.com
                        </a>{' '}
                        để nhận được hỗ trợ từ The Perfume (phản hồi trong vòng
                        24 giờ).
                    </Text>
                </Col>
                <Col
                    className="group rounded-2xl bg-white p-8 text-center shadow-lg transition-all duration-500 ease-in-out hover:-translate-y-3 hover:shadow-2xl"
                    md={8}
                    sm={12}
                    xs={24}
                >
                    <EnvironmentOutlined className="mb-6 text-6xl text-rose-500 transition-transform duration-300 group-hover:scale-110" />
                    <Title className="mb-3 text-xl text-gray-800" level={4}>
                        Địa chỉ cửa hàng
                    </Title>
                    <Text className="text-base leading-relaxed text-gray-600">
                        <div className="space-y-2">
                            <div>
                                <strong>Showroom 1:</strong> 123 Đường Lê Lợi,
                                Quận 1, TP. Hồ Chí Minh
                            </div>
                            <div>
                                <strong>Showroom 2:</strong> 456 Đường Trần Hưng
                                Đạo, Quận 5, TP. Hồ Chí Minh
                            </div>
                            <div>
                                <strong>Showroom 3:</strong> 789 Đường Nguyễn
                                Văn Linh, Quận 7, TP. Hồ Chí Minh
                            </div>
                        </div>
                    </Text>
                </Col>
            </Row>

            <Row className="flex justify-center">
                <Col md={18} sm={24} xs={24}>
                    <Title
                        className="mb-8 bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-center text-4xl font-bold text-transparent"
                        level={3}
                    >
                        Gửi tin nhắn cho chúng tôi
                    </Title>
                    <Form className="rounded-2xl border border-gray-100 bg-white p-12 shadow-2xl">
                        <Form.Item
                            name="name"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tên của bạn!',
                                },
                            ]}
                        >
                            <Input
                                className="h-12 rounded-lg border-2 border-gray-200 text-base transition-all duration-300 hover:border-rose-300 focus:border-rose-500 focus:shadow-lg"
                                placeholder="Tên của bạn"
                            />
                        </Form.Item>
                        <Form.Item
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập email của bạn!',
                                },
                            ]}
                        >
                            <Input
                                className="h-12 rounded-lg border-2 border-gray-200 text-base transition-all duration-300 hover:border-rose-300 focus:border-rose-500 focus:shadow-lg"
                                placeholder="Email của bạn"
                            />
                        </Form.Item>
                        <Form.Item
                            name="message"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập tin nhắn của bạn!',
                                },
                            ]}
                        >
                            <Input.TextArea
                                className="rounded-lg border-2 border-gray-200 text-base transition-all duration-300 hover:border-rose-300 focus:border-rose-500 focus:shadow-lg"
                                placeholder="Tin nhắn của bạn"
                                rows={6}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                className="h-12 w-full rounded-lg border-none bg-gradient-to-r from-rose-500 to-pink-500 text-lg font-bold shadow-lg transition-all duration-300 hover:scale-105 hover:from-rose-600 hover:to-pink-600 hover:shadow-xl"
                                htmlType="submit"
                                type="primary"
                            >
                                Gửi tin nhắn
                            </Button>
                        </Form.Item>
                    </Form>
                </Col>
            </Row>
        </Layout.Content>
    );
};

export default Contact;
