import React from 'react';
import { NextPage } from 'next';
import Head from 'next/head';

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
                {/* Tầm nhìn Section */}
                <div className="bg-white py-16">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                            {/* Content */}
                            <div>
                                <h2 className="mb-8 text-4xl font-bold text-blue-800">
                                    TẦM NHÌN
                                </h2>
                                <p className="mb-8 text-lg leading-relaxed text-gray-700">
                                    Trở thành thương hiệu dẫn đầu trong lĩnh vực
                                    trà thảo mộc thiên nhiên tại Việt Nam và sản
                                    phẩm đầu tiên được mọi người nghĩ đến khi
                                    mọi người cần giải quyết vấn đề sức khỏe phụ
                                    nữ với cuộc sống con người và xã hội.
                                </p>
                            </div>

                            {/* Image Card */}
                            <div className="relative">
                                <div className="relative overflow-hidden rounded-2xl bg-blue-600 p-8 text-white">
                                    <div className="absolute right-4 top-4 rounded-lg bg-blue-500 px-4 py-2">
                                        <p className="text-sm font-medium">
                                            Bà Mai Kiều Liên
                                        </p>
                                        <p className="text-xs opacity-90">
                                            Tổng Giám đốc
                                        </p>
                                    </div>

                                    <div className="flex items-center">
                                        <div className="flex-1">
                                            <div className="mb-4 text-6xl">
                                                "
                                            </div>
                                            <blockquote className="text-lg font-medium leading-relaxed">
                                                Muốn có sản phẩm đi đầu trên thị
                                                trường thì phải luôn sống lọc,
                                                <span className="font-bold">
                                                    {' '}
                                                    Sống tạo lỗ yêu là sống cần!
                                                </span>
                                            </blockquote>
                                            <div className="mt-4 text-right text-6xl">
                                                "
                                            </div>
                                        </div>

                                        {/* Avatar placeholder */}
                                        <div className="ml-8">
                                            <div className="flex h-40 w-32 items-center justify-center rounded-xl bg-blue-400">
                                                <span className="text-4xl">
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
                <div className="bg-gray-100 py-16">
                    <div className="container mx-auto px-4">
                        <div className="grid grid-cols-1 items-center gap-12 lg:grid-cols-2">
                            {/* Image Card */}
                            <div className="order-2 lg:order-1">
                                <div className="relative overflow-hidden rounded-2xl bg-green-600 p-8 text-white">
                                    <div className="absolute right-4 top-4 rounded-lg bg-green-500 px-4 py-2">
                                        <p className="text-sm font-medium">
                                            Đội ngũ SomaTea
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
                                                "
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
                                                "
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>

                            {/* Content */}
                            <div className="order-1 lg:order-2">
                                <h2 className="mb-8 text-4xl font-bold text-green-800">
                                    SỨ MỆNH
                                </h2>
                                <p className="text-lg leading-relaxed text-gray-700">
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
                <div className="bg-white py-20">
                    <div className="container mx-auto px-4">
                        <div className="mb-16 text-center">
                            <h2 className="mb-4 text-4xl font-bold text-blue-800">
                                GIÁ TRỊ CỐT LÕI
                            </h2>
                            <p className="mx-auto max-w-3xl text-lg text-gray-600">
                                Trở thành thương hiệu dẫn đầu trong lĩnh vực trà
                                thảo mộc thiên nhiên tại Việt Nam và sản phẩm
                                đầu tiên mọi sự sức khỏe phụ nữ với cuộc sống
                                con người
                            </p>
                        </div>

                        {/* Values Layout - Circular arrangement */}
                        <div className="relative mx-auto max-w-4xl">
                            {/* Top row - 3 values */}
                            <div className="mb-16 flex items-start justify-between">
                                {/* Chính trực */}
                                <div className="max-w-xs text-center">
                                    <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 shadow-lg">
                                        <span className="text-3xl text-white">
                                            🛡️
                                        </span>
                                    </div>
                                    <h3 className="mb-3 text-xl font-bold text-blue-800">
                                        CHÍNH TRỰC
                                    </h3>
                                    <p className="text-sm leading-relaxed text-gray-600">
                                        Liêm chính, Trung thực trong ứng xử và
                                        trong tất cả các giao dịch.
                                    </p>
                                </div>

                                {/* Tôn trọng */}
                                <div className="max-w-xs text-center">
                                    <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 shadow-lg">
                                        <span className="text-3xl text-white">
                                            🤝
                                        </span>
                                    </div>
                                    <h3 className="mb-3 text-xl font-bold text-blue-800">
                                        TÔN TRỌNG
                                    </h3>
                                    <p className="text-sm leading-relaxed text-gray-600">
                                        Tôn trọng bản thân, Tôn trọng đồng
                                        nghiệp, Tôn trọng Cộng ty, Tôn trọng đối
                                        tác, Hợp tác trong sự tôn trọng.
                                    </p>
                                </div>

                                {/* Công bằng */}
                                <div className="max-w-xs text-center">
                                    <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 shadow-lg">
                                        <span className="text-3xl text-white">
                                            ⚖️
                                        </span>
                                    </div>
                                    <h3 className="mb-3 text-xl font-bold text-blue-800">
                                        CÔNG BẰNG
                                    </h3>
                                    <p className="text-sm leading-relaxed text-gray-600">
                                        Công bằng với nhân viên, khách hàng, nhà
                                        cung cấp và các bên liên quan khác.
                                    </p>
                                </div>
                            </div>

                            {/* Bottom row - 2 values */}
                            <div className="flex justify-center space-x-32">
                                {/* Đào đức */}
                                <div className="max-w-xs text-center">
                                    <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 shadow-lg">
                                        <span className="text-3xl text-white">
                                            ❤️
                                        </span>
                                    </div>
                                    <h3 className="mb-3 text-xl font-bold text-blue-800">
                                        ĐẠO ĐỨC
                                    </h3>
                                    <p className="text-sm leading-relaxed text-gray-600">
                                        Tôn trọng các tiêu chuẩn đã được thỏa
                                        thuận từ hành động một cách đạo đức.
                                    </p>
                                </div>

                                {/* Tuân thủ */}
                                <div className="max-w-xs text-center">
                                    <div className="mx-auto mb-6 flex h-24 w-24 items-center justify-center rounded-full bg-blue-600 shadow-lg">
                                        <span className="text-3xl text-white">
                                            📋
                                        </span>
                                    </div>
                                    <h3 className="mb-3 text-xl font-bold text-blue-800">
                                        TUÂN THỦ
                                    </h3>
                                    <p className="text-sm leading-relaxed text-gray-600">
                                        Tuân thủ Luật pháp, Bộ Quy Tắc Ứng Xử và
                                        các quy chế, chính sách, quy trình của
                                        Công ty.
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Phía sau Trà Việt Section */}
                <div className="bg-gray-50 py-20">
                    <div className="container mx-auto px-4">
                        <div className="mb-16 text-center">
                            <h2 className="mb-4 text-4xl font-bold text-gray-800">
                                Phía sau Trà Việt
                            </h2>
                            <p className="mx-auto max-w-2xl text-lg text-gray-600">
                                Một đội ngũ tâm huyết làm việc suốt gần 20 năm
                                qua
                            </p>
                        </div>

                        {/* Team Grid */}
                        <div className="mx-auto grid max-w-6xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
                            {/* Định Minh Phú */}
                            <div className="group text-center">
                                <div className="relative mb-6">
                                    <div className="mx-auto h-48 w-48 overflow-hidden rounded-full bg-gray-300 shadow-lg transition-all duration-300 group-hover:shadow-xl">
                                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-400 to-gray-600">
                                            <span className="text-4xl text-white">
                                                👨‍💼
                                            </span>
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 transform rounded-full bg-white px-3 py-1 shadow-md">
                                        <span className="text-xs font-medium text-gray-600">
                                            Founder, CEO
                                        </span>
                                    </div>
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-gray-800">
                                    Định Minh Phú
                                </h3>
                                <p className="text-sm italic leading-relaxed text-gray-600">
                                    "Sự ngưỡng mộ của tôi với bát đầu từ lòng tự
                                    hào của chúng ta"
                                </p>
                            </div>

                            {/* Trần Thị Mộng Kiều */}
                            <div className="group text-center">
                                <div className="relative mb-6">
                                    <div className="mx-auto h-48 w-48 overflow-hidden rounded-full bg-gray-300 shadow-lg transition-all duration-300 group-hover:shadow-xl">
                                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-400 to-gray-600">
                                            <span className="text-4xl text-white">
                                                👩‍🎨
                                            </span>
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 transform rounded-full bg-white px-3 py-1 shadow-md">
                                        <span className="text-xs font-medium text-gray-600">
                                            Co-founder, Tea Master
                                        </span>
                                    </div>
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-gray-800">
                                    Trần Thị Mộng Kiều
                                </h3>
                                <p className="text-sm italic leading-relaxed text-gray-600">
                                    "Trong trà có cả sự trăng nghiêm của Khổng
                                    Tử, cái ung dung của Lão Tử và cả tinh thần
                                    thiết pha của Thích Ca"
                                </p>
                            </div>

                            {/* Đinh Ngọc Dũng */}
                            <div className="group text-center">
                                <div className="relative mb-6">
                                    <div className="mx-auto h-48 w-48 overflow-hidden rounded-full bg-gray-300 shadow-lg transition-all duration-300 group-hover:shadow-xl">
                                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-400 to-gray-600">
                                            <span className="text-4xl text-white">
                                                👨‍🎨
                                            </span>
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 transform rounded-full bg-white px-3 py-1 shadow-md">
                                        <span className="text-xs font-medium text-gray-600">
                                            Co-founder, Chief Designer
                                        </span>
                                    </div>
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-gray-800">
                                    Đinh Ngọc Dũng
                                </h3>
                                <p className="text-sm italic leading-relaxed text-gray-600">
                                    "Về quyển rũ kinh điển bắt đầu từ bộ cục và
                                    cảm xúc chất lõi"
                                </p>
                            </div>

                            {/* Đinh Nguyễn Thanh Huyền */}
                            <div className="group text-center">
                                <div className="relative mb-6">
                                    <div className="mx-auto h-48 w-48 overflow-hidden rounded-full bg-gray-300 shadow-lg transition-all duration-300 group-hover:shadow-xl">
                                        <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-gray-400 to-gray-600">
                                            <span className="text-4xl text-white">
                                                👩‍🏫
                                            </span>
                                        </div>
                                    </div>
                                    <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 transform rounded-full bg-white px-3 py-1 shadow-md">
                                        <span className="text-xs font-medium text-gray-600">
                                            Tea Trainer
                                        </span>
                                    </div>
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-gray-800">
                                    Đinh Nguyễn Thanh Huyền
                                </h3>
                                <p className="text-sm italic leading-relaxed text-gray-600">
                                    "Tôi muốn "nhìn" thấy hương vị trà trong vần
                                    hạng của mình"
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                {/* Call to Action Section */}
                <div className="bg-gradient-to-r from-green-600 to-blue-600 py-16">
                    <div className="container mx-auto px-4 text-center text-white">
                        <h3 className="mb-6 text-3xl font-bold">
                            Trải nghiệm hương vị trà thảo mộc tự nhiên
                        </h3>
                        <p className="mx-auto mb-8 max-w-2xl text-xl opacity-90">
                            Hãy để SomaTea đồng hành cùng bạn trong hành trình
                            chăm sóc sức khỏe và tìm kiếm sự cân bằng trong cuộc
                            sống.
                        </p>
                        <div className="flex flex-col justify-center gap-4 sm:flex-row">
                            <a
                                className="inline-flex items-center rounded-full bg-white px-8 py-4 font-semibold text-green-600 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-100"
                                href="/product"
                            >
                                <span className="mr-2">🍃</span>
                                Khám phá sản phẩm
                            </a>
                            <a
                                className="inline-flex items-center rounded-full border-2 border-white px-8 py-4 font-semibold text-white transition-all duration-300 hover:scale-105 hover:bg-white hover:text-green-600"
                                href="/contact"
                            >
                                <span className="mr-2">📞</span>
                                Liên hệ với chúng tôi
                            </a>
                        </div>
                    </div>
                </div>
            </div>
        </>
    );
};

export default AboutPage;
