import { useMutation } from '@tanstack/react-query';
import { Alert, Button, Form, Input, Select, Spin, Typography } from 'antd';
import { AxiosError, AxiosResponse } from 'axios';
import Modal from '@shopping/common/components/modal';
import * as request from '@shopping/common/utils/http-request';
import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import useLoginModal from '~/hooks/useLoginModal';
import useRegisterModal from '~/hooks/useRegisterModal';

const genderOptions = {
    MALE: 'Male',
    FEMALE: 'Female',
};

const RegisterModal = () => {
    const [emailUser, setEmailUser] = useState('');
    const [form] = Form.useForm();
    const { isOpen, onClose } = useRegisterModal();
    const { onOpen } = useLoginModal();
    const [loading, setLoading] = useState(false);
    const [secondsToGo, setSecondsToGo] = useState(0);
    const { Paragraph, Text } = Typography;

    const toggle = useCallback(() => {
        onClose();
        onOpen();
    }, [onClose, onOpen]);

    useEffect(() => {
        const timer = setInterval(() => {
            if (secondsToGo > 0) {
                setSecondsToGo(secondsToGo - 1);
            }
            if (secondsToGo === 0) {
                clearInterval(timer);
            }
        }, 1000);
        return () => {
            clearInterval(timer);
        };
    });

    const { mutate: verifyEmail, isPending: verifyEmailIsPending } =
        useMutation({
            mutationFn: async (email: string) => {
                return request.post(`/auth/verify-email/${email}`);
            },
            onSuccess: (res) => {
                toast.success(res.data.message);
            },
            onError: (
                error: AxiosError<AxiosResponse<{ message: string }>>
            ) => {
                toast.error(
                    (error.response?.data as unknown as { message: string })
                        .message
                );
            },
        });

    const {
        mutate: registerUser,
        isPending: registerUserIsPending,
        isSuccess: registerUserIsSuccess,
    } = useMutation({
        mutationFn: async (data: {
            email: string;
            password: string;
            name: string;
            phone: string;
            address: string;
            gender: string;
        }) => {
            return request
                .post('/auth/user/register', data)
                .then((res) => res.data);
        },
        onError: (
            error: AxiosError<{
                message: string;
                errors?: { message: string };
            }>
        ) => {
            const errorMessage =
                error.response?.data.errors?.message ||
                error.response?.data.message ||
                'An unknown error occurred';

            toast.error(errorMessage);
        },
        onSuccess: (res: AxiosResponse) => {
            toast.success(res.data.message);
            setEmailUser(res.data.data.email);
            verifyEmail(res.data.data.email);
        },
    });

    const onFinish = (values: {
        email: string;
        password: string;
        name: string;
        gender: string;
        phone: string;
        address: string;
    }) => {
        setLoading(true);
        registerUser(values);
        setLoading(false);
    };

    const onSubmit = () => {
        form.submit();
    };

    const handleResendEmail = () => {
        verifyEmail(emailUser);
        setSecondsToGo(60);
    };

    const bodyContent = (
        <div className="flex flex-col gap-4">
            <div className="text-center">
                <div
                    className="text-2xl font-bold"
                    style={{ color: '#3C2415' }}
                >
                    Tạo tài khoản!
                </div>
                <div className="mt-2 font-light" style={{ color: '#6B5B4F' }}>
                    Chào mừng bạn đến với Soma Tea
                </div>
            </div>
            <Form
                className="customScroll max-h-[40vh] overflow-auto px-8"
                disabled={
                    loading || registerUserIsPending || verifyEmailIsPending
                }
                form={form}
                layout="vertical"
                onFinish={onFinish}
            >
                <Form.Item
                    label={<span style={{ color: '#3C2415' }}>Email</span>}
                    name="email"
                    rules={[
                        {
                            required: true,
                            message: 'Hãy nhập email của bạn',
                        },
                        {
                            type: 'email',
                            message: 'Email không hợp lệ',
                        },
                    ]}
                >
                    <Input
                        size="large"
                        style={{
                            borderColor: '#E5DDD5',
                            backgroundColor: '#FAF6F0',
                        }}
                    />
                </Form.Item>
                <Form.Item
                    hasFeedback
                    label={<span style={{ color: '#3C2415' }}>Mật khẩu</span>}
                    name="password"
                    rules={[
                        {
                            required: true,
                            message: 'Hãy nhập mật khẩu của bạn',
                        },
                        {
                            min: 8,
                            message: 'Mật khẩu phải ít nhất 8 kí tự',
                        },
                    ]}
                >
                    <Input.Password
                        size="large"
                        style={{
                            borderColor: '#E5DDD5',
                            backgroundColor: '#FAF6F0',
                        }}
                    />
                </Form.Item>
                <Form.Item
                    dependencies={['password']}
                    hasFeedback
                    label={
                        <span style={{ color: '#3C2415' }}>
                            Xác nhận mật khẩu
                        </span>
                    }
                    name="confirmPassword"
                    rules={[
                        {
                            required: true,
                            message: 'Hãy xác nhận mật khẩu của bạn',
                        },

                        ({ getFieldValue }) => ({
                            validator(_, value) {
                                if (
                                    !value ||
                                    getFieldValue('password') === value
                                ) {
                                    return Promise.resolve();
                                }
                                return Promise.reject(
                                    new Error(
                                        'Mật khẩu xác nhận không trùng khớp'
                                    )
                                );
                            },
                        }),
                    ]}
                >
                    <Input.Password
                        size="large"
                        style={{
                            borderColor: '#E5DDD5',
                            backgroundColor: '#FAF6F0',
                        }}
                    />
                </Form.Item>
                <Form.Item
                    label={<span style={{ color: '#3C2415' }}>Tên</span>}
                    name="name"
                    rules={[
                        {
                            required: true,
                            message: 'Hãy nhập tên của bạn',
                        },
                    ]}
                >
                    <Input
                        size="large"
                        style={{
                            borderColor: '#E5DDD5',
                            backgroundColor: '#FAF6F0',
                        }}
                    />
                </Form.Item>
                <Form.Item
                    label={
                        <span style={{ color: '#3C2415' }}>Số điện thoại</span>
                    }
                    name="phone"
                    rules={[
                        {
                            required: true,
                            message: 'Hãy nhập số điện thoại của bạn',
                        },
                        {
                            pattern:
                                /(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})\b/,
                            message: 'Số điện thoại không hợp lệ',
                        },
                    ]}
                >
                    <Input
                        size="large"
                        style={{
                            borderColor: '#E5DDD5',
                            backgroundColor: '#FAF6F0',
                        }}
                    />
                </Form.Item>

                <Form.Item
                    label={<span style={{ color: '#3C2415' }}>Giới tính</span>}
                    name="gender"
                >
                    <Select
                        size="large"
                        style={{
                            borderColor: '#E5DDD5',
                        }}
                    >
                        {Object.values(genderOptions).map((item: string) => (
                            <Select.Option
                                key={Object.values(genderOptions).indexOf(item)}
                                value={
                                    Object.keys(genderOptions)[
                                        Object.values(genderOptions).indexOf(
                                            item
                                        )
                                    ]
                                }
                            >
                                {item}
                            </Select.Option>
                        ))}
                    </Select>
                </Form.Item>

                <Form.Item
                    label={<span style={{ color: '#3C2415' }}>Địa chỉ</span>}
                    name="address"
                >
                    <Input
                        size="large"
                        style={{
                            borderColor: '#E5DDD5',
                            backgroundColor: '#FAF6F0',
                        }}
                    />
                </Form.Item>

                <Form.Item hidden>
                    <Button htmlType="submit" />
                </Form.Item>
            </Form>
            {registerUserIsSuccess && secondsToGo === 0 && (
                <Alert
                    description={
                        <>
                            <span>
                                <button
                                    className="focus:shadow-outline rounded font-bold focus:outline-none"
                                    onClick={handleResendEmail}
                                    style={{
                                        color: '#C8965F',
                                    }}
                                    type="button"
                                >
                                    Ấn vào đây
                                </button>
                            </span>
                            <span className="mx-2">
                                nếu bạn chưa nhận được email xác nhận.
                            </span>
                        </>
                    }
                    message={`Chúng tôi đã gửi đến ${emailUser} email xác nhận để kích hoạt tài khoản.`}
                    style={{
                        backgroundColor: '#FAF6F0',
                        borderColor: '#C8965F',
                    }}
                    type="info"
                />
            )}

            {secondsToGo > 0 && (
                <Paragraph className="flex space-x-2">
                    <Spin />
                    <div className="flex space-x-1">
                        <span style={{ color: '#6B5B4F' }}>
                            Gửi email xác thực sau
                        </span>
                        <Text style={{ color: '#C8965F' }}>
                            {Math.floor(secondsToGo / 60)}
                        </Text>
                        <span style={{ color: '#6B5B4F' }}>phút</span>
                        <Text style={{ color: '#C8965F' }}>
                            {secondsToGo % 60}
                        </Text>
                        <span style={{ color: '#6B5B4F' }}>giây</span>
                    </div>
                </Paragraph>
            )}
        </div>
    );

    const footerContent = (
        <div className="mt-3 flex flex-col gap-4">
            <hr style={{ borderColor: '#E5DDD5' }} />
            <div
                className="mt-4 text-center font-light"
                style={{ color: '#6B5B4F' }}
            >
                <div className="flex items-center justify-center gap-2">
                    <div>Bạn đã có tài khoản?</div>
                    <div
                        className="cursor-pointer hover:underline"
                        onClick={toggle}
                        role="presentation"
                        style={{ color: '#C8965F' }}
                    >
                        Đăng nhập
                    </div>
                </div>
            </div>
        </div>
    );

    return (
        <Modal
            actionLabel="Đăng ký"
            body={bodyContent}
            disabled={loading || verifyEmailIsPending || registerUserIsPending}
            footer={footerContent}
            isOpen={isOpen}
            onClose={onClose}
            onSubmit={onSubmit}
            title="Đăng ký"
        />
    );
};

export default RegisterModal;
