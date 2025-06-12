import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();

const knowledgeBaseData = [
    // Product Information
    {
        question: 'Bạn có những loại sản phẩm gì?',
        answer: 'Chúng tôi chuyên cung cấp các sản phẩm thời trang chất lượng cao bao gồm: áo thun, áo sơ mi, quần jeans, váy, giày dép, và các phụ kiện thời trang. Tất cả sản phẩm đều được tuyển chọn kỹ lưỡng về chất lượng và thiết kế.',
        category: 'PRODUCT_INFO',
        keywords: 'sản phẩm, loại, thời trang, áo, quần, giày, phụ kiện',
        priority: 5,
    },
    {
        question: 'Làm sao để tìm sản phẩm phù hợp với tôi?',
        answer: 'Bạn có thể sử dụng tính năng tìm kiếm và lọc sản phẩm theo: thương hiệu, danh mục, kích cỡ, giá cả. Ngoài ra, chúng tôi có tính năng gợi ý sản phẩm dựa trên lịch sử mua hàng và sở thích của bạn.',
        category: 'PRODUCT_INFO',
        keywords: 'tìm kiếm, lọc, gợi ý, phù hợp, kích cỡ, giá',
        priority: 4,
    },
    {
        question: 'Sản phẩm có chính hãng không?',
        answer: 'Tất cả sản phẩm trên website đều là chính hãng 100%. Chúng tôi cam kết chỉ bán những sản phẩm authentic và có nguồn gốc xuất xứ rõ ràng. Mọi sản phẩm đều có tem, nhãn mác đầy đủ.',
        category: 'PRODUCT_INFO',
        keywords: 'chính hãng, authentic, nguồn gốc, tem nhãn, cam kết',
        priority: 5,
    },

    // Order Status
    {
        question: 'Làm sao để kiểm tra trạng thái đơn hàng?',
        answer: 'Bạn có thể kiểm tra trạng thái đơn hàng bằng cách: 1) Đăng nhập vào tài khoản và vào mục "Đơn hàng của tôi", 2) Sử dụng mã đơn hàng để tra cứu, 3) Liên hệ hotline để được hỗ trợ.',
        category: 'ORDER_STATUS',
        keywords: 'kiểm tra, trạng thái, đơn hàng, mã đơn hàng, tra cứu',
        priority: 5,
    },
    {
        question: 'Tôi muốn hủy đơn hàng thì làm sao?',
        answer: 'Bạn có thể hủy đơn hàng khi đơn hàng còn ở trạng thái "Chờ xác nhận" hoặc "Đã xác nhận". Vào mục "Đơn hàng của tôi" và chọn "Hủy đơn hàng". Nếu đơn hàng đã được giao cho đơn vị vận chuyển, vui lòng liên hệ hotline.',
        category: 'ORDER_STATUS',
        keywords: 'hủy đơn hàng, chờ xác nhận, hotline, vận chuyển',
        priority: 4,
    },

    // Shipping
    {
        question: 'Thời gian giao hàng là bao lâu?',
        answer: 'Thời gian giao hàng phụ thuộc vào khu vực: - Nội thành Hà Nội/HCM: 1-2 ngày - Tỉnh thành khác: 2-4 ngày - Vùng sâu vùng xa: 3-7 ngày. Chúng tôi sẽ thông báo chi tiết khi xác nhận đơn hàng.',
        category: 'SHIPPING',
        keywords: 'thời gian giao hàng, nội thành, tỉnh thành, vùng xa',
        priority: 5,
    },
    {
        question: 'Phí vận chuyển là bao nhiêu?',
        answer: 'Phí vận chuyển được tính theo khu vực: - Nội thành: 20,000đ - Ngoại thành: 30,000đ - Tỉnh thành khác: 35,000đ. MIỄN PHÍ vận chuyển cho đơn hàng từ 500,000đ trở lên.',
        category: 'SHIPPING',
        keywords: 'phí vận chuyển, miễn phí, nội thành, ngoại thành',
        priority: 4,
    },

    // Payment
    {
        question: 'Tôi có thể thanh toán bằng những hình thức nào?',
        answer: 'Chúng tôi hỗ trợ các hình thức thanh toán: 1) Thanh toán khi nhận hàng (COD), 2) Chuyển khoản ngân hàng, 3) Ví điện tử (MoMo, ZaloPay), 4) Thẻ tín dụng/ghi nợ qua cổng thanh toán an toàn.',
        category: 'PAYMENT',
        keywords: 'thanh toán, COD, chuyển khoản, ví điện tử, thẻ tín dụng',
        priority: 5,
    },
    {
        question: 'Thanh toán khi nhận hàng có an toàn không?',
        answer: 'Thanh toán khi nhận hàng (COD) hoàn toàn an toàn. Bạn chỉ thanh toán khi đã nhận được hàng và kiểm tra sản phẩm. Nếu không hài lòng, bạn có thể từ chối nhận hàng.',
        category: 'PAYMENT',
        keywords: 'COD, an toàn, kiểm tra, từ chối nhận hàng',
        priority: 4,
    },

    // Return Policy
    {
        question: 'Chính sách đổi trả như thế nào?',
        answer: 'Chính sách đổi trả của chúng tôi: - Thời gian: trong vòng 7 ngày kể từ khi nhận hàng - Điều kiện: sản phẩm còn nguyên tem mác, chưa qua sử dụng - Miễn phí đổi trả với lỗi từ nhà sản xuất - Khách hàng chịu phí ship đối với trường hợp đổi size/màu.',
        category: 'RETURN_POLICY',
        keywords: 'đổi trả, 7 ngày, tem mác, lỗi nhà sản xuất, phí ship',
        priority: 5,
    },
    {
        question: 'Tôi muốn đổi size thì làm sao?',
        answer: 'Để đổi size, bạn liên hệ hotline trong vòng 7 ngày kể từ khi nhận hàng. Sản phẩm cần còn nguyên tem mác, chưa qua sử dụng. Bạn sẽ chịu phí vận chuyển cho việc đổi size.',
        category: 'RETURN_POLICY',
        keywords: 'đổi size, hotline, 7 ngày, tem mác, phí vận chuyển',
        priority: 4,
    },

    // General Support
    {
        question: 'Làm sao để liên hệ với bộ phận hỗ trợ?',
        answer: 'Bạn có thể liên hệ với chúng tôi qua: - Hotline: 1900-xxxx (8h-22h hàng ngày) - Email: support@example.com - Chat trực tuyến trên website - Fanpage Facebook. Chúng tôi luôn sẵn sàng hỗ trợ bạn!',
        category: 'GENERAL',
        keywords: 'liên hệ, hotline, email, chat, facebook, hỗ trợ',
        priority: 5,
    },
    {
        question: 'Tôi quên mật khẩu thì làm sao?',
        answer: 'Để khôi phục mật khẩu: 1) Vào trang đăng nhập, 2) Chọn "Quên mật khẩu", 3) Nhập email đăng ký, 4) Kiểm tra email và làm theo hướng dẫn để tạo mật khẩu mới.',
        category: 'TECHNICAL_SUPPORT',
        keywords: 'quên mật khẩu, khôi phục, email, đăng nhập',
        priority: 4,
    },
    {
        question: 'Website bị lỗi, tôi không thể đặt hàng?',
        answer: 'Nếu gặp sự cố kỹ thuật: 1) Thử làm mới trang (F5), 2) Xóa cache trình duyệt, 3) Thử trên trình duyệt khác, 4) Kiểm tra kết nối internet. Nếu vẫn không được, vui lòng liên hệ hotline để được hỗ trợ đặt hàng.',
        category: 'TECHNICAL_SUPPORT',
        keywords: 'lỗi website, không đặt hàng, làm mới, cache, hotline',
        priority: 3,
    },
];

async function seedChatbotKnowledge() {
    console.log('Starting to seed chatbot knowledge base...');

    try {
        // Clear existing knowledge base
        await prisma.chatKnowledgeBase.deleteMany();
        console.log('Cleared existing knowledge base');

        // Create new knowledge base entries
        for (const entry of knowledgeBaseData) {
            await prisma.chatKnowledgeBase.create({
                data: entry,
            });
        }

        console.log(
            `Successfully seeded ${knowledgeBaseData.length} knowledge base entries`
        );
    } catch (error) {
        console.error('Error seeding chatbot knowledge base:', error);
        throw error;
    }
}

// Only run if this file is executed directly
if (require.main === module) {
    seedChatbotKnowledge()
        .then(() => {
            console.log('Chatbot knowledge base seeded successfully');
            process.exit(0);
        })
        .catch((error) => {
            console.error('Failed to seed chatbot knowledge base:', error);
            process.exit(1);
        })
        .finally(async () => {
            await prisma.$disconnect();
        });
}

export { seedChatbotKnowledge };
