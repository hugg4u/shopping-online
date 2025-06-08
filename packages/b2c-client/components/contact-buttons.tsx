import {
    CloseOutlined,
    FacebookOutlined,
    MenuOutlined,
    MessageOutlined,
    PhoneOutlined,
} from '@ant-design/icons';
import { Button } from 'antd';
import classNames from 'classnames';
import { useState } from 'react';

export const ContactButtons = () => {
    const [isOpen, setIsOpen] = useState(false);

    return (
        <div className="fixed right-4 top-1/2 z-50 flex -translate-y-1/2 flex-col items-end">
            <Button
                className="mb-4 flex h-12 w-12 items-center justify-center rounded-full bg-[#6B5B4F] text-white shadow-lg transition-all duration-300 hover:bg-[#4b2a13]"
                onClick={() => setIsOpen(!isOpen)}
                type="text"
            >
                {isOpen ? (
                    <CloseOutlined className="text-lg" />
                ) : (
                    <MenuOutlined className="text-lg" />
                )}
            </Button>

            <div
                className={classNames(
                    'flex flex-col gap-4 transition-all duration-500',
                    {
                        'translate-y-0 opacity-100': isOpen,
                        'invisible -translate-y-20 opacity-0': !isOpen,
                    }
                )}
            >
                <a
                    className="group flex items-center justify-end"
                    href="tel:0912166969"
                >
                    <span className="mr-2 translate-x-8 whitespace-nowrap rounded-full bg-[#6B5B4F] px-4 py-2 text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:bg-[#4b2a13] group-hover:opacity-100">
                        0912.166.969
                    </span>
                    <div className="h-12 overflow-hidden rounded-full transition-all duration-300 group-hover:pr-1">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#6B5B4F] text-white shadow-lg transition-all duration-300 hover:bg-[#4b2a13] group-hover:bg-[#4b2a13]">
                            <PhoneOutlined className="text-lg" />
                        </div>
                    </div>
                </a>

                <a
                    className="group flex items-center justify-end"
                    href="https://www.facebook.com/profile.php?id=61577044074416"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <span className="mr-2 translate-x-8 whitespace-nowrap rounded-full bg-[#6B5B4F] px-4 py-2 text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:bg-[#4b2a13] group-hover:opacity-100">
                        Messenger
                    </span>
                    <div className="h-12 overflow-hidden rounded-full transition-all duration-300 group-hover:pr-1">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#6B5B4F] text-white shadow-lg transition-all duration-300 hover:bg-[#4b2a13] group-hover:bg-[#4b2a13]">
                            <MessageOutlined className="text-lg" />
                        </div>
                    </div>
                </a>

                <a
                    className="group flex items-center justify-end"
                    href="https://www.facebook.com/profile.php?id=61577044074416"
                    rel="noopener noreferrer"
                    target="_blank"
                >
                    <span className="mr-2 translate-x-8 whitespace-nowrap rounded-full bg-[#6B5B4F] px-4 py-2 text-white opacity-0 transition-all duration-300 group-hover:translate-x-0 group-hover:bg-[#4b2a13] group-hover:opacity-100">
                        Facebook
                    </span>
                    <div className="h-12 overflow-hidden rounded-full transition-all duration-300 group-hover:pr-1">
                        <div className="flex h-12 w-12 items-center justify-center rounded-full bg-[#6B5B4F] text-white shadow-lg transition-all duration-300 hover:bg-[#4b2a13] group-hover:bg-[#4b2a13]">
                            <FacebookOutlined className="text-lg" />
                        </div>
                    </div>
                </a>
            </div>
        </div>
    );
};
