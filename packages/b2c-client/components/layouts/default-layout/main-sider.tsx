import React from 'react';
import BrandPopover from './brand-popover';
import { SiderItem } from './sider-item';

const MainSider = () => {
    return (
        <div>
            <div className="container py-4">
                <div className="flex items-center justify-center space-x-8">
                    <SiderItem href="/" title="Trang chủ" />
                    <SiderItem href="/product" title="Sản phẩm" />
                    {/* <CategoryPopover /> */}
                    <BrandPopover />
                    <SiderItem href="/contact" title="Liên hệ" />
                </div>
            </div>
        </div>
    );
};

export default MainSider;
