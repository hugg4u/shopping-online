import { MenuOutlined } from '@ant-design/icons';
import { Button, Dropdown, MenuProps, Skeleton } from 'antd';

import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { getImageUrl } from 'common/utils/getImageUrl';
import Avatar from 'common/components/avatar';
import { useUserQueryStore } from 'common/store/useUserStore';
import { useAuth } from '~/hooks/useAuth';
import useLoginModal from '~/hooks/useLoginModal';
import useRegisterModal from '~/hooks/useRegisterModal';
import Search from './search';
import CartIcon from './cart-icon';
import EditProfilePopup from '~/components/my-page/EditProfilePopup';
import ChangePasswordPopup from '~/components/my-page/ChangePasswordPopup';

const Header = () => {
    const auth = useAuth();
    const router = useRouter();
    const { onOpen: openLoginModal } = useLoginModal();
    const { onOpen: openRegisterModal } = useRegisterModal();
    const { user, isFetching } = useUserQueryStore();
    const [isProfilePopupVisible, setIsProfilePopupVisible] = useState(false);
    const [isChangePasswordPopupVisible, setIsChangePasswordPopupVisible] =
        useState(false);

    const logOut = async () => {
        await Cookies.remove('accessTokenClient');
        await router.push('/');
        window.location.reload();
    };

    const items: MenuProps['items'] = [
        {
            key: '1',
            label: (
                <div
                    onClick={() => setIsProfilePopupVisible(true)}
                    role="presentation"
                >
                    Thông tin người dùng
                </div>
            ),
        },
        {
            key: '5',
            label: (
                <div
                    onClick={() => setIsChangePasswordPopupVisible(true)}
                    role="presentation"
                >
                    Đổi mật khẩu
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
        <div className="bg-white shadow-md">
            <div className="container flex h-[80px] w-full items-center justify-between px-6">
                <Link href="/">
                    <div className="flex select-none flex-col items-center gap-0 uppercase transition-transform duration-300 hover:scale-105">
                        <div className="text-lg font-semibold leading-4 text-rose-600">
                            The
                        </div>
                        <div className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-2xl font-bold text-transparent">
                            Perfume
                        </div>
                    </div>
                </Link>
                <div className="mx-8 max-w-md flex-1">
                    <Search />
                </div>
                <div className="flex items-center gap-6">
                    <CartIcon />
                    {auth ? (
                        <div>
                            <Dropdown
                                menu={{ items }}
                                overlayStyle={{
                                    width: 250,
                                }}
                                placement="bottomRight"
                            >
                                <div
                                    className="flex cursor-pointer space-x-3 rounded-full border-2 border-gray-200 px-4 py-2 transition-all duration-300 hover:border-rose-300 hover:shadow-md"
                                    onClick={() => router.push('/my-page')}
                                    role="presentation"
                                >
                                    {isFetching ? (
                                        <Skeleton.Avatar active className="" />
                                    ) : (
                                        <Avatar
                                            height={40}
                                            src={getImageUrl(
                                                user?.data?.image ?? ''
                                            )}
                                            width={40}
                                        />
                                    )}

                                    <MenuOutlined className="text-gray-600" />
                                </div>
                            </Dropdown>
                            {user && (
                                <EditProfilePopup
                                    onClose={() =>
                                        setIsProfilePopupVisible(false)
                                    }
                                    visible={isProfilePopupVisible}
                                />
                            )}
                            {user && (
                                <ChangePasswordPopup
                                    onClose={() =>
                                        setIsChangePasswordPopupVisible(false)
                                    }
                                    visible={isChangePasswordPopupVisible}
                                />
                            )}
                        </div>
                    ) : (
                        <div className="flex space-x-3">
                            <Button
                                className="h-10 px-6 font-medium shadow-md transition-all duration-300 hover:shadow-lg"
                                onClick={openLoginModal}
                                type="primary"
                            >
                                Đăng nhập
                            </Button>
                            <Button
                                className="h-10 border-2 border-gray-300 px-6 font-medium transition-all duration-300 hover:border-rose-300 hover:text-rose-600"
                                onClick={openRegisterModal}
                                type="default"
                            >
                                Đăng ký
                            </Button>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Header;
