import MainBanner from '~/components/home-page/main-banner';
import { NextPageWithLayout } from './_app';
import ListProductFeatured from '~/components/home-page/product-featured';
import ListLatestPost from '~/components/common/latest-post';
import ListPostFeatured from '~/components/home-page/post-featured';

const HomePage: NextPageWithLayout = () => {
    return (
        <div className="min-h-screen bg-gradient-to-br from-gray-50 via-white to-rose-50">
            {/* Hero Banner Section */}
            <div className="relative overflow-hidden">
                <MainBanner />
                {/* Decorative gradient overlay */}
                <div className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-transparent to-white/20" />
            </div>

            {/* Main Content Section */}
            <div className="container mx-auto py-16">
                <div className="flex gap-12 lg:gap-16">
                    {/* Sidebar - Latest Posts */}
                    {/* <div className="hidden lg:block">
                        <div className="sticky top-8 w-[380px] min-w-[380px]">
                            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl backdrop-blur-sm">
                                <div className="mb-6">
                                    <h2 className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-2xl font-bold text-transparent">
                                        Bài viết mới nhất
                                    </h2>
                                    <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-rose-500 to-pink-500" />
                                </div>
                                <ListLatestPost />
                            </div>
                        </div>
                    </div> */}

                    {/* Main Content */}
                    <div className="flex-1 space-y-20">
                        {/* Featured Posts Section */}
                        <section className="space-y-8">
                            <div className="space-y-4 text-center">
                                <h2 className="bg-gradient-to-r from-gray-800 to-gray-600 bg-clip-text text-4xl font-bold text-transparent">
                                    Bài viết nổi bật
                                </h2>
                                <p className="mx-auto max-w-2xl text-lg text-gray-600">
                                    Khám phá những bài viết thú vị về nước hoa
                                    và xu hướng làm đẹp mới nhất
                                </p>
                                <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-rose-500 to-pink-500" />
                            </div>
                            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl">
                                <ListPostFeatured />
                            </div>
                        </section>

                        {/* Featured Products Section */}
                        <section className="space-y-8">
                            <div className="space-y-4 text-center">
                                <h2 className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-4xl font-bold text-transparent">
                                    Sản phẩm nổi bật
                                </h2>
                                <p className="mx-auto max-w-2xl text-lg text-gray-600">
                                    Những chai nước hoa được yêu thích nhất với
                                    chất lượng cao và mùi hương quyến rũ
                                </p>
                                <div className="mx-auto h-1 w-24 rounded-full bg-gradient-to-r from-rose-500 to-pink-500" />
                            </div>
                            <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl">
                                <ListProductFeatured />
                            </div>
                        </section>

                        {/* Call to Action Section */}
                        <section className="py-16 text-center">
                            <div className="rounded-3xl bg-gradient-to-r from-rose-500 to-pink-500 p-12 text-white shadow-2xl">
                                <h3 className="mb-4 text-3xl font-bold">
                                    Khám phá thế giới nước hoa
                                </h3>
                                <p className="mb-8 text-xl opacity-90">
                                    Tìm kiếm mùi hương hoàn hảo cho phong cách
                                    của bạn
                                </p>
                                <button
                                    className="rounded-full bg-white px-8 py-4 text-lg font-bold text-rose-600 shadow-lg transition-all duration-300 hover:scale-105 hover:bg-gray-100"
                                    type="button"
                                >
                                    Xem tất cả sản phẩm
                                </button>
                            </div>
                        </section>
                    </div>
                </div>
            </div>

            {/* Mobile Sidebar */}
            <div className="px-6 pb-16 lg:hidden">
                <div className="rounded-3xl border border-gray-100 bg-white p-8 shadow-xl">
                    <div className="mb-6">
                        <h2 className="bg-gradient-to-r from-rose-600 to-pink-600 bg-clip-text text-2xl font-bold text-transparent">
                            Bài viết mới nhất
                        </h2>
                        <div className="mt-2 h-1 w-16 rounded-full bg-gradient-to-r from-rose-500 to-pink-500" />
                    </div>
                    <ListLatestPost />
                </div>
            </div>
        </div>
    );
};

HomePage.title = 'Trang chủ - The Perfume';

export default HomePage;
