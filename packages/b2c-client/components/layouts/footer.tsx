import {
    EnvironmentOutlined,
    FacebookOutlined,
    MailOutlined,
    PhoneOutlined,
} from '@ant-design/icons';
import { Col, Layout, Row, Space, Typography } from 'antd';
import Image from 'next/image';

const { Footer: LayoutFooter } = Layout;
const { Title, Text, Link } = Typography;

const Footer = () => {
    return (
        <LayoutFooter
            className="relative w-full py-16"
            style={{
                background: 'linear-gradient(135deg, #365842 0%, #2a4434 100%)',
            }}
        >
            {/* Tea leaf pattern background */}
            {/* <div className="absolute inset-0 opacity-5">
                <div
                    className="absolute inset-0"
                    style={{
                        backgroundImage:
                            "url(\"data:image/svg+xml,%3Csvg width='60' height='60' viewBox='0 0 60 60' xmlns='http://www.w3.org/2000/svg'%3E%3Cg fill='%23C8965F' fill-opacity='0.3'%3E%3Cpath d='M30 30c0-8.3-6.7-15-15-15s-15 6.7-15 15 6.7 15 15 15 15-6.7 15-15zm15 0c0-8.3-6.7-15-15-15s-15 6.7-15 15 6.7 15 15 15 15-6.7 15-15z'/%3E%3C/g%3E%3C/svg%3E\")",
                        backgroundSize: '60px 60px',
                    }}
                />
            </div> */}

            <div className="relative z-10 mx-auto max-w-[1200px] px-4">
                <Row gutter={[32, 32]}>
                    {/* Logo và Giới thiệu */}
                    <Col md={8} sm={12} xs={24}>
                        <div className="mb-6 flex items-center gap-3">
                            <div className="relative h-16 w-16">
                                <Image
                                    alt="logo"
                                    fill
                                    priority
                                    sizes="(max-width: 200px) 200vw"
                                    src="/images/logo.png"
                                    style={{
                                        objectFit: 'contain',
                                        borderRadius: '50%',
                                    }}
                                />
                            </div>
                            <div className="flex flex-col justify-end">
                                <div
                                    className="text-xl font-bold"
                                    style={{
                                        color: '#D4A574',
                                    }}
                                >
                                    Soma Tea
                                </div>
                                <div style={{ color: '#C8965F' }}>
                                    Trà Thượng Hạng
                                </div>
                            </div>
                        </div>
                        <Text style={{ color: '#B8A082', lineHeight: '1.6' }}>
                            Soma Tea tự hào mang đến những sản phẩm trà cao cấp
                            với hương vị đậm đà, thuần khiết từ những vùng đất
                            trồng trà nổi tiếng nhất Việt Nam.
                        </Text>
                    </Col>

                    {/* Liên kết nhanh */}
                    <Col md={5} sm={12} xs={24} />

                    {/* Chính sách */}
                    <Col md={5} sm={12} xs={24} />

                    {/* Thông tin liên hệ */}
                    <Col md={6} xs={24}>
                        <Title
                            className="mb-6"
                            level={4}
                            style={{ color: '#D4A574' }}
                        >
                            Liên Hệ
                        </Title>
                        <div className="space-y-4">
                            <div className="flex items-center gap-3">
                                <EnvironmentOutlined
                                    style={{
                                        color: '#C8965F',
                                        fontSize: '16px',
                                    }}
                                />
                                <Text style={{ color: '#B8A082' }}>
                                    Chung cư Phenika, Thạch Hòa, Thạch Thất, TP.
                                    Hà Nội
                                </Text>
                            </div>
                            <div className="flex items-center gap-3">
                                <PhoneOutlined
                                    style={{
                                        color: '#C8965F',
                                        fontSize: '16px',
                                    }}
                                />
                                <Text style={{ color: '#B8A082' }}>
                                    0912166969
                                </Text>
                            </div>
                            <div className="flex items-center gap-3">
                                <MailOutlined
                                    style={{
                                        color: '#C8965F',
                                        fontSize: '16px',
                                    }}
                                />
                                <Text style={{ color: '#B8A082' }}>
                                    info@somatea.vn
                                </Text>
                            </div>
                        </div>

                        {/* Social Media */}
                        <div className="mt-6">
                            <Title
                                className="mb-4"
                                level={5}
                                style={{ color: '#D4A574' }}
                            >
                                Theo Dõi
                            </Title>
                            <Space size="large">
                                <Link
                                    href="https://www.facebook.com/people/Soma-Teas/61577044074416/"
                                    target="_blank"
                                >
                                    <div
                                        className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
                                        style={{ backgroundColor: '#C8965F' }}
                                    >
                                        <FacebookOutlined
                                            style={{
                                                color: '#3C2415',
                                                fontSize: '18px',
                                            }}
                                        />
                                    </div>
                                </Link>
                                <Link
                                    href="https://zalo.me/0912166969"
                                    target="_blank"
                                >
                                    <div
                                        className="flex h-10 w-10 items-center justify-center rounded-full transition-all duration-300 hover:scale-110"
                                        style={{ backgroundColor: '#C8965F' }}
                                    >
                                        <Image
                                            alt="logo"
                                            height={20}
                                            src="/images/zalo-icon.png"
                                            width={20}
                                        />
                                    </div>
                                </Link>
                            </Space>
                        </div>
                    </Col>
                </Row>

                {/* Copyright */}
                <div
                    className="mt-12 border-t pt-8"
                    style={{ borderTopColor: 'rgba(212, 165, 116, 0.3)' }}
                >
                    <Row justify="center">
                        <Text
                            className="text-center"
                            style={{ color: '#B8A082' }}
                        >
                            © 2025 Soma Tea. Mọi quyền được bảo lưu.
                            <br />
                            <span style={{ color: '#D4A574' }}>
                                Thiết kế bởi Soma Team
                            </span>
                        </Text>
                    </Row>
                </div>
            </div>
        </LayoutFooter>
    );
};

export default Footer;
