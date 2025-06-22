import { MenuOutlined, UserOutlined } from '@ant-design/icons';
import { Dropdown, MenuProps, Skeleton, Tooltip } from 'antd';

import Avatar from '@shopping/common/components/avatar';
import { useUserQueryStore } from '@shopping/common/store/useUserStore';
import { getImageUrl } from '@shopping/common/utils/getImageUrl';
import Cookies from 'js-cookie';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useState } from 'react';
import { useAuth } from '~/hooks/useAuth';
import useLoginModal from '~/hooks/useLoginModal';
// import useRegisterModal from '~/hooks/useRegisterModal';
import ChangePasswordPopup from '~/components/my-page/ChangePasswordPopup';
import EditProfilePopup from '~/components/my-page/EditProfilePopup';
import CartIcon from './cart-icon';
import MainSider from './main-sider';
import Search from './search';

const Header = () => {
    const auth = useAuth();
    const router = useRouter();
    const { onOpen: openLoginModal } = useLoginModal();
    // const { onOpen: openRegisterModal } = useRegisterModal();
    const { user, isFetching } = useUserQueryStore();
    const [isProfilePopupVisible, setIsProfilePopupVisible] = useState(false);
    const [isChangePasswordPopupVisible, setIsChangePasswordPopupVisible] =
        useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

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
            className="relative shadow-sm"
            style={{
                backgroundColor: '#dde8dc',
                // borderColor: '1px solid #365842',
            }}
        >
            <div className="container mx-auto flex h-[80px] items-center justify-between px-4">
                {/* Logo Section */}
                <div className="flex items-center space-x-4">
                    <Link className="flex flex-row items-center" href="/">
                        <div className="relative flex h-[40px] w-[35px] items-center md:h-[60px] md:w-[50px]">
                            <Image
                                alt="logo"
                                fill
                                priority
                                sizes="(max-width: 768px) 35px, 50px"
                                src="/images/logo.png"
                                style={{
                                    objectFit: 'contain',
                                    borderRadius: '50%',
                                }}
                                className='pb-2'
                            />
                        </div>
                        <div className="relative flex h-[40px] w-[70px] items-center md:h-[60px] md:w-[100px]">
                            <Image
                                alt="logo"
                                fill
                                priority
                                sizes="(max-width: 768px) 70px, 100px"
                                src="/images/soma-text.png"
                                style={{
                                    objectFit: 'contain',
                                    borderRadius: '50%',
                                }}
                            />
                        </div>
                    </Link>

                    {/* Search - Hidden on mobile, visible from md up */}
                    <div className="hidden md:block">
                        <Search />
                    </div>
                </div>

                {/* Desktop Navigation - Hidden on mobile */}
                <div className="hidden items-center space-x-6 md:flex">
                    <MainSider />
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
                                        <Skeleton.Avatar active />
                                    ) : (
                                        <Avatar
                                            height={40}
                                            src={
                                                user?.data?.image
                                                    ? getImageUrl(
                                                          user?.data?.image
                                                      )
                                                    : undefined
                                            }
                                            width={40}
                                        />
                                    )}

                                    <MenuOutlined
                                        style={{ color: '#3C2415' }}
                                    />
                                </div>
                            </Dropdown>
                        </div>
                    ) : (
                        <div className="flex space-x-3">
                            <Tooltip title="Đăng nhập">
                                <UserOutlined
                                    className="cursor-pointer"
                                    onClick={openLoginModal}
                                    style={{
                                        fontSize: 24,
                                        color: '#365842',
                                    }}
                                />
                            </Tooltip>
                        </div>
                    )}
                </div>

                {/* Mobile Menu Toggle */}
                <div className="flex items-center space-x-3 md:hidden">
                    <CartIcon />
                    <button
                        aria-label="Toggle mobile menu"
                        className="rounded-md p-2"
                        onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                        style={{ color: '#365842' }}
                        type="button"
                    >
                        <MenuOutlined style={{ fontSize: 20 }} />
                    </button>
                </div>
            </div>

            {/* Mobile Search - Below header on mobile */}
            <div className="block px-4 pb-3 md:hidden">
                <Search />
            </div>

            {/* Mobile Menu Dropdown */}
            {isMobileMenuOpen && (
                <div className="absolute left-0 right-0 top-full z-50 border-t bg-white shadow-lg md:hidden">
                    <div className="px-4 py-4">
                        <div className="space-y-4">
                            {/* Navigation Items */}
                            <div className="border-b pb-4">
                                <MainSider />
                            </div>

                            {/* User Section */}
                            {auth ? (
                                <div className="space-y-3">
                                    <div
                                        className="flex items-center space-x-3 rounded-lg bg-gray-50 p-3"
                                        onClick={() => router.push('/my-page')}
                                        role="presentation"
                                    >
                                        {isFetching ? (
                                            <Skeleton.Avatar active size={32} />
                                        ) : (
                                            <Avatar
                                                height={32}
                                                src={
                                                    user?.data?.image
                                                        ? getImageUrl(
                                                              user?.data?.image
                                                          )
                                                        : undefined
                                                }
                                                width={32}
                                            />
                                        )}
                                        <span className="font-medium text-gray-700">
                                            {user?.data?.name || 'Tài khoản'}
                                        </span>
                                    </div>

                                    <button
                                        className="w-full rounded-lg p-3 text-left text-gray-700 hover:bg-gray-50"
                                        onClick={() => {
                                            setIsProfilePopupVisible(true);
                                            setIsMobileMenuOpen(false);
                                        }}
                                        type="button"
                                    >
                                        Thông tin người dùng
                                    </button>

                                    <button
                                        className="w-full rounded-lg p-3 text-left text-gray-700 hover:bg-gray-50"
                                        onClick={() => {
                                            setIsChangePasswordPopupVisible(
                                                true
                                            );
                                            setIsMobileMenuOpen(false);
                                        }}
                                        type="button"
                                    >
                                        Đổi mật khẩu
                                    </button>

                                    <button
                                        className="w-full rounded-lg p-3 text-left text-gray-700 hover:bg-gray-50"
                                        onClick={() => {
                                            router.push('/my-page/my-order');
                                            setIsMobileMenuOpen(false);
                                        }}
                                        type="button"
                                    >
                                        Đơn mua
                                    </button>

                                    <button
                                        className="w-full rounded-lg p-3 text-left text-red-500 hover:bg-red-50"
                                        onClick={() => {
                                            logOut();
                                            setIsMobileMenuOpen(false);
                                        }}
                                        type="button"
                                    >
                                        Đăng xuất
                                    </button>
                                </div>
                            ) : (
                                <button
                                    className="w-full rounded-lg bg-[#365842] p-3 font-medium text-white"
                                    onClick={() => {
                                        openLoginModal();
                                        setIsMobileMenuOpen(false);
                                    }}
                                    type="button"
                                >
                                    Đăng nhập
                                </button>
                            )}
                        </div>
                    </div>
                </div>
            )}

            {/* Popups */}
            {user && (
                <EditProfilePopup
                    onClose={() => setIsProfilePopupVisible(false)}
                    visible={isProfilePopupVisible}
                />
            )}
            {user && (
                <ChangePasswordPopup
                    onClose={() => setIsChangePasswordPopupVisible(false)}
                    visible={isChangePasswordPopupVisible}
                />
            )}
        </div>
    );
};

export default Header;
