import React, { useRef, useState, useEffect } from 'react';
import Link from 'next/link';

// Định nghĩa kiểu dữ liệu cho tin tức
type NewsItem = {
  title: string;
  description: string;
  image: string;
  url: string;
};

// Props cho component
type NewsPreviewProps = {
  newsItems: NewsItem[];
};

const NewsPreview: React.FC<NewsPreviewProps> = ({ newsItems }) => {
  const scrollContainerRef = useRef<HTMLDivElement>(null);
  const [showLeftArrow, setShowLeftArrow] = useState(false);
  const [showRightArrow, setShowRightArrow] = useState(true);

  // Kiểm tra vị trí cuộn để hiển thị/ẩn các nút điều hướng
  const checkScrollPosition = () => {
    if (!scrollContainerRef.current) return;
    
    const { scrollLeft, scrollWidth, clientWidth } = scrollContainerRef.current;
    
    // Hiển thị nút trái khi đã cuộn sang phải
    setShowLeftArrow(scrollLeft > 0);
    
    // Hiển thị nút phải khi chưa cuộn hết sang phải
    // Thêm một khoảng dung sai nhỏ (5px) để xử lý làm tròn số
    setShowRightArrow(scrollLeft + clientWidth < scrollWidth - 5);
  };

  // Thiết lập sự kiện kiểm tra vị trí cuộn
  useEffect(() => {
    const scrollContainer = scrollContainerRef.current;
    if (scrollContainer) {
      scrollContainer.addEventListener('scroll', checkScrollPosition);
      // Kiểm tra ngay sau khi component được render
      checkScrollPosition();
      
      // Kiểm tra lại sau khi tất cả hình ảnh đã được tải
      window.addEventListener('load', checkScrollPosition);
      
      return () => {
        scrollContainer.removeEventListener('scroll', checkScrollPosition);
        window.removeEventListener('load', checkScrollPosition);
      };
    }
  }, []);

  const scrollLeft = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: -350, // Khoảng cách scroll, tương đương với chiều rộng của một card
        behavior: 'smooth'
      });
    }
  };

  const scrollRight = () => {
    if (scrollContainerRef.current) {
      scrollContainerRef.current.scrollBy({
        left: 350, // Khoảng cách scroll, tương đương với chiều rộng của một card
        behavior: 'smooth'
      });
    }
  };

  return (
    <div className="w-full py-8 container">
      <div className="mb-12 text-center sm:mb-16">
        <h2
            className="responsive-title mb-4 tracking-widest sm:mb-6"
            style={{ color: '#365842' }}
        >
            TIN TỨC VỀ TRÀ
        </h2>
        <div
            className="mx-auto h-1 w-24"
            style={{ backgroundColor: '#365842' }}
        />
      </div>
      
      {/* Container với các nút điều hướng */}
      <div className="relative px-10">
        {/* Nút mũi tên trái - chỉ hiển thị khi có thể cuộn về bên trái */}
        {showLeftArrow && (
          <button 
            onClick={scrollLeft}
            className="absolute -left-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition-all hover:bg-gray-100"
            aria-label="Scroll left"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-gray-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
            </svg>
          </button>
        )}
        
        {/* Container với overflow-x-auto để scroll ngang */}
        <div 
          ref={scrollContainerRef}
          className="flex w-full overflow-x-auto pb-4" 
          style={{ 
            scrollbarWidth: 'none', /* Firefox */
            msOverflowStyle: 'none', /* IE and Edge */
            scrollBehavior: 'smooth'
          }}
        >
          {/* Ẩn thanh cuộn cho Chrome, Safari và Opera */}
          <style jsx>{`
            div::-webkit-scrollbar {
              display: none;
            }
          `}</style>
          
          <div className="flex gap-8 pb-2">
            {newsItems.map((item, index) => (
              <Link
                href={item.url}
                key={index}
                target="_blank"
                rel="noopener noreferrer"
                className="flex min-w-[330px] max-w-[380px] flex-col overflow-hidden rounded-xl border border-gray-200 bg-white shadow-md transition-all hover:-translate-y-1 hover:shadow-lg"
              >
                {item.image && (
                  <div className="h-64 overflow-hidden">
                    <img
                      src={item.image}
                      alt={item.title}
                      className="h-full w-full object-cover transition-transform hover:scale-105"
                      onError={(e) => {
                        // Fallback nếu hình ảnh không tải được
                        e.currentTarget.src = '/images/blog-default.jpg';
                      }}
                      onLoad={checkScrollPosition} // Kiểm tra lại vị trí cuộn sau khi hình ảnh được tải
                    />
                  </div>
                )}
                <div className="flex flex-1 flex-col p-5">
                  <h3 className="mb-3 text-xl font-bold text-gray-800" style={{ color: '#365842' }}>{item.title}</h3>
                  <div className="mb-4 text-sm text-gray-600" style={{ maxHeight: '250px', overflow: 'auto' }}>
                    {item.description}
                  </div>
                  <div className="mt-auto pt-3 border-t border-gray-100">
                    <span className="inline-flex items-center text-sm font-medium" style={{ color: '#365842' }}>
                      Đọc thêm
                      <svg className="ml-1 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 5l7 7-7 7"></path>
                      </svg>
                    </span>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </div>
        
        {/* Nút mũi tên phải - chỉ hiển thị khi có thể cuộn sang phải */}
        {showRightArrow && (
          <button 
            onClick={scrollRight}
            className="absolute -right-2 top-1/2 z-10 -translate-y-1/2 rounded-full bg-white p-2 shadow-md transition-all hover:bg-gray-100"
            aria-label="Scroll right"
          >
            <svg 
              xmlns="http://www.w3.org/2000/svg" 
              className="h-6 w-6 text-gray-600" 
              fill="none" 
              viewBox="0 0 24 24" 
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </button>
        )}
      </div>
    </div>
  );
};

export default NewsPreview; 
