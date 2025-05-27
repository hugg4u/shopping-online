import React from 'react';
import Header from '~/components/layouts/default-layout/header';
import MainSider from './main-sider';
import Footer from '../footer';

type Props = {
    children: React.ReactNode;
};

export const DefaultLayout: React.FC<Props> = ({ children }) => {
    return (
        <div className="min-w-[1200px] bg-gradient-to-br from-gray-50 to-white">
            <div className="border-b-2 border-gray-100 bg-white shadow-sm">
                <Header />
                <MainSider />
            </div>
            <div className="min-h-[70vh] bg-gradient-to-br from-gray-50 to-white py-8">
                {children}
            </div>
            <div className="mt-16">
                <Footer />
            </div>
        </div>
    );
};
