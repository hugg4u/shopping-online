import React from 'react';
import Header from '~/components/layouts/default-layout/header';
import Footer from '../footer';

type Props = {
    children: React.ReactNode;
};

export const DefaultLayout: React.FC<Props> = ({ children }) => {
    return (
        <div className="w-full bg-gradient-to-br from-gray-50 to-white">
            <div className="bg-white shadow-sm">
                <Header />
                {/* <MainSider /> */}
            </div>
            <div className="min-h-[70vh] w-full bg-gradient-to-br from-gray-50 to-white">
                {children}
            </div>
            <div className="">
                <Footer />
            </div>
        </div>
    );
};
