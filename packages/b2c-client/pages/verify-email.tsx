import { useMutation } from '@tanstack/react-query';
import { Button, Result, Spin } from 'antd';
import * as request from 'common/utils/http-request';
import { useRouter } from 'next/router';
import { useEffect } from 'react';

export default function Home() {
    const router = useRouter();
    const { id, token } = router.query;

    const {
        mutate: checkVerify,
        isPending: checkVerifyIsPending,
        isError,
        isSuccess,
    } = useMutation({
        mutationFn: async (data: { id: string; token: string }) => {
            return request
                .post('/auth/check-verify', data)
                .then((res) => res.data);
        },
    });

    useEffect(() => {
        if (typeof id === 'string' && typeof token === 'string') {
            checkVerify({
                id,
                token,
            });
        }
    }, [id, token, checkVerify]);

    const handleClick = () => {
        router.push('/');
    };

    return (
        <div
            className="flex h-dvh w-full items-center justify-center"
            style={{ backgroundColor: '#FAF6F0' }}
        >
            <div
                className="max-w-md rounded-xl border p-6 text-center shadow-sm"
                style={{
                    backgroundColor: '#F5F1E8',
                    borderColor: '#E5DDD5',
                }}
            >
                {checkVerifyIsPending && (
                    <div>
                        <Spin size="large" />
                        <p className="mt-4" style={{ color: '#6B5B4F' }}>
                            Chúng tôi đang xác minh email của bạn, vui lòng
                            đợi...
                        </p>
                    </div>
                )}
                {!checkVerifyIsPending && isError && (
                    <Result
                        extra={[
                            <Button
                                key="back"
                                onClick={handleClick}
                                style={{
                                    backgroundColor: '#C8965F',
                                    borderColor: '#C8965F',
                                }}
                                type="primary"
                            >
                                Về trang chủ
                            </Button>,
                        ]}
                        status="error"
                        subTitle={
                            <span style={{ color: '#6B5B4F' }}>
                                Chúng tôi không thể xác minh email của bạn. Vui
                                lòng thử lại sau hoặc liên hệ hỗ trợ.
                            </span>
                        }
                        title={
                            <span style={{ color: '#3C2415' }}>
                                Xác minh thất bại
                            </span>
                        }
                    />
                )}
                {!checkVerifyIsPending && isSuccess && (
                    <Result
                        extra={[
                            <Button
                                key="back"
                                onClick={handleClick}
                                style={{
                                    backgroundColor: '#C8965F',
                                    borderColor: '#C8965F',
                                }}
                                type="primary"
                            >
                                Về trang chủ
                            </Button>,
                        ]}
                        status="success"
                        subTitle={
                            <span style={{ color: '#6B5B4F' }}>
                                Email của bạn đã được xác minh thành công. Cảm
                                ơn bạn đã mua sắm với chúng tôi!
                            </span>
                        }
                        title={
                            <span style={{ color: '#3C2415' }}>
                                Xác minh email thành công
                            </span>
                        }
                    />
                )}
            </div>
        </div>
    );
}
