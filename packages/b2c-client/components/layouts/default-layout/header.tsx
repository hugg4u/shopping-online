import { MenuOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, Skeleton } from 'antd';
import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { getImageUrl } from 'common/utils/getImageUrl';
import { useAuth } from '~/hooks/useAuth';
import useLoginModal from '~/hooks/useLoginModal';
import useRegisterModal from '~/hooks/useRegisterModal';
import Search from './search';
import CartIcon from './cart-icon';
import Avatar from './avatar';
import { useUserQueryStore } from '~/hooks/useUserStore';
import ChangePasswordPopup from '~/components/my-page/ChangePasswordPopup';
import EditProfilePopup from '~/components/my-page/EditProfilePopup';

const Header = () => {
    const auth = useAuth();
    const router = useRouter();
    const { onOpen: openLoginModal } = useLoginModal();
    const { onOpen: openRegisterModal } = useRegisterModal();
    const { user, isFetching } = useUserQueryStore();
    const [isChangePasswordVisible, setChangePasswordVisible] = useState(false);
    const [isProfileModalVisible, setProfileModalVisible] = useState(false);

    const logOut = () => {
        Cookies.remove('accessTokenClient');
        setTimeout(() => {
            router.reload();
        }, 200);
    };

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <div
                    onClick={() => router.push('/my-page')}
                    role="presentation"
                >
                    Thông tin
                </div>
            ),
        },
        {
            key: 'myOrder',
            label: (
                <div
                    onClick={() => router.push('/my-page/my-order')}
                    role="presentation"
                >
                    Đơn mua
                </div>
            ),
        },
        {
            key: 'changePassword',
            label: (
                <div
                    onClick={() => setChangePasswordVisible(true)}
                    role="presentation"
                >
                    Đổi mật khẩu
                </div>
            ),
        },
        {
            key: 'profile',
            label: (
                <div
                    onClick={() => setProfileModalVisible(true)}
                    role="presentation"
                >
                    Hồ sơ
                </div>
            ),
        },
        {
            key: '4',
            label: (
                <div
                    className="text-rose-500"
                    onClick={logOut}
                    role="presentation"
                >
                    Đăng xuất
                </div>
            ),
        },
    ];

    return (
        <div>
            <div className="container flex h-[76px] w-full items-center justify-between">
                <Link href="/">
                    <div className="flex select-none flex-col items-center gap-0 uppercase">
                        <div className="text-lg leading-4 text-rose-600">
                            The
                        </div>
                        <div className="text-2xl font-bold">Perfume</div>
                    </div>
                </Link>
                <div>
                    <Search />
                </div>
                <div className="flex items-center gap-8">
                    <CartIcon />
                    {auth ? (
                        <div>
                            <Dropdown
                                menu={{ items }}
                                overlayStyle={{ width: 250 }}
                                placement="bottomRight"
                            >
                                <div className="flex cursor-pointer space-x-4 rounded-full border px-3 py-2">
                                    {isFetching ? (
                                        <Skeleton.Avatar active />
                                    ) : (
                                        <Avatar
                                            height={40}
                                            src={getImageUrl(
                                                user?.data?.image ?? ''
                                            )}
                                            width={40}
                                        />
                                    )}
                                    <MenuOutlined />
                                </div>
                            </Dropdown>
                        </div>
                    ) : (
                        <div className="flex space-x-3">
                            <Button onClick={openLoginModal} type="primary">
                                Đăng nhập
                            </Button>
                            <Button onClick={openRegisterModal} type="default">
                                Đăng ký
                            </Button>
                        </div>
                    )}
                </div>
            </div>
            <ChangePasswordPopup
                onClose={() => setChangePasswordVisible(false)}
                visible={isChangePasswordVisible}
            />
            <EditProfilePopup
                avatarUrl={getImageUrl(user?.data?.image || '')}
                initialValues={{
                    name: user?.data?.name || '',
                    email: user?.data?.email || '',
                    phone: user?.data?.phone || '',
                    gender: user?.data?.gender || '',
                    dob: user?.data?.dob || null,
                    address: user?.data?.address || '',
                }}
                onClose={() => setProfileModalVisible(false)}
                visible={isProfileModalVisible}
            />
        </div>
    );
};

export default Header;
