import React from 'react';
import { useRouter } from 'next/router';
import { DefaultLayout } from '../components/layouts/default-layout';
import type { NextPageWithLayout } from './_app';

const BlogPage: NextPageWithLayout = () => {
    const router = useRouter();

    return (
        <div>
            {/* Hero Section */}
            <section
                className="py-20 text-gray-800"
                style={{
                    background:
                        'linear-gradient(135deg, #dde8dc 0%, #c8d6c4 100%)',
                }}
            >
                <div className="container mx-auto px-4 text-center">
                    <h1
                        className="mb-6 text-5xl font-bold"
                        style={{ color: '#365842' }}
                    >
                        Blog SOMA
                    </h1>
                    <p
                        className="mx-auto mb-8 max-w-2xl text-xl"
                        style={{ color: '#6B5B4F' }}
                    >
                        Khám phá những câu chuyện thú vị về trà, sức khỏe và
                        cuộc sống
                    </p>
                </div>
            </section>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-12">
                {/* Featured Post */}
                <section className="mb-16">
                    <div className="overflow-hidden rounded-2xl bg-white shadow-2xl">
                        <div className="md:flex">
                            <div className="md:w-1/2">
                                <img
                                    alt="Featured Post"
                                    className="h-64 w-full object-cover md:h-full"
                                    src="/images/bg-tea.jpeg"
                                />
                            </div>
                            <div className="p-8 md:w-1/2">
                                <span className="mb-4 inline-block rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-800">
                                    Bài viết nổi bật
                                </span>
                                <h2 className="mb-4 text-3xl font-bold text-gray-800">
                                    Lợi ích tuyệt vời của trà xanh đối với sức
                                    khỏe
                                </h2>
                                <p className="mb-6 text-gray-600">
                                    Trà xanh không chỉ là thức uống ngon miệng
                                    mà còn mang lại nhiều lợi ích cho sức khỏe.
                                    Từ việc giảm cân đến chống lão hóa, hãy cùng
                                    khám phá những điều tuyệt vời của trà
                                    xanh...
                                </p>
                                <button
                                    className="inline-flex items-center font-semibold"
                                    onClick={() =>
                                        router.push('/blog-new/featured')
                                    }
                                    style={{ color: '#365842' }}
                                    type="button"
                                >
                                    Đọc thêm{' '}
                                    <i className="fas fa-arrow-right ml-2" />
                                </button>
                            </div>
                        </div>
                    </div>
                </section>

                {/* Blog Grid */}
                <section>
                    <h2 className="mb-12 bg-gradient-to-r from-green-700 to-yellow-600 bg-clip-text text-center text-3xl font-bold text-transparent">
                        Bài viết mới nhất
                    </h2>
                    <div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3">
                        {/* Blog Card 1 */}
                        <div
                            className="cursor-pointer overflow-hidden rounded-xl bg-white shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:transform hover:shadow-2xl"
                            onClick={() => router.push('/blog-new/1')}
                            onKeyDown={(e) =>
                                e.key === 'Enter' && router.push('/blog-new/1')
                            }
                            role="button"
                            tabIndex={0}
                        >
                            <img
                                alt="Blog 1"
                                className="h-48 w-full object-cover"
                                src="/images/thalong.jpg"
                            />
                            <div className="p-6">
                                <div className="mb-3 flex items-center">
                                    <span className="rounded-full bg-purple-100 px-2 py-1 text-xs text-purple-800">
                                        Lối sống
                                    </span>
                                    <span className="ml-auto text-sm text-gray-500">
                                        20/6/2025
                                    </span>
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-gray-800">
                                    Thả lỏng cơ thể và tâm trí với 1 tách trà
                                    thảo mộc mỗi ngày
                                </h3>
                                <p className="mb-4 text-gray-600">
                                    Trong nhịp sống hối hả hiện đại, ai trong
                                    chúng ta cũng đôi lúc cảm thấy căng thẳng,
                                    mệt mỏi. Chỉ cần một tách trà thảo mộc mỗi
                                    ngày để tạo nên sự khác biệt lớn cho cả cơ
                                    thể lẫn tâm trí...
                                </p>
                                <span
                                    className="font-semibold"
                                    style={{ color: '#365842' }}
                                >
                                    Đọc thêm →
                                </span>
                            </div>
                        </div>

                        {/* Blog Card 2 */}
                        <div
                            className="cursor-pointer overflow-hidden rounded-xl bg-white shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:transform hover:shadow-2xl"
                            onClick={() => router.push('/blog-new/2')}
                            onKeyDown={(e) =>
                                e.key === 'Enter' && router.push('/blog-new/2')
                            }
                            role="button"
                            tabIndex={0}
                        >
                            <img
                                alt="Blog 2"
                                className="h-48 w-full object-cover"
                                src="/images/biquyet.jpg"
                            />
                            <div className="p-6">
                                <div className="mb-3 flex items-center">
                                    <span className="rounded-full bg-green-100 px-2 py-1 text-xs text-green-800">
                                        Sức khỏe
                                    </span>
                                    <span className="ml-auto text-sm text-gray-500">
                                        20/06/2025
                                    </span>
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-gray-800">
                                    Bí Quyết Ngủ Ngon, Da Đẹp, Cơ Thể Nhẹ Nhàng
                                    Nhờ Trà Thảo Mộc
                                </h3>
                                <p className="mb-4 text-gray-600">
                                    Giấc ngủ chất lượng không chỉ giúp tái tạo
                                    năng lượng mà còn là yếu tố then chốt trong
                                    việc cải thiện làn da và thanh lọc cơ thể.
                                    Trà thảo mộc chính là giải pháp đơn giản
                                    nhưng cực kỳ hiệu quả...
                                </p>
                                <span
                                    className="font-semibold"
                                    style={{ color: '#365842' }}
                                >
                                    Đọc thêm →
                                </span>
                            </div>
                        </div>

                        {/* Blog Card 3 */}
                        <div
                            className="cursor-pointer overflow-hidden rounded-xl bg-white shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:transform hover:shadow-2xl"
                            onClick={() => router.push('/blog-new/3')}
                            onKeyDown={(e) =>
                                e.key === 'Enter' && router.push('/blog-new/3')
                            }
                            role="button"
                            tabIndex={0}
                        >
                            <img
                                alt="Blog 3"
                                className="h-48 w-full object-cover"
                                src="/images/trathaomoc.jpg"
                            />
                            <div className="p-6">
                                <div className="mb-3 flex items-center">
                                    <span className="rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                                        Liệu pháp
                                    </span>
                                    <span className="ml-auto text-sm text-gray-500">
                                        20/06/2024
                                    </span>
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-gray-800">
                                    Trà thảo mộc: Liệu pháp tự nhiên giúp bạn
                                    cân bằng lại cuộc sống
                                </h3>
                                <p className="mb-4 text-gray-600">
                                    Trong nhịp sống hiện đại đầy áp lực, việc
                                    tìm kiếm sự cân bằng giữa công việc, gia
                                    đình và sức khỏe đang trở thành ưu tiên. Trà
                                    thảo mộc không chỉ là thức uống mà còn là
                                    liệu pháp tinh thần và thể chất sâu sắc...
                                </p>
                                <span
                                    className="font-semibold"
                                    style={{ color: '#365842' }}
                                >
                                    Đọc thêm →
                                </span>
                            </div>
                        </div>

                        {/* Blog Card 4 */}
                        <article className="overflow-hidden rounded-xl bg-white shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:transform hover:shadow-2xl">
                            <img
                                alt="Blog 4"
                                className="h-48 w-full object-cover"
                                src="/images/thucuongvang.jpg"
                            />
                            <div className="p-6">
                                <div className="mb-3 flex items-center">
                                    <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
                                        Tiết kiệm thời gian
                                    </span>
                                    <span className="ml-auto text-sm text-gray-500">
                                        20/06/2025
                                    </span>
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-gray-800">
                                    Thức uống &lsquo;vàng&rsquo; cho người bận
                                    rộn: Trà thảo mộc thanh lọc và thư giãn
                                </h3>
                                <p className="mb-4 text-gray-600">
                                    Trong nhịp sống hiện đại hối hả, việc chăm
                                    sóc sức khỏe thường bị đặt sau những ưu tiên
                                    công việc. Trà thảo mộc chính là cách đơn
                                    giản và hiệu quả nhất để tái tạo năng lượng
                                    từ thiên nhiên...
                                </p>
                                <button
                                    className="font-semibold"
                                    style={{ color: '#365842' }}
                                    type="button"
                                >
                                    Đọc thêm →
                                </button>
                            </div>
                        </article>

                        {/* Blog Card 5 */}
                        <article className="overflow-hidden rounded-xl bg-white shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:transform hover:shadow-2xl">
                            <img
                                alt="Blog 5"
                                className="h-48 w-full object-cover"
                                src="/images/bg-tea.jpeg"
                            />
                            <div className="p-6">
                                <div className="mb-3 flex items-center">
                                    <span className="rounded-full bg-yellow-100 px-2 py-1 text-xs text-yellow-800">
                                        Xu hướng
                                    </span>
                                    <span className="ml-auto text-sm text-gray-500">
                                        03/12/2024
                                    </span>
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-gray-800">
                                    Trà hoa cúc - Xu hướng mới của giới trẻ
                                </h3>
                                <p className="mb-4 text-gray-600">
                                    Trà hoa cúc đang trở thành xu hướng được
                                    giới trẻ yêu thích với hương vị nhẹ nhàng và
                                    tác dụng thư giãn...
                                </p>
                                <button
                                    className="font-semibold"
                                    style={{ color: '#365842' }}
                                    type="button"
                                >
                                    Đọc thêm →
                                </button>
                            </div>
                        </article>

                        {/* Blog Card 6 */}
                        <article className="overflow-hidden rounded-xl bg-white shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:transform hover:shadow-2xl">
                            <img
                                alt="Blog 6"
                                className="h-48 w-full object-cover"
                                src="/images/bg-tea.jpeg"
                            />
                            <div className="p-6">
                                <div className="mb-3 flex items-center">
                                    <span className="rounded-full bg-indigo-100 px-2 py-1 text-xs text-indigo-800">
                                        Review
                                    </span>
                                    <span className="ml-auto text-sm text-gray-500">
                                        01/12/2024
                                    </span>
                                </div>
                                <h3 className="mb-3 text-xl font-bold text-gray-800">
                                    Review top 5 loại trà ngon nhất tại SOMA
                                </h3>
                                <p className="mb-4 text-gray-600">
                                    Cùng khám phá 5 loại trà được khách hàng yêu
                                    thích nhất tại SOMA với hương vị đặc trưng
                                    và chất lượng tuyệt vời...
                                </p>
                                <button
                                    className="font-semibold"
                                    style={{ color: '#365842' }}
                                    type="button"
                                >
                                    Đọc thêm →
                                </button>
                            </div>
                        </article>
                    </div>
                </section>

                {/* Pagination */}
                <section className="mt-16 flex justify-center">
                    <nav className="flex space-x-2">
                        <button
                            aria-label="Previous page"
                            className="rounded-lg bg-white px-4 py-2 text-gray-600 shadow transition duration-300 hover:bg-gray-50"
                            type="button"
                        >
                            <i className="fas fa-chevron-left" />
                        </button>
                        <button
                            className="rounded-lg px-4 py-2 text-white shadow transition duration-300"
                            style={{ backgroundColor: '#365842' }}
                            type="button"
                        >
                            1
                        </button>
                        <button
                            className="rounded-lg bg-white px-4 py-2 text-gray-600 shadow transition duration-300 hover:bg-gray-50"
                            type="button"
                        >
                            2
                        </button>
                        <button
                            className="rounded-lg bg-white px-4 py-2 text-gray-600 shadow transition duration-300 hover:bg-gray-50"
                            type="button"
                        >
                            3
                        </button>
                        <button
                            aria-label="Next page"
                            className="rounded-lg bg-white px-4 py-2 text-gray-600 shadow transition duration-300 hover:bg-gray-50"
                            type="button"
                        >
                            <i className="fas fa-chevron-right" />
                        </button>
                    </nav>
                </section>
            </main>

            {/* Newsletter Section */}
            <section className="mt-16 bg-white py-16">
                <div className="container mx-auto px-4 text-center">
                    <h2 className="mb-4 text-3xl font-bold text-gray-800">
                        Đăng ký nhận bài viết mới
                    </h2>
                    <p className="mx-auto mb-8 max-w-2xl text-gray-600">
                        Nhận thông báo về những bài viết mới nhất về trà và sức
                        khỏe từ SOMA
                    </p>
                    <div className="mx-auto flex max-w-md">
                        <input
                            className="flex-1 rounded-l-lg border border-gray-300 px-4 py-3 focus:border-blue-500 focus:outline-none"
                            placeholder="Nhập email của bạn"
                            type="email"
                        />
                        <button
                            className="rounded-r-lg px-6 py-3 text-white transition duration-300"
                            style={{ backgroundColor: '#365842' }}
                            type="button"
                        >
                            Đăng ký
                        </button>
                    </div>
                </div>
            </section>
        </div>
    );
};

BlogPage.getLayout = function getLayout(page: React.ReactElement) {
    return <DefaultLayout>{page}</DefaultLayout>;
};

export default BlogPage;
