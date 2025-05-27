import React, { useState } from 'react';
import { Layout } from 'antd';
import Sidebar from '~/components/my-page/Sidebar';
import ProfileForm from '~/components/my-page/ProfileForm';
import MyOrder from './my-order/index';

const { Content } = Layout;

const MyPage = () => {
    const [currentPage, setCurrentPage] = useState('profile');

    const renderContent = () => {
        switch (currentPage) {
            case 'profile':
                return <ProfileForm />;
            case 'orders':
                return <MyOrder />;
            default:
                return <ProfileForm />;
        }
    };

    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 to-white">
            <Layout className="mx-auto max-w-7xl bg-transparent">
                <div className="flex gap-8 p-8">
                    <Sidebar
                        onMenuClick={setCurrentPage}
                        selectedKey={currentPage}
                    />
                    <div className="flex-1">
                        <Content className="rounded-lg bg-white p-6 shadow-lg">
                            {renderContent()}
                        </Content>
                    </div>
                </div>
            </Layout>
        </div>
    );
};

export default MyPage;
