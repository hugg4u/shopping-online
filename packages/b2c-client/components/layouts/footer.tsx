import React from 'react';
import { Col, Layout, Row, Space, Typography } from 'antd';
import {
    FacebookOutlined,
    InstagramOutlined,
    TwitterOutlined,
} from '@ant-design/icons';

const { Footer: LayoutFooter } = Layout;
const { Title, Text, Link } = Typography;

const Footer = () => {
    return (
        <LayoutFooter className="relative w-full bg-gray-100 py-10 before:absolute before:-top-5 before:left-1/2 before:h-5 before:w-[100px] before:-translate-x-1/2 before:rounded-t-[50%] before:bg-white before:content-['']">
            <div className="mx-auto max-w-[1200px] px-4">
                <Row gutter={[32, 32]}>
                    <Col md={8} sm={12} xs={24}>
                        <Title className="mb-5 text-gray-800" level={4}>
                            Liên Hệ
                        </Title>
                        <Text className="text-gray-600">
                            123 Đường Nước Hoa, Thành phố Hương, PC 12345
                        </Text>
                        <br />
                        <Text className="text-gray-600">
                            Điện thoại: (123) 456-7890
                        </Text>
                        <br />
                        <Text className="text-gray-600">
                            Email: perfumeshop1830@gmail.com
                        </Text>
                    </Col>
                    <Col md={8} sm={12} xs={24}>
                        <Title className="mb-5 text-gray-800" level={4}>
                            Theo Dõi Chúng Tôi
                        </Title>
                        <Space size="middle">
                            <Link href="https://facebook.com" target="_blank">
                                <FacebookOutlined className="text-2xl text-gray-600" />
                            </Link>
                            <Link href="https://instagram.com" target="_blank">
                                <InstagramOutlined className="text-2xl text-gray-600" />
                            </Link>
                            <Link href="https://twitter.com" target="_blank">
                                <TwitterOutlined className="text-2xl text-gray-600" />
                            </Link>
                        </Space>
                    </Col>
                    <Col md={8} sm={12} xs={24}>
                        <Title className="mb-5 text-gray-800" level={4}>
                            Liên Kết Hữu Ích
                        </Title>
                        <ul className="list-none pl-0">
                            <li>
                                <Link
                                    className="text-blue-500 no-underline"
                                    href="/about"
                                >
                                    Về Chúng Tôi
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="text-blue-500 no-underline"
                                    href="/contact"
                                >
                                    Liên Hệ
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="text-blue-500 no-underline"
                                    href="/privacy-policy"
                                >
                                    Chính Sách Bảo Mật
                                </Link>
                            </li>
                            <li>
                                <Link
                                    className="text-blue-500 no-underline"
                                    href="/terms-of-service"
                                >
                                    Điều Khoản Dịch Vụ
                                </Link>
                            </li>
                        </ul>
                    </Col>
                </Row>
                <Row justify="center" style={{ marginTop: '20px' }}>
                    <Text className="text-gray-600">
                        © 2024 Cửa Hàng Nước Hoa. Mọi quyền được bảo lưu.
                    </Text>
                </Row>
            </div>
        </LayoutFooter>
    );
};

export default Footer;
