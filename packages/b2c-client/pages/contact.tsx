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
        <Layout.Content className="mx-auto max-w-[1200px] rounded-lg bg-gray-50 p-10">
            <Title className="mb-10 text-center text-4xl font-bold text-gray-800">
                Liên hệ với chúng tôi
            </Title>

            <Row className="mb-15" gutter={[24, 24]}>
                <Col
                    className="rounded-lg bg-white p-7 text-center shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl"
                    md={8}
                    sm={12}
                    xs={24}
                >
                    <PhoneOutlined className="mb-5 text-5xl text-blue-500" />
                    <Title className="mb-2 text-xl text-gray-800" level={4}>
                        Hotline
                    </Title>
                    <Text className="text-base text-gray-600">
                        Gọi đến hotline chăm sóc khách hàng của chúng tôi tại
                        (123) 456-7890 (9h sáng – 9h tối) 7 ngày trong tuần nếu
                        bạn cần bất kỳ thông tin hoặc hỗ trợ nào từ The Perfume.
                    </Text>
                </Col>
                <Col
                    className="rounded-lg bg-white p-7 text-center shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl"
                    md={8}
                    sm={12}
                    xs={24}
                >
                    <MailOutlined className="mb-5 text-5xl text-blue-500" />
                    <Title className="mb-2 text-xl text-gray-800" level={4}>
                        Email
                    </Title>
                    <Text className="text-base text-gray-600">
                        Gửi email đến{' '}
                        <a href="mailto:perfumeshop1830@gmail.com">
                            perfumeshop1830@gmail.com
                        </a>{' '}
                        để nhận được hỗ trợ từ The Perfume (phản hồi trong vòng
                        24 giờ).
                    </Text>
                </Col>
                <Col
                    className="rounded-lg bg-white p-7 text-center shadow-lg transition-transform duration-300 ease-in-out hover:-translate-y-2 hover:shadow-xl"
                    md={8}
                    sm={12}
                    xs={24}
                >
                    <EnvironmentOutlined className="mb-5 text-5xl text-blue-500" />
                    <Title className="mb-2 text-xl text-gray-800" level={4}>
                        Địa chỉ cửa hàng
                    </Title>
                    <Text className="text-base text-gray-600">
                        Showroom 1: 123 Đường Lê Lợi, Quận 1, TP. Hồ Chí Minh
                        <br />
                        Showroom 2: 456 Đường Trần Hưng Đạo, Quận 5, TP. Hồ Chí
                        Minh
                        <br />
                        Showroom 3: 789 Đường Nguyễn Văn Linh, Quận 7, TP. Hồ
                        Chí Minh
                    </Text>
                </Col>
            </Row>

            <Row className="flex justify-center">
                <Col md={16} sm={24} xs={24}>
                    <Title
                        className="mb-5 text-center text-3xl text-gray-800"
                        level={3}
                    >
                        Gửi tin nhắn cho chúng tôi
                    </Title>
                    <Form className="rounded-lg bg-white p-10 shadow-lg">
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
                                className="rounded border border-gray-300 transition-colors duration-300 hover:border-blue-500 focus:border-blue-500"
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
                                className="rounded border border-gray-300 transition-colors duration-300 hover:border-blue-500 focus:border-blue-500"
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
                                className="rounded border border-gray-300 transition-colors duration-300 hover:border-blue-500 focus:border-blue-500"
                                placeholder="Tin nhắn của bạn"
                                rows={4}
                            />
                        </Form.Item>
                        <Form.Item>
                            <Button
                                className="h-10 w-full rounded border-blue-500 bg-blue-500 text-base font-bold"
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
