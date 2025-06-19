export const getImageUrl = (imagePath?: string) => {
    if (!imagePath) return '';

    // Nếu đường dẫn bắt đầu bằng http hoặc https, đó là URL đầy đủ
    if (imagePath?.startsWith('http://') || imagePath?.startsWith('https://')) {
        return imagePath;
    }

    // Nếu đường dẫn bắt đầu bằng /public, đó là ảnh từ server local
    if (imagePath?.startsWith('/public')) {
        // Lấy domain của API từ biến môi trường hoặc cấu hình
        const apiUrl = 'https://1113--main--hungpc--hung.coder1.hirogo-dev.com';
        return `${apiUrl}${imagePath}`;
    }

    // Trường hợp khác, trả về đường dẫn gốc
    return imagePath;
};
