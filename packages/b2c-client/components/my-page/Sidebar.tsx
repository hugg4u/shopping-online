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
        <div className="w-64 rounded-lg bg-white p-6 shadow-lg">
            <div className="mb-6 flex items-center space-x-3 rounded-lg bg-gradient-to-r from-rose-50 to-pink-50 p-4">
                <UserOutlined className="text-2xl text-rose-600" />
                <div className="flex flex-col">
                    <span className="text-lg font-semibold text-gray-800">
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
                        className="mb-2 rounded-lg font-medium text-gray-700 hover:bg-rose-50 hover:text-rose-600"
                        icon={item.icon}
                        key={item.key}
                    >
                        {item.label}
                    </Menu.Item>
                ))}
            </Menu>
        </div>
    );
};

export default Sidebar;
