import React from 'react';
import { useRouter } from 'next/router';
import { DefaultLayout } from '../../components/layouts/default-layout';
import type { NextPageWithLayout } from '../_app';

// Mock data cho các bài viết
const blogPosts = {
    '1': {
        id: '1',
        title: 'Thả lỏng cơ thể và tâm trí với 1 tách trà thảo mộc mỗi ngày',
        category: 'Lối sống',
        date: '20/06/2025',
        image: '/images/thalong.jpg',
        content: `
            <p>Trong nhịp sống hối hả hiện đại, ai trong chúng ta cũng đôi lúc cảm thấy căng thẳng, mệt mỏi và cần một khoảnh khắc bình yên để "hít thở lại". Thay vì chạy theo các phương pháp chăm sóc sức khỏe phức tạp hay đắt đỏ, đôi khi chỉ cần một tách trà thảo mộc mỗi ngày cũng đủ để tạo nên sự khác biệt lớn cho cả cơ thể lẫn tâm trí.</p>
            
            <h2><strong>Trà thảo mộc – món quà từ thiên nhiên</strong></h2>
            <p>Trà thảo mộc không chỉ là một thức uống đơn thuần. Được pha chế từ các loại lá, hoa, vỏ cây và rễ thiên nhiên như hoa cúc, bạc hà, gừng, cam thảo hay lavender, mỗi tách trà mang trong mình những lợi ích trị liệu riêng biệt: giúp thư giãn hệ thần kinh, hỗ trợ tiêu hóa, cải thiện giấc ngủ, giảm viêm, giải độc… Tùy theo nhu cầu cá nhân, bạn có thể chọn loại trà phù hợp nhất với cơ thể mình.</p>
            
            <h2><strong>Khoảnh khắc thiền trong từng ngụm trà</strong></h2>
            <p>Khi pha trà, bạn không chỉ đơn thuần chuẩn bị một thức uống – bạn đang tạo ra một nghi lễ chăm sóc bản thân. Từng bước đun nước, chọn lá trà, chờ đợi nước rút hương… là quá trình bạn quay về với chính mình, tạm rời xa những lo toan bộn bề. Chỉ cần 10 phút mỗi ngày để nhâm nhi một tách trà ấm, tâm trí bạn sẽ được làm mới, tĩnh tại và sáng suốt hơn.</p>
            
            <h2><strong>Một thói quen nhỏ – Một sự thay đổi lớn</strong></h2>
            <p>Duy trì thói quen uống trà thảo mộc mỗi ngày không chỉ giúp cải thiện sức khỏe thể chất mà còn nâng cao sức khỏe tinh thần. Đó là lời nhắc nhở nhẹ nhàng rằng: bạn xứng đáng có một khoảng thời gian để chăm sóc chính mình – dù là giữa guồng quay công việc hay sau một ngày dài mệt nhoài.</p>
            
            <p>Hãy bắt đầu từ hôm nay. Một tách trà, một khoảnh khắc lặng yên, và một phiên bản bạn khỏe mạnh, an yên hơn đang chờ đón.</p>
        `,
    },
    '2': {
        id: '2',
        title: 'Bí Quyết Ngủ Ngon, Da Đẹp, Cơ Thể Nhẹ Nhàng Nhờ Trà Thảo Mộc',
        category: 'Sức khỏe',
        date: '20/06/2025',
        image: '/images/biquyet.jpg',
        content: `
            <p>Bạn có biết, giấc ngủ chất lượng không chỉ giúp tái tạo năng lượng mà còn là yếu tố then chốt trong việc cải thiện làn da và thanh lọc cơ thể? Trong nhiều năm làm việc trong lĩnh vực sức khỏe tự nhiên, tôi nhận thấy một giải pháp đơn giản nhưng cực kỳ hiệu quả – đó chính là trà thảo mộc.</p>
            
            <h2><strong>Vì sao trà thảo mộc lại được ưa chuộng đến vậy?</strong></h2>
            <p>Không chỉ đơn thuần là một loại thức uống, trà thảo mộc là sự kết hợp của các loại dược liệu tự nhiên có tác dụng hỗ trợ giấc ngủ, làm đẹp da và cân bằng cơ thể. Các loại thảo mộc như hoa cúc, bạc hà, tâm sen, lạc tiên, hoặc atiso đều đã được nghiên cứu và sử dụng trong y học cổ truyền lẫn hiện đại.</p>
            
            <h3><strong>1. Ngủ ngon nhờ cơ chế thư giãn tự nhiên</strong></h3>
            <p>Các hoạt chất trong hoa cúc và lạc tiên giúp an thần, làm dịu hệ thần kinh, hỗ trợ cơ thể đi vào giấc ngủ một cách tự nhiên mà không gây nghiện hay mệt mỏi vào sáng hôm sau – điều mà nhiều loại thuốc ngủ tổng hợp không làm được.</p>
            
            <h3><strong>2. Da đẹp hơn mỗi sáng nhờ giấc ngủ sâu</strong></h3>
            <p>Một giấc ngủ sâu và đủ sẽ thúc đẩy quá trình sản sinh collagen và hormone tăng trưởng – yếu tố then chốt giúp làn da phục hồi, sáng mịn và giảm mụn. Trà thảo mộc cũng có khả năng chống oxy hóa, giúp cơ thể loại bỏ gốc tự do – "kẻ thù" gây lão hóa da.</p>
            
            <h3><strong>3. Thanh lọc cơ thể, giảm cảm giác nặng nề</strong></h3>
            <p>Một số loại trà như atiso, rễ bồ công anh hoặc gừng hỗ trợ giải độc gan, lợi tiểu nhẹ và thúc đẩy quá trình trao đổi chất. Điều này không chỉ giúp cơ thể nhẹ nhàng hơn mà còn hỗ trợ kiểm soát cân nặng và cải thiện hệ tiêu hóa.</p>
            
            <h2><strong>Cách sử dụng hiệu quả</strong></h2>
            <ul>
                <li>Uống 1 tách trà ấm trước khi ngủ khoảng 30–60 phút</li>
                <li>Duy trì thói quen hàng ngày để đạt hiệu quả tối ưu</li>
                <li>Kết hợp cùng chế độ ăn lành mạnh và lối sống khoa học</li>
            </ul>
            
            <h2><strong>Kết luận</strong></h2>
            <p>Trà thảo mộc không chỉ là một thức uống thư giãn, mà còn là liệu pháp tự nhiên hỗ trợ giấc ngủ, làm đẹp và cải thiện sức khỏe tổng thể. Hãy bắt đầu từ một tách trà mỗi tối – đơn giản, nhẹ nhàng, nhưng hiệu quả lâu dài.</p>
        `,
    },
    '3': {
        id: '3',
        title: 'Trà thảo mộc: Liệu pháp tự nhiên giúp bạn cân bằng lại cuộc sống',
        category: 'Liệu pháp',
        date: '20/06/2025',
        image: '/images/trathaomoc.jpg',
        content: `
            <p>Trong nhịp sống hiện đại đầy áp lực, việc tìm kiếm sự cân bằng giữa công việc, gia đình và sức khỏe cá nhân đang trở thành ưu tiên của nhiều người. Với hơn 10 năm nghiên cứu và thực hành trong lĩnh vực dược liệu và liệu pháp tự nhiên, tôi nhận thấy trà thảo mộc không chỉ đơn thuần là một loại đồ uống – mà còn là một liệu pháp tinh thần và thể chất sâu sắc.</p>
            
            <h2><strong>Trà thảo mộc – không chỉ là thức uống, mà là nghệ thuật chăm sóc bản thân</strong></h2>
            <p>Trà thảo mộc có nguồn gốc từ thiên nhiên, được chiết xuất từ hoa, lá, rễ hoặc vỏ cây – mỗi loại mang trong mình một dược tính riêng biệt. Chẳng hạn, hoa cúc giúp an thần và cải thiện giấc ngủ; lá bạc hà hỗ trợ tiêu hóa; gừng tăng cường hệ miễn dịch và giảm viêm. Việc lựa chọn đúng loại trà theo nhu cầu cơ thể không chỉ cải thiện sức khỏe thể chất mà còn nuôi dưỡng tinh thần một cách tự nhiên và an toàn.</p>
            
            <h2><strong>Cân bằng cơ thể – bắt đầu từ những thói quen nhỏ</strong></h2>
            <p>Là một chuyên gia trong lĩnh vực trị liệu tự nhiên, tôi thường khuyên khách hàng bắt đầu hành trình chữa lành bằng những thay đổi nhỏ – như uống một ly trà thảo mộc mỗi ngày. Thói quen này có thể giúp cơ thể dần phục hồi nhịp sinh học, giải độc gan, giảm căng thẳng và cải thiện tâm trạng.</p>
            
            <p>Hãy tưởng tượng sau một ngày dài làm việc, bạn ngồi bên cửa sổ, tay cầm ly trà hoa nhài ấm áp, hít thở hương thơm dịu nhẹ. Khoảnh khắc đó chính là liệu pháp – một khoảng lặng quý giá giúp bạn kết nối lại với chính mình.</p>
            
            <h2><strong>Lời khuyên từ chúng tôi</strong></h2>
            <p>Nếu bạn đang tìm kiếm một phương pháp đơn giản để cải thiện chất lượng sống mà không cần dùng đến thuốc, trà thảo mộc là lựa chọn lý tưởng. Tuy nhiên, điều quan trọng là sự kiên trì và hiểu đúng về từng loại thảo mộc. Không phải loại trà nào cũng phù hợp với tất cả mọi người, và việc sử dụng cần được cá nhân hóa theo thể trạng và lối sống.</p>
            
            <h2><strong>Kết luận</strong></h2>
            <p>Trà thảo mộc không chỉ là xu hướng nhất thời – đó là sự trở về với tự nhiên, là cách để chúng ta tự chữa lành, tái tạo năng lượng và giữ vững sự bình an trong tâm hồn. Hãy để mỗi tách trà là một bước nhỏ trên hành trình tìm lại sự cân bằng và khỏe mạnh thực sự.</p>
        `,
    },
    '4': {
        id: '4',
        title: "Thức uống 'vàng' cho người bận rộn: Trà thảo mộc thanh lọc và thư giãn",
        category: 'Tiết kiệm thời gian',
        date: '20/06/2025',
        image: '/images/thucuongvang.jpg',
        content: `
            <p>Trong nhịp sống hiện đại hối hả, việc chăm sóc sức khỏe thường bị đặt sau những ưu tiên công việc, gia đình và các mối bận tâm thường nhật. Tuy nhiên, một trong những cách đơn giản và hiệu quả nhất để tái tạo năng lượng chính là tận dụng sức mạnh của thiên nhiên – đặc biệt là qua trà thảo mộc.</p>
            
            <h2><strong>Vì sao trà thảo mộc được ví như "thức uống vàng"?</strong></h2>
            <p>Với chuyên môn trong lĩnh vực sức khỏe tự nhiên và thảo dược học, tôi nhận thấy rằng trà thảo mộc không chỉ là một món uống thông thường. Nó là sự kết hợp tinh tế giữa khoa học sức khỏe cổ truyền và lối sống hiện đại, mang lại nhiều lợi ích nổi bật:</p>
            
            <ul>
                <li><strong>Thanh lọc cơ thể:</strong> Các loại thảo mộc như atiso, cam thảo, gừng hoặc bạc hà giúp hỗ trợ chức năng gan, thúc đẩy quá trình thải độc và giảm cảm giác nặng nề sau một ngày dài.</li>
                <li><strong>Thư giãn tinh thần:</strong> Hoa cúc, oải hương và lá sen có tác dụng làm dịu hệ thần kinh, giảm căng thẳng và hỗ trợ giấc ngủ tự nhiên.</li>
                <li><strong>Tăng sức đề kháng:</strong> Với đặc tính kháng khuẩn và chống oxy hóa, trà thảo mộc còn giúp cơ thể tăng cường miễn dịch, đặc biệt quan trọng trong giai đoạn thời tiết thay đổi thất thường.</li>
            </ul>
            
            <h2><strong>Dành cho người bận rộn – nhưng vẫn muốn khỏe mạnh</strong></h2>
            <p>Là một chuyên gia từng làm việc với hàng trăm khách hàng là nhân viên văn phòng, doanh nhân, hoặc phụ huynh bận rộn, tôi nhận thấy trà thảo mộc chính là lựa chọn lý tưởng vì:</p>
            
            <ul>
                <li><strong>Dễ pha, dễ uống:</strong> Chỉ cần 5 phút mỗi ngày, bạn đã có một tách trà thơm ngon, đầy dưỡng chất.</li>
                <li><strong>Không caffeine:</strong> Không gây nghiện, không làm bạn mất ngủ như cà phê.</li>
                <li><strong>Mang tính cá nhân hóa:</strong> Có thể chọn loại trà phù hợp với cơ địa hoặc mục tiêu sức khỏe cá nhân.</li>
            </ul>
            
            <h2><strong>Gợi ý cách dùng hiệu quả</strong></h2>
            <ul>
                <li><strong>Sáng sớm:</strong> Dùng trà gừng hoặc trà atiso để khởi động tiêu hóa.</li>
                <li><strong>Buổi chiều:</strong> Trà bạc hà giúp tỉnh táo mà không gây bồn chồn.</li>
                <li><strong>Tối:</strong> Trà hoa cúc hoặc oải hương để dễ đi vào giấc ngủ sâu.</li>
            </ul>
            
            <h2><strong>Kết luận</strong></h2>
            <p>Trà thảo mộc không chỉ là một món uống mà còn là một phương pháp chăm sóc sức khỏe chủ động – đặc biệt phù hợp với người bận rộn, mong muốn sống chậm lại mà không mất đi nhịp độ công việc. Hãy để mỗi tách trà là một khoảng lặng, nơi bạn kết nối với chính mình và hồi phục từ bên trong.</p>
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
