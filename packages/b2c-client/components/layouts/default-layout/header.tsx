import { LoginOutlined, MenuOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps, Skeleton, Tooltip } from 'antd';

import { useRouter } from 'next/router';
import React, { useState } from 'react';
import Cookies from 'js-cookie';
import Link from 'next/link';
import { getImageUrl } from 'common/utils/getImageUrl';
import Avatar from 'common/components/avatar';
import { useUserQueryStore } from 'common/store/useUserStore';
import { useAuth } from '~/hooks/useAuth';
import useLoginModal from '~/hooks/useLoginModal';
// import useRegisterModal from '~/hooks/useRegisterModal';
import Search from './search';
import CartIcon from './cart-icon';
import EditProfilePopup from '~/components/my-page/EditProfilePopup';
import ChangePasswordPopup from '~/components/my-page/ChangePasswordPopup';
import MainSider from './main-sider';

const Header = () => {
    const auth = useAuth();
    const router = useRouter();
    const { onOpen: openLoginModal } = useLoginModal();
    // const { onOpen: openRegisterModal } = useRegisterModal();
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
                    className="text-amber-500"
                    onClick={logOut}
                    role="presentation"
                >
                    Đăng xuất
                </div>
            ),
        },
    ];

    return (
        <div
            className="shadow-sm"
            style={{
                backgroundColor: '#FAF6F0',
                borderBottom: '1px solid #E5DDD5',
            }}
        >
            <div className="container flex h-[80px] min-w-full items-center justify-between">
                <div className="mx-2 ml-8 flex max-w-md space-x-10">
                    <Link href="/">
                        <div className="flex select-none flex-col items-center gap-0 uppercase">
                            <div
                                className="text-lg font-semibold leading-4"
                                style={{ color: '#3C2415' }}
                            >
                                Somma
                            </div>
                            <div
                                className="text-2xl font-bold"
                                style={{ color: '#C8965F' }}
                            >
                                Tea
                            </div>
                        </div>
                    </Link>
                    <Search />
                </div>
                <div className="mr-8 flex items-center space-x-10">
                    <MainSider />
                    <div className="flex flex-1 items-center space-x-8">
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
                                        className="flex cursor-pointer space-x-3 rounded-full border px-4 py-2"
                                        onClick={() => router.push('/my-page')}
                                        role="presentation"
                                        style={{
                                            borderColor: '#C8965F',
                                        }}
                                    >
                                        {isFetching ? (
                                            <Skeleton.Avatar
                                                active
                                                className=""
                                            />
                                        ) : (
                                            <Avatar
                                                height={40}
                                                src={getImageUrl(
                                                    user?.data?.image ?? ''
                                                )}
                                                width={40}
                                            />
                                        )}

                                        <MenuOutlined
                                            style={{ color: '#3C2415' }}
                                        />
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
                                            setIsChangePasswordPopupVisible(
                                                false
                                            )
                                        }
                                        visible={isChangePasswordPopupVisible}
                                    />
                                )}
                            </div>
                        ) : (
                            <div className="flex space-x-3">
                                <Tooltip title="Đăng nhập">
                                    <LoginOutlined
                                        className="cursor-pointer"
                                        onClick={openLoginModal}
                                        style={{
                                            fontSize: 24,
                                            color: '#3C2415',
                                        }}
                                    />
                                </Tooltip>
                                {/* <Button
                                    className="h-10 border px-6 font-medium"
                                    onClick={openRegisterModal}
                                    style={{
                                        borderColor: '#C8965F',
                                        color: '#3C2415',
                                    }}
                                    type="default"
                                >
                                    Đăng ký
                                </Button> */}
                            </div>
                        )}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Header;
