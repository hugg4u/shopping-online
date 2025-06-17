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
                backgroundColor: '#dde8dc',
                // borderBottom: '1px solid #365842',
            }}
        >
            <div className="container flex h-[80px] items-center justify-between">
                <div className="mx-2 ml-8 flex max-w-md items-center space-x-10">
                    <Link
                        className="flex flex-1 flex-row items-center"
                        href="/"
                    >
                        <div className="relative flex h-[60px] w-[50px] flex-1 flex-row items-center">
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
                        <div className="relative flex h-[60px] w-[100px] flex-1 flex-row items-center">
                            <Image
                                alt="logo"
                                fill
                                priority
                                sizes="(max-width: 200px) 200vw"
                                src="/images/soma-text.png"
                                style={{
                                    objectFit: 'contain',
                                    borderRadius: '50%',
                                }}
                            />
                        </div>
                    </Link>
                    <Search />
                </div>
                <div className="flex items-center">
                    <MainSider />
                    <div className="ml-8 flex flex-1 items-center space-x-8">
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
                                    <UserOutlined
                                        className="cursor-pointer"
                                        onClick={openLoginModal}
                                        style={{
                                            fontSize: 24,
                                            color: '#365842',
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
