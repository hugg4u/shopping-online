import MainBanner from '~/components/home-page/main-banner';
import NaturalBackgroundSection from '~/components/home-page/natural-background-section';
import ListProductFeatured from '~/components/home-page/product-featured';
import TeaExperienceSection from '~/components/home-page/tea-experience-section';
import NewsPreview from '~/components/common/news-preview';
import { NextPageWithLayout } from './_app';

const HomePage: NextPageWithLayout = () => {
    // Dữ liệu tin tức
    const newsItems = [
        {
            title: "Bí quyết khỏe đẹp với trà thảo mộc",
            description: "Những kết luận khoa học về tác dụng của trà trong việc hỗ trợ chống lão hóa, ngừa bệnh tim mạch, giúp trẻ hóa cơ thể và giữ cho tinh thần tỉnh táo đã giúp cho thức uống này được nhiều người ưa chuộng.",
            image: "https://vcdn1-kinhdoanh.vnecdn.net/2012/10/10/tra-250-1367043974.jpg?w=1200&h=0&q=100&dpr=1&fit=crop&s=iXZmDl2_LGLMrUlwT0q1hg",
            url: "https://vnexpress.net/bi-quyet-khoe-dep-voi-tra-thao-moc-2723067.html"
        },
        {
            title: "Tất cả điều cần biết về trà thảo mộc",
            description: "Trà thảo mộc mang lại nhiều lợi ích đối với sức khỏe như ngăn ngừa ung thư, tiểu đường, bệnh tim mạch, giảm lo âu, mất ngủ,... Tuy nhiên, bạn cũng nên cẩn thận khi chọn loại trà thảo mộc, thời gian và liều dùng.",
            image: "https://www.vinmec.com/static/uploads/20220120_124148_031610_tra_thao_moc_max_1800x1800_jpg_580d2f6bf8.jpg",
            url: "https://www.vinmec.com/vie/bai-viet/tat-ca-dieu-can-biet-ve-tra-thao-moc-vi"
        },
        {
            "title": "Uống trà thảo mộc giúp bạn thư giãn khi căng thẳng, mệt mỏi",
            "description": "Những lo lắng, căng thẳng, mệt mỏi vì áp lực cuộc sống hay bệnh tật có thể khiến chúng ta cảm thấy kiệt sức. Uống trà thảo mộc là một biện pháp tự nhiên và hiệu quả để cải thiện cảm giác tồi tệ, giúp bạn lấy lại tinh thần và sức khỏe tốt hơn.",
            "image": "https://bna.1cdn.vn/2023/12/06/uploaded-thanhthuybna-2023_12_06-_1-17008119074391406037379-5707.jpg",
            "url": "https://baonghean.vn/uong-tra-thao-moc-giup-ban-thu-gian-khi-cang-thang-met-moi-10264872.html?fbclid=IwY2xjawLDpEBleHRuA2FlbQIxMABicmlkETFBVjE3cmxDSXg2aUZpOWVnAR6uM_0qH4516WPlV7ki4I7NsPHmxxAURHyqh6O5fOMIuDb7oejKO3nap66egg_aem_uM8iKOs2F6tWsBpsXP7wNg"
        },
        {
            "title": "Trà thảo mộc và những công dụng bất ngờ cho sức khỏe",
            "description": "Xu hướng sử dụng các loại trà thảo mộc đang ngày càng phổ biến vì tính tiện lợi và một số công dụng mà nó mang lại. Tuy nhiên, không phải ai cũng biết cách chọn loại trà cũng như chọn thời gian và liều dùng cho hiệu quả tối ưu nhất.",
            "image": "https://cdn.nhathuoclongchau.com.vn/unsafe/https://cms-prod.s3-sgn09.fptcloud.com/tra_thao_moc_va_nhung_cong_dung_bat_ngo_cho_suc_khoe_2_ac1b10d73a.jpg",
            "url": "https://nhathuoclongchau.com.vn/bai-viet/tra-thao-moc-va-nhung-cong-dung-bat-ngo-cho-suc-khoe.html?fbclid=IwY2xjawLDpFdleHRuA2FlbQIxMABicmlkETFBVjE3cmxDSXg2aUZpOWVnAR6Rd4M6qSlFf1Q8s-DJO6v0aOzcmRT_b_6K_wHCoi0oCB45IfXGUxbg3DQ0qQ_aem_a9vF3afD5fppcAm8bwStBw"
        }
    ];

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

            {/* Featured Products Section */}
            <section className="relative">
                <ListProductFeatured />
            </section>

            {/* Natural Background Section with Parallax */}
            <section className="relative">
                <NaturalBackgroundSection />
            </section>

            {/* Section "THƯỞNG TRÀ THEO CÁCH CỦA RIÊNG BẠN" */}
            <section
                className="relative py-12 sm:py-16 lg:py-20"
                style={{ backgroundColor: '#F5F1E8' }}
            >
                <TeaExperienceSection />
            </section>

            {/* News Preview Section */}
            <section className="relative py-12">
                <NewsPreview newsItems={newsItems} />
            </section>
        </div>
    );
};

HomePage.title = 'Trang chủ - Trà Thanh Nhiệt Giải Độc';

export default HomePage;
