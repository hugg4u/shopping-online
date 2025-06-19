import React, { useState } from 'react';
import Sidebar from '~/components/my-page/Sidebar';
import ProfileForm from '~/components/my-page/ProfileForm';
import MyOrder from './my-order/index';

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
        <div className="min-h-screen" style={{ backgroundColor: '#dde8dc' }}>
            <div className="responsive-container">
                <div className="flex flex-col gap-6 p-4 sm:p-6 lg:flex-row lg:gap-8 lg:p-8">
                    <div className="lg:w-64 lg:flex-shrink-0">
                        <Sidebar
                            onMenuClick={setCurrentPage}
                            selectedKey={currentPage}
                        />
                    </div>
                    <div className="min-w-0 flex-1">
                        <div
                            className="rounded-xl border p-4 shadow-sm sm:p-6"
                            style={{
                                backgroundColor: '#dde8dc',
                                borderColor: '#365842',
                            }}
                        >
                            {renderContent()}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default MyPage;
