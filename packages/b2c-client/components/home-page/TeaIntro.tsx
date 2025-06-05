import React from 'react';
import Image from 'next/image';

const TeaIntro = () => {
    return (
        <div className="relative min-h-screen w-full">
            {/* Background Image */}
            <div className="absolute inset-0">
                <Image
                    alt="Tea Introduction"
                    className="object-cover"
                    fill
                    priority
                    src="/images/tea-intro-1.png"
                />
                {/* Overlay gradient */}
                <div className="absolute inset-0 bg-gradient-to-l from-black/70 to-transparent" />
            </div>

            {/* Content */}
            <div className="relative flex min-h-screen items-center">
                <div className="container mx-auto px-4">
                    <div className="ml-auto max-w-[600px] text-right">
                        <div className="space-y-6 text-white">
                            <p className="text-lg leading-relaxed">
                                Soma Tea – Dòng trà thảo mộc tự nhiên, tinh
                                tuyển từ lá sen, hoa cúc, tâm sen, cam thảo...
                                Không chất bảo quản, không hương liệu nhân tạo.
                            </p>
                            <p className="text-lg leading-relaxed">
                                Mỗi tách trà mang đến hương vị thuần khiết, giúp
                                thanh lọc cơ thể, giảm căng thẳng và cải thiện
                                giấc ngủ.
                            </p>
                            <p className="text-lg font-medium italic leading-relaxed">
                                Soma Tea là lựa chọn lý tưởng cho lối sống lành
                                mạnh, mang lại sự cân bằng và tinh tế
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TeaIntro;
