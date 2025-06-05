import MainBanner from '~/components/home-page/main-banner';
import NaturalBackgroundSection from '~/components/home-page/natural-background-section';
import ListProductFeatured from '~/components/home-page/product-featured';
import TeaExperienceSection from '~/components/home-page/tea-experience-section';
import { NextPageWithLayout } from './_app';

const HomePage: NextPageWithLayout = () => {
    return (
        <div
            className="min-h-screen overflow-hidden"
            style={{ backgroundColor: '#FAF6F0' }}
        >
            {/* Hero Banner Section */}
            <section className="relative">
                <MainBanner />
            </section>

            {/* Tea Introduction Section */}
            {/* <section className="relative">
                <TeaIntro />
            </section> */}

            {/* Section "THƯỞNG TRÀ THEO CÁCH CỦA RIÊNG BẠN" */}
            <section
                className="relative py-20"
                style={{ backgroundColor: '#F5F1E8' }}
            >
                <TeaExperienceSection />
            </section>

            {/* Natural Background Section with Parallax */}
            <section className="relative">
                <NaturalBackgroundSection />
            </section>

            {/* Featured Products Section */}
            <section className="relative">
                <ListProductFeatured />
            </section>
        </div>
    );
};

HomePage.title = 'Trang chủ - Trà Thanh Nhiệt Giải Độc';

export default HomePage;
