import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';
import Image from 'next/image';

const AboutPage: NextPage = () => {
    return (
        <>
            <Head>
                <title>Về chúng tôi - SomaTea</title>
                <meta
                    content="Tìm hiểu về tầm nhìn, sứ mệnh và giá trị cốt lõi của SomaTea - thương hiệu trà thảo mộc thiên nhiên hàng đầu Việt Nam"
                    name="description"
                />
            </Head>

            <div className="min-h-screen bg-gray-50">
                {/* Banner Section */}
                <div className="relative h-[250px] w-full sm:h-[300px] lg:h-[400px]">
                    <Image
                        alt="About Us Banner"
                        className="object-cover"
                        fill
                        priority
                        src="/images/banner-1.png"
                    />
                    <div className="absolute inset-0 bg-black/40" />
                    <div className="absolute inset-0 flex items-center justify-center px-4">
                        <div
                            className="max-w-4xl text-center text-white"
                            style={{
                                textShadow: '2px 2px 4px rgba(0,0,0,0.8)',
                            }}
                        >
                            <h1 className="mb-3 text-2xl font-extrabold tracking-wide sm:mb-4 sm:text-3xl md:text-4xl lg:text-5xl">
                                🌿 Chào mừng đến với Soma Tea
                            </h1>
                            <p className="text-sm font-bold leading-relaxed tracking-wide sm:text-base md:text-lg lg:text-xl">
                                Thanh lọc từ thiên nhiên – Sống trọn an lành để
                                sắp xếp tôi tiêu đề này vào ảnh này
                            </p>
                        </div>
                    </div>
                </div>

                {/* Tầm nhìn Section */}
                <div className="bg-white py-12 sm:py-16">
                    <div className="responsive-container">
                        <div className="grid grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-2">
                            {/* Content */}
                            <div>
                                <h2 className="responsive-title mb-6 text-blue-800 sm:mb-8">
                                    TẦM NHÌN
                                </h2>
                                <p className="mb-6 text-base leading-relaxed text-gray-700 sm:mb-8 sm:text-lg">
                                    Trở thành thương hiệu dẫn đầu trong lĩnh vực
                                    trà thảo mộc thiên nhiên tại Việt Nam và sản
                                    phẩm đầu tiên được mọi người nghĩ đến khi
                                    mọi người cần giải quyết vấn đề sức khỏe phụ
                                    nữ với cuộc sống con người và xã hội.
                                </p>
                            </div>

                            {/* Image Card */}
                            <div className="relative">
                                <div className="relative overflow-hidden rounded-xl bg-blue-600 p-4 text-white sm:rounded-2xl sm:p-6 lg:p-8">
                                    <div className="absolute right-3 top-3 rounded-lg bg-blue-500 px-2 py-1 sm:right-4 sm:top-4 sm:px-4 sm:py-2">
                                        <p className="text-xs font-medium sm:text-sm">
                                            Bà Lê Thị Hồng
                                        </p>
                                        <p className="text-xs opacity-90">
                                            Tổng Giám đốc
                                        </p>
                                    </div>

                                    <div className="flex flex-col items-center gap-4 sm:flex-row sm:gap-0">
                                        <div className="flex-1 text-center sm:text-left">
                                            <div className="mb-3 text-4xl sm:mb-4 sm:text-5xl lg:text-6xl">
                                                &quot;
                                            </div>
                                            <blockquote className="text-sm font-medium leading-relaxed sm:text-base lg:text-lg">
                                                Muốn có sản phẩm đi đầu trên thị
                                                trường thì phải luôn sống lọc,
                                                <span className="font-bold">
                                                    {' '}
                                                    Sống tạo lỗ yêu là sống cần!
                                                </span>
                                            </blockquote>
                                            <div className="mt-3 text-right text-4xl sm:mt-4 sm:text-5xl lg:text-6xl">
                                                &quot;
                                            </div>
                                        </div>

                                        {/* Avatar placeholder */}
                                        <div className="sm:ml-6 lg:ml-8">
                                            <div className="flex h-24 w-20 items-center justify-center rounded-xl bg-blue-400 sm:h-32 sm:w-24 lg:h-40 lg:w-32">
                                                <span className="text-2xl sm:text-3xl lg:text-4xl">
                                                    👩‍💼
                                                </span>
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Sứ mệnh Section */}
                <div className="bg-gray-100 py-12 sm:py-16">
                    <div className="responsive-container">
                        <div className="grid grid-cols-1 items-center gap-8 sm:gap-12 lg:grid-cols-2">
                            {/* Image Card */}
                            <div className="order-2 lg:order-1">
                                <div className="relative overflow-hidden rounded-xl bg-green-600 p-4 text-white sm:rounded-2xl sm:p-6 lg:p-8">
                                    <div className="absolute right-4 top-4 rounded-lg bg-green-500 px-4 py-2">
                                        <p className="text-sm font-medium">
                                            Đội ngũ Soma Tea
                                        </p>
                                        <p className="text-xs opacity-90">
                                            Nghiên cứu & Phát triển
                                        </p>
                                    </div>

                                    <div className="flex items-center">
                                        {/* Avatar placeholder */}
                                        <div className="mr-8">
                                            <div className="flex h-40 w-32 items-center justify-center rounded-xl bg-green-400">
                                                <span className="text-4xl">
                                                    🌿
                                                </span>
                                            </div>
                                        </div>

                                        <div className="flex-1">
                                            <div className="mb-4 text-6xl">
                                                &quot;
                                            </div>
                                            <blockquote className="text-lg font-medium leading-relaxed">
                                                Chúng tôi cam kết mang đến cho
                                                cộng đồng người dùng sữ dưỡng và
                                                chất lượng cao cập nhật dần tiến
                                                bằng những sự tận tâm, tình yêu
                                                và trách nhiệm cao của mình với
                                                cuộc sống con người và xã hội.
                                            </blockquote>
                                            <div className="mt-4 text-right text-6xl">
                                                &quot;
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="order-1 lg:order-2">
                                <h2 className="responsive-title mb-6 text-green-800 sm:mb-8">
                                    SỨ MỆNH
                                </h2>
                                <p className="text-base leading-relaxed text-gray-700 sm:text-lg">
                                    Chúng tôi mang đến những sản phẩm trà thảo
                                    mộc sạch, lành mạnh và hiệu quả, giúp người
                                    dùng chăm sóc thể chất lẫn tinh thần thông
                                    qua những trải nghiệm đơn giản, tự nhiên và
                                    bền vững.
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Giá trị cốt lõi Section */}
                <div className="bg-white py-16 sm:py-20">
                    <div className="responsive-container">
                        <div className="mb-12 text-center sm:mb-16">
                            <h2 className="responsive-title mb-3 text-blue-800 sm:mb-4">
                                GIÁ TRỊ CỐT LÕI
                            </h2>
                            <p className="mx-auto max-w-3xl text-base text-gray-600 sm:text-lg">
                                Trở thành thương hiệu dẫn đầu trong lĩnh vực trà
                                thảo mộc thiên nhiên tại Việt Nam và sản phẩm
                                đầu tiên mọi sự sức khỏe phụ nữ với cuộc sống
                                con người
                            </p>
                        </div>

                        {/* Values Layout - Responsive grid với 5 items đều */}
                        <div className="relative mx-auto max-w-6xl">
                            {/* Values Grid - 1 col mobile, 2 col tablet, 5 col desktop (hoặc 3-2 pattern) */}
                            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:gap-12">
                                {/* First row - 3 items trên desktop */}
                                <div className="lg:col-span-2 lg:grid lg:grid-cols-3 lg:gap-12">
                                    {/* Chính trực */}
                                    <div className="mb-8 text-center lg:mb-0">
                                        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 shadow-lg sm:mb-6 sm:h-28 sm:w-28 lg:h-32 lg:w-32">
                                            <span className="text-3xl text-white sm:text-4xl lg:text-5xl">
                                                🛡️
                                            </span>
                                        </div>
                                        <h3 className="mb-2 text-lg font-bold text-blue-800 sm:mb-3 sm:text-xl">
                                            CHÍNH TRỰC
                                        </h3>
                                        <p className="text-xs leading-relaxed text-gray-600 sm:text-sm">
                                            Liêm chính, Trung thực trong ứng xử
                                            và trong tất cả các giao dịch.
                                        </p>
                                    </div>

                                    {/* Tôn trọng */}
                                    <div className="mb-8 text-center lg:mb-0">
                                        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 shadow-lg sm:mb-6 sm:h-28 sm:w-28 lg:h-32 lg:w-32">
                                            <span className="text-3xl text-white sm:text-4xl lg:text-5xl">
                                                🤝
                                            </span>
                                        </div>
                                        <h3 className="mb-2 text-lg font-bold text-blue-800 sm:mb-3 sm:text-xl">
                                            TÔN TRỌNG
                                        </h3>
                                        <p className="text-xs leading-relaxed text-gray-600 sm:text-sm">
                                            Tôn trọng bản thân, Tôn trọng đồng
                                            nghiệp, Tôn trọng Cộng ty, Tôn trọng
                                            đối tác, Hợp tác trong sự tôn trọng.
                                        </p>
                                    </div>

                                    {/* Công bằng */}
                                    <div className="mb-8 text-center lg:mb-0">
                                        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 shadow-lg sm:mb-6 sm:h-28 sm:w-28 lg:h-32 lg:w-32">
                                            <span className="text-3xl text-white sm:text-4xl lg:text-5xl">
                                                ⚖️
                                            </span>
                                        </div>
                                        <h3 className="mb-2 text-lg font-bold text-blue-800 sm:mb-3 sm:text-xl">
                                            CÔNG BẰNG
                                        </h3>
                                        <p className="text-xs leading-relaxed text-gray-600 sm:text-sm">
                                            Công bằng với nhân viên, khách hàng,
                                            nhà cung cấp và các bên liên quan
                                            khác.
                                        </p>
                                    </div>
                                </div>

                                {/* Second row - 2 items trên desktop, centered */}
                                <div className="lg:col-span-2 lg:mx-auto lg:grid lg:max-w-2xl lg:grid-cols-2 lg:gap-12">
                                    {/* Đạo đức */}
                                    <div className="mb-8 text-center lg:mb-0">
                                        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 shadow-lg sm:mb-6 sm:h-28 sm:w-28 lg:h-32 lg:w-32">
                                            <span className="text-3xl text-white sm:text-4xl lg:text-5xl">
                                                ❤️
                                            </span>
                                        </div>
                                        <h3 className="mb-2 text-lg font-bold text-blue-800 sm:mb-3 sm:text-xl">
                                            ĐẠO ĐỨC
                                        </h3>
                                        <p className="text-xs leading-relaxed text-gray-600 sm:text-sm">
                                            Tôn trọng các tiêu chuẩn đã được
                                            thỏa thuận từ hành động một cách đạo
                                            đức.
                                        </p>
                                    </div>

                                    {/* Tuân thủ */}
                                    <div className="text-center">
                                        <div className="mx-auto mb-4 flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 shadow-lg sm:mb-6 sm:h-28 sm:w-28 lg:h-32 lg:w-32">
                                            <span className="text-3xl text-white sm:text-4xl lg:text-5xl">
                                                📋
                                            </span>
                                        </div>
                                        <h3 className="mb-2 text-lg font-bold text-blue-800 sm:mb-3 sm:text-xl">
                                            TUÂN THỦ
                                        </h3>
                                        <p className="text-xs leading-relaxed text-gray-600 sm:text-sm">
                                            Tuân thủ Luật pháp, Bộ Quy Tắc Ứng
                                            Xử và các quy chế, chính sách, quy
                                            trình của Công ty.
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Phía sau Trà Việt Section */}
                <div className="bg-gray-50 py-16 sm:py-20">
                    <div className="responsive-container">
                        <div className="mb-12 text-center sm:mb-16">
                            <h2 className="responsive-title mb-3 text-gray-800 sm:mb-4">
                                Phía sau Soma Tea
                            </h2>
                            <p className="mx-auto max-w-2xl text-base text-gray-600 sm:text-lg">
                                Một đội ngũ tâm huyết làm việc suốt gần 20 năm
                                qua
                            </p>
                        </div>

                        {/* Team Grid */}
                        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-6 sm:grid-cols-2 sm:gap-8 lg:grid-cols-4">
                            {/* Team Member 1 */}
                            <div className="group text-center">
                                <div className="relative mb-4 sm:mb-6">
                                    <div className="mx-auto h-32 w-32 overflow-hidden rounded-full bg-gray-300 shadow-lg transition-all duration-300 group-hover:shadow-xl sm:h-40 sm:w-40 lg:h-48 lg:w-48">
                                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-400 to-gray-600">
                                            <span className="text-2xl text-white sm:text-3xl lg:text-4xl">
                                                👨‍💼
                                            </span>
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 transform rounded-full bg-white px-2 py-1 shadow-md sm:px-3">
                                        <span className="text-xs font-medium text-gray-600">
                                            Founder, CEO
                                        </span>
                                    </div>
                                </div>
                                <h3 className="mb-2 text-lg font-bold text-gray-800 sm:mb-3 sm:text-xl">
                                    Nam Văn Bằng
                                </h3>
                                <p className="text-xs italic leading-relaxed text-gray-600 sm:text-sm">
                                    &quot;Sự ngưỡng mộ của tôi với bát đầu từ
                                    lòng tự hào của chúng ta&quot;
                                </p>
                            </div>

                            {/* Team Member 2 */}
                            <div className="group text-center">
                                <div className="relative mb-4 sm:mb-6">
                                    <div className="mx-auto h-32 w-32 overflow-hidden rounded-full bg-gray-300 shadow-lg transition-all duration-300 group-hover:shadow-xl sm:h-40 sm:w-40 lg:h-48 lg:w-48">
                                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-400 to-gray-600">
                                            <span className="text-2xl text-white sm:text-3xl lg:text-4xl">
                                                👩‍🎨
                                            </span>
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 transform rounded-full bg-white px-2 py-1 shadow-md sm:px-3">
                                        <span className="text-xs font-medium text-gray-600">
                                            Co-founder, Tea Master
                                        </span>
                                    </div>
                                </div>
                                <h3 className="mb-2 text-lg font-bold text-gray-800 sm:mb-3 sm:text-xl">
                                    Đào Quý Hưng
                                </h3>
                                <p className="text-xs italic leading-relaxed text-gray-600 sm:text-sm">
                                    &quot;Trong trà có cả sự trăng nghiêm của
                                    Khổng Tử, cái ung dung của Lão Tử và cả tinh
                                    thần thiết pha của Thích Ca&quot;
                                </p>
                            </div>

                            {/* Team Member 3 */}
                            <div className="group text-center">
                                <div className="relative mb-4 sm:mb-6">
                                    <div className="mx-auto h-32 w-32 overflow-hidden rounded-full bg-gray-300 shadow-lg transition-all duration-300 group-hover:shadow-xl sm:h-40 sm:w-40 lg:h-48 lg:w-48">
                                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-400 to-gray-600">
                                            <span className="text-2xl text-white sm:text-3xl lg:text-4xl">
                                                👨‍🎨
                                            </span>
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 transform rounded-full bg-white px-2 py-1 shadow-md sm:px-3">
                                        <span className="text-xs font-medium text-gray-600">
                                            Co-founder, Chief Designer
                                        </span>
                                    </div>
                                </div>
                                <h3 className="mb-2 text-lg font-bold text-gray-800 sm:mb-3 sm:text-xl">
                                    Đào Bình An
                                </h3>
                                <p className="text-xs italic leading-relaxed text-gray-600 sm:text-sm">
                                    &quot;Về quyển rũ kinh điển bắt đầu từ bộ
                                    cục và cảm xúc chất lõi&quot;
                                </p>
                            </div>

                            {/* Team Member 4 */}
                            <div className="group text-center">
                                <div className="relative mb-4 sm:mb-6">
                                    <div className="mx-auto h-32 w-32 overflow-hidden rounded-full bg-gray-300 shadow-lg transition-all duration-300 group-hover:shadow-xl sm:h-40 sm:w-40 lg:h-48 lg:w-48">
                                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-400 to-gray-600">
                                            <span className="text-2xl text-white sm:text-3xl lg:text-4xl">
                                                👩‍🏫
                                            </span>
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 transform rounded-full bg-white px-2 py-1 shadow-md sm:px-3">
                                        <span className="text-xs font-medium text-gray-600">
                                            Tea Trainer
                                        </span>
                                    </div>
                                </div>
                                <h3 className="mb-2 text-lg font-bold text-gray-800 sm:mb-3 sm:text-xl">
                                    Trần Duy Đức
                                </h3>
                                <p className="text-xs italic leading-relaxed text-gray-600 sm:text-sm">
                                    &quot;Tôi muốn &quot;nhìn&quot; thấy hương
                                    vị trà trong vần hạng của mình&quot;
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutPage;
