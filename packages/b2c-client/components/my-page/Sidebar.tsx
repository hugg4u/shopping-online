import React from 'react';
import { Menu } from 'antd';
import {
    HeartOutlined,
    LogoutOutlined,
    SettingOutlined,
    ShoppingOutlined,
    UserOutlined,
} from '@ant-design/icons';

type SidebarProps = {
    selectedKey: string;
    onMenuClick: (key: string) => void;
};

const Sidebar: React.FC<SidebarProps> = ({ selectedKey, onMenuClick }) => {
    const menuItems = [
        {
            key: 'profile',
            icon: <UserOutlined />,
            label: 'Thông tin cá nhân',
        },
        {
            key: 'orders',
            icon: <ShoppingOutlined />,
            label: 'Đơn hàng của tôi',
        },
        {
            key: 'wishlist',
            icon: <HeartOutlined />,
            label: 'Danh sách yêu thích',
        },
        {
            key: 'settings',
            icon: <SettingOutlined />,
            label: 'Cài đặt',
        },
        {
            key: 'logout',
            icon: <LogoutOutlined />,
            label: 'Đăng xuất',
        },
    ];

    return (
        <div className="w-full rounded-lg bg-white p-4 shadow-lg sm:p-6 lg:w-64">
            <div className="mb-4 flex items-center space-x-3 rounded-lg bg-gradient-to-r from-amber-50 to-amber-50 p-3 sm:mb-6 sm:p-4">
                <UserOutlined className="text-xl text-amber-600 sm:text-2xl" />
                <div className="flex flex-col">
                    <span className="text-base font-semibold text-gray-800 sm:text-lg">
                        Tài khoản của tôi
                    </span>
                </div>
            </div>

            <Menu
                className="border-none bg-transparent"
                mode="vertical"
                onClick={({ key }) => onMenuClick(key)}
                selectedKeys={[selectedKey]}
            >
                {menuItems.map((item) => (
                    <Menu.Item
                        className="mb-2 rounded-lg text-sm font-medium text-gray-700 hover:bg-amber-50 hover:text-amber-600 sm:text-base"
                        icon={item.icon}
                        key={item.key}
                    >
                        <span className="hidden sm:inline">{item.label}</span>
                        <span className="sm:hidden">
                            {item.label.split(' ')[0]}
                        </span>
                    </Menu.Item>
                ))}
            </Menu>
        </div>
    );
};

export default Sidebar;
