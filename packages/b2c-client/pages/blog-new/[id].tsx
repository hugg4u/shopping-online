import React from 'react';
import { useRouter } from 'next/router';
import { DefaultLayout } from '../../components/layouts/default-layout';
import type { NextPageWithLayout } from '../_app';

// Mock data cho các bài viết
const blogPosts = {
    '1': {
        id: '1',
        title: 'Tác dụng của trà oolong với hệ tiêu hóa',
        category: 'Sức khỏe',
        date: '12/12/2024',
        image: '/images/bg-tea.jpeg',
        content: `
            <p>Trà oolong là một loại trà truyền thống có nguồn gốc từ Trung Quốc và Đài Loan, được biết đến với khả năng hỗ trợ tiêu hóa tuyệt vời. Với quy trình chế biến đặc biệt, trà oolong giữ được nhiều hoạt chất có lợi cho sức khỏe.</p>
            
            <h2>Lợi ích của trà oolong đối với hệ tiêu hóa</h2>
            
            <h3>1. Hỗ trợ tiêu hóa chất béo</h3>
            <p>Trà oolong chứa polyphenol và catechin, những hợp chất giúp kích thích enzyme tiêu hóa và hỗ trợ phân hủy chất béo hiệu quả hơn.</p>
            
            <h3>2. Cải thiện chức năng ruột</h3>
            <p>Các chất chống oxy hóa trong trà oolong giúp duy trì sự cân bằng vi sinh vật đường ruột, từ đó cải thiện quá trình hấp thụ chất dinh dưỡng.</p>
            
            <h3>3. Giảm viêm dạ dày</h3>
            <p>Tính chất chống viêm của trà oolong có thể giúp làm dịu niêm mạc dạ dày và giảm các triệu chứng khó tiêu.</p>
            
            <h2>Cách uống trà oolong đúng cách</h2>
            <ul>
                <li>Uống 2-3 tách trà oolong mỗi ngày</li>
                <li>Uống sau bữa ăn 30-60 phút để hỗ trợ tiêu hóa tốt nhất</li>
                <li>Pha trà với nước nhiệt độ 85-95°C</li>
                <li>Thời gian ngâm 3-5 phút</li>
            </ul>
            
            <p>Trà oolong không chỉ mang lại hương vị thơm ngon mà còn là người bạn đồng hành tuyệt vời cho hệ tiêu hóa khỏe mạnh của bạn.</p>
        `,
    },
    '2': {
        id: '2',
        title: 'Cách pha trà đúng cách để giữ nguyên hương vị',
        category: 'Kiến thức',
        date: '10/12/2024',
        image: '/images/bg-tea.jpeg',
        content: `
            <p>Pha trà là một nghệ thuật tinh tế đòi hỏi sự am hiểu về từng loại trà và kỹ thuật pha chế phù hợp. Mỗi loại trà có đặc điểm riêng và cần được đối xử một cách đặc biệt để tỏa ra hương vị tuyệt vời nhất.</p>
            
            <h2>Các yếu tố quan trọng khi pha trà</h2>
            
            <h3>1. Nhiệt độ nước</h3>
            <ul>
                <li><strong>Trà xanh:</strong> 70-80°C</li>
                <li><strong>Trà oolong:</strong> 85-95°C</li>
                <li><strong>Trà đen:</strong> 95-100°C</li>
                <li><strong>Trà trắng:</strong> 75-85°C</li>
            </ul>
            
            <h3>2. Tỷ lệ trà và nước</h3>
            <p>Tỷ lệ lý tưởng là 1 gram trà cho 50-100ml nước, tùy thuộc vào độ đậm đà mong muốn và loại trà sử dụng.</p>
            
            <h3>3. Thời gian ngâm</h3>
            <ul>
                <li><strong>Trà xanh:</strong> 1-3 phút</li>
                <li><strong>Trà oolong:</strong> 3-5 phút</li>
                <li><strong>Trà đen:</strong> 3-5 phút</li>
                <li><strong>Trà trắng:</strong> 4-6 phút</li>
            </ul>
            
            <h2>Bí quyết pha trà ngon</h2>
            
            <h3>Chuẩn bị dụng cụ</h3>
            <p>Sử dụng ấm trà bằng gốm hoặc thủy tinh, tránh dùng kim loại để không ảnh hưởng đến hương vị trà.</p>
            
            <h3>Quy trình pha trà</h3>
            <ol>
                <li>Đun nước đến nhiệt độ phù hợp</li>
                <li>Làm nóng ấm trà bằng cách rót nước nóng vào rồi đổ ra</li>
                <li>Cho trà vào ấm và rót nước nóng</li>
                <li>Đậy nắp và ngâm theo thời gian quy định</li>
                <li>Lọc trà và thưởng thức ngay</li>
            </ol>
            
            <p>Với những bí quyết này, bạn sẽ có thể pha được những tách trà thơm ngon, giữ nguyên được hương vị đặc trưng của từng loại trà.</p>
        `,
    },
    '3': {
        id: '3',
        title: 'Văn hóa uống trà Việt Nam qua các thế hệ',
        category: 'Lối sống',
        date: '08/12/2024',
        image: '/images/bg-tea.jpeg',
        content: `
            <p>Trà không chỉ là thức uống quen thuộc mà còn là một phần không thể thiếu trong văn hóa Việt Nam. Từ những tách trà đơn giản trong gia đình đến những buổi đàm đạo bên ấm trà, văn hóa trà đã gắn bó với người Việt qua bao thế hệ.</p>
            
            <h2>Lịch sử trà tại Việt Nam</h2>
            
            <h3>Thời kỳ phong kiến</h3>
            <p>Trà được du nhập vào Việt Nam từ thời phong kiến, ban đầu chỉ phổ biến trong hoàng gia và tầng lớp quý tộc. Các nghi lễ uống trà được thực hiện theo cung cách trang trọng với nhiều quy tắc phức tạp.</p>
            
            <h3>Thời kỳ hiện đại</h3>
            <p>Trà dần trở nên phổ biến trong dân gian, mỗi vùng miền phát triển những cách pha và thưởng thức trà riêng biệt, tạo nên sự đa dạng trong văn hóa trà Việt Nam.</p>
            
            <h2>Đặc trưng văn hóa trà các vùng miền</h2>
            
            <h3>Miền Bắc</h3>
            <p>Trà sen, trà tôm, trà tim... với cách pha tinh tế, thưởng thức chậm rãi trong không gian yên tĩnh.</p>
            
            <h3>Miền Trung</h3>
            <p>Trà Huế với hương vị đậm đà, mang đậm phong cách hoàng gia, thường được dùng trong các dịp lễ tết.</p>
            
            <h3>Miền Nam</h3>
            <p>Trà đá, trà sữa... phong cách gần gũi, dễ uống, phù hợp với khí hậu nhiệt đới.</p>
            
            <h2>Ý nghĩa văn hóa của trà</h2>
            
            <h3>Gắn kết gia đình</h3>
            <p>Tách trà là cầu nối giữa các thế hệ, nơi truyền đạt kinh nghiệm sống và chia sẻ tâm tư.</p>
            
            <h3>Giao tiếp xã hội</h3>
            <p>Mời trà là cách thể hiện lòng hiếu khách, tạo không gian thân mật cho các cuộc trò chuyện.</p>
            
            <h3>Tâm linh và triết học</h3>
            <p>Uống trà giúp tĩnh tâm, suy ngẫm về cuộc sống, tìm lại sự cân bằng trong tâm hồn.</p>
            
            <p>Văn hóa trà Việt Nam là kho tàng vô giá cần được bảo tồn và phát huy, để các thế hệ mai sau có thể tiếp nối truyền thống tốt đẹp này.</p>
        `,
    },
    featured: {
        id: 'featured',
        title: 'Lợi ích tuyệt vời của trà xanh đối với sức khỏe',
        category: 'Bài viết nổi bật',
        date: '15/12/2024',
        image: '/images/bg-tea.jpeg',
        content: `
            <p>Trà xanh được mệnh danh là "thần dược" của thiên nhiên với vô số lợi ích đối với sức khỏe con người. Từ hàng nghìn năm nay, trà xanh đã được sử dụng không chỉ như một thức uống thơm ngon mà còn như một phương thuốc tự nhiên.</p>
            
            <h2>Thành phần dinh dưỡng của trà xanh</h2>
            
            <h3>Catechin và EGCG</h3>
            <p>Trà xanh chứa nhiều catechin, đặc biệt là EGCG (Epigallocatechin gallate) - một chất chống oxy hóa mạnh mẽ, giúp bảo vệ tế bào khỏi tổn thương do gốc tự do.</p>
            
            <h3>L-Theanine</h3>
            <p>Amino acid này giúp tăng cường khả năng tập trung và giảm stress mà không gây buồn ngủ.</p>
            
            <h3>Caffeine tự nhiên</h3>
            <p>Lượng caffeine vừa phải giúp tỉnh táo nhưng không gây hồi hộp như cà phê.</p>
            
            <h2>10 lợi ích tuyệt vời của trà xanh</h2>
            
            <h3>1. Tăng cường miễn dịch</h3>
            <p>Các chất chống oxy hóa trong trà xanh giúp tăng cường hệ miễn dịch, bảo vệ cơ thể khỏi các bệnh tật.</p>
            
            <h3>2. Hỗ trợ giảm cân</h3>
            <p>Trà xanh kích thích quá trình trao đổi chất, giúp đốt cháy mỡ thừa hiệu quả.</p>
            
            <h3>3. Bảo vệ tim mạch</h3>
            <p>Giúp giảm cholesterol xấu, ổn định huyết áp và giảm nguy cơ bệnh tim mạch.</p>
            
            <h3>4. Chống lão hóa</h3>
            <p>Các chất chống oxy hóa giúp chậm quá trình lão hóa, giữ da mịn màng và tươi trẻ.</p>
            
            <h3>5. Cải thiện trí nhớ</h3>
            <p>L-Theanine và caffeine phối hợp giúp tăng cường khả năng tập trung và cải thiện trí nhớ.</p>
            
            <h3>6. Phòng chống ung thư</h3>
            <p>Các nghiên cứu cho thấy EGCG có thể giúp ngăn ngừa sự phát triển của một số loại tế bào ung thư.</p>
            
            <h3>7. Ổn định đường huyết</h3>
            <p>Trà xanh giúp điều hòa lượng đường trong máu, có lợi cho người tiểu đường.</p>
            
            <h3>8. Bảo vệ gan</h3>
            <p>Hỗ trợ chức năng gan, giúp detox cơ thể hiệu quả.</p>
            
            <h3>9. Cải thiện tiêu hóa</h3>
            <p>Giúp kích thích tiêu hóa và giảm viêm đường ruột.</p>
            
            <h3>10. Giảm stress</h3>
            <p>L-Theanine có tác dụng thư giãn tự nhiên, giúp giảm căng thẳng và cải thiện tâm trạng.</p>
            
            <h2>Cách uống trà xanh đúng cách</h2>
            
            <h3>Thời gian uống</h3>
            <ul>
                <li>Buổi sáng: Giúp tỉnh táo bắt đầu ngày mới</li>
                <li>Giữa buổi chiều: Tăng cường năng lượng</li>
                <li>Tránh uống trước khi ngủ để không ảnh hưởng giấc ngủ</li>
            </ul>
            
            <h3>Liều lượng</h3>
            <p>Nên uống 2-3 tách trà xanh mỗi ngày để có được lợi ích tối ưu mà không gây tác dụng phụ.</p>
            
            <h3>Lưu ý</h3>
            <ul>
                <li>Không uống trà xanh khi đói</li>
                <li>Tránh uống cùng lúc với thuốc</li>
                <li>Người có vấn đề về dạ dày nên uống sau bữa ăn</li>
            </ul>
            
            <p>Trà xanh thực sự là một món quà tuyệt vời từ thiên nhiên. Hãy biến việc uống trà xanh thành thói quen hàng ngày để tận hưởng những lợi ích tuyệt vời này cho sức khỏe của bạn!</p>
        `,
    },
};

const BlogDetailPage: NextPageWithLayout = () => {
    const router = useRouter();
    const { id } = router.query;

    const post = blogPosts[id as string];

    if (!post) {
        return (
            <div className="container mx-auto px-4 py-12">
                <div className="text-center">
                    <h1 className="mb-4 text-4xl font-bold text-gray-800">
                        Bài viết không tồn tại
                    </h1>
                    <p className="mb-8 text-gray-600">
                        Xin lỗi, chúng tôi không thể tìm thấy bài viết bạn đang
                        tìm kiếm.
                    </p>
                    <button
                        className="rounded-lg px-6 py-3 text-white transition duration-300"
                        onClick={() => router.push('/blog-new')}
                        style={{ backgroundColor: '#365842' }}
                        type="button"
                    >
                        Quay lại Blog
                    </button>
                </div>
            </div>
        );
    }

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
                <div className="container mx-auto px-4">
                    <div className="mx-auto max-w-4xl text-center">
                        <span className="mb-4 inline-block rounded-full bg-yellow-100 px-3 py-1 text-sm text-yellow-800">
                            {post.category}
                        </span>
                        <h1
                            className="mb-6 text-4xl font-bold md:text-5xl"
                            style={{ color: '#365842' }}
                        >
                            {post.title}
                        </h1>
                        <p className="mb-8 text-lg text-gray-600">
                            Ngày đăng: {post.date}
                        </p>
                        <button
                            className="inline-flex items-center text-gray-600 transition duration-300 hover:text-gray-800"
                            onClick={() => router.push('/blog-new')}
                            type="button"
                        >
                            <i className="fas fa-arrow-left mr-2" />
                            Quay lại danh sách
                        </button>
                    </div>
                </div>
            </section>

            {/* Main Content */}
            <main className="container mx-auto px-4 py-12">
                <div className="mx-auto max-w-4xl">
                    {/* Featured Image */}
                    <div className="mb-8">
                        <img
                            alt={post.title}
                            className="h-64 w-full rounded-2xl object-cover shadow-lg md:h-96"
                            src={post.image}
                        />
                    </div>

                    {/* Article Content */}
                    <article className="prose prose-lg max-w-none">
                        <div
                            className="leading-relaxed text-gray-700"
                            dangerouslySetInnerHTML={{ __html: post.content }}
                            style={{
                                fontSize: '16px',
                                lineHeight: '1.8',
                            }}
                        />
                    </article>

                    {/* Article Footer */}
                    <div className="mt-12 border-t border-gray-200 pt-8">
                        <div className="flex flex-col items-center justify-between md:flex-row">
                            <div className="mb-4 md:mb-0">
                                <span className="text-gray-600">
                                    Chia sẻ bài viết:
                                </span>
                                <div className="mt-2 flex space-x-4">
                                    <button
                                        aria-label="Chia sẻ trên Facebook"
                                        className="text-blue-600 transition duration-300 hover:text-blue-800"
                                        type="button"
                                    >
                                        <i className="fab fa-facebook-f text-xl" />
                                    </button>
                                    <button
                                        aria-label="Chia sẻ trên Twitter"
                                        className="text-blue-400 transition duration-300 hover:text-blue-600"
                                        type="button"
                                    >
                                        <i className="fab fa-twitter text-xl" />
                                    </button>
                                    <button
                                        aria-label="Chia sẻ trên WhatsApp"
                                        className="text-green-600 transition duration-300 hover:text-green-800"
                                        type="button"
                                    >
                                        <i className="fab fa-whatsapp text-xl" />
                                    </button>
                                </div>
                            </div>
                            <button
                                className="rounded-lg px-6 py-3 text-white transition duration-300"
                                onClick={() => router.push('/blog-new')}
                                style={{ backgroundColor: '#365842' }}
                                type="button"
                            >
                                Đọc thêm bài viết khác
                            </button>
                        </div>
                    </div>
                </div>
            </main>

            {/* Related Posts */}
            <section className="bg-gray-50 py-16">
                <div className="container mx-auto px-4">
                    <h2
                        className="mb-12 text-center text-3xl font-bold"
                        style={{ color: '#365842' }}
                    >
                        Bài viết liên quan
                    </h2>
                    <div className="mx-auto grid max-w-6xl gap-8 md:grid-cols-3">
                        {Object.values(blogPosts)
                            .filter((p) => p.id !== id)
                            .slice(0, 3)
                            .map((relatedPost) => (
                                <div
                                    className="cursor-pointer overflow-hidden rounded-xl bg-white shadow-lg transition-transform duration-300 hover:-translate-y-2 hover:shadow-2xl"
                                    key={relatedPost.id}
                                    onClick={() =>
                                        router.push(
                                            `/blog-new/${relatedPost.id}`
                                        )
                                    }
                                    onKeyDown={(e) =>
                                        e.key === 'Enter' &&
                                        router.push(
                                            `/blog-new/${relatedPost.id}`
                                        )
                                    }
                                    role="button"
                                    tabIndex={0}
                                >
                                    <img
                                        alt={relatedPost.title}
                                        className="h-48 w-full object-cover"
                                        src={relatedPost.image}
                                    />
                                    <div className="p-6">
                                        <span className="mb-3 inline-block rounded-full bg-blue-100 px-2 py-1 text-xs text-blue-800">
                                            {relatedPost.category}
                                        </span>
                                        <h3 className="mb-3 line-clamp-2 text-xl font-bold text-gray-800">
                                            {relatedPost.title}
                                        </h3>
                                        <span className="text-sm text-gray-500">
                                            {relatedPost.date}
                                        </span>
                                    </div>
                                </div>
                            ))}
                    </div>
                </div>
            </section>
        </div>
    );
};

BlogDetailPage.getLayout = function getLayout(page: React.ReactElement) {
    return <DefaultLayout>{page}</DefaultLayout>;
};

export default BlogDetailPage;
