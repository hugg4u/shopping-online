import React, { useCallback, useEffect, useState } from 'react';
import { useRouter } from 'next/router';

const NaturalBackgroundSection: React.FC = () => {
    const router = useRouter();
    const [scrollY, setScrollY] = useState(0);

    const updateScrollY = useCallback(() => {
        setScrollY(window.scrollY);
    }, []);

    useEffect(() => {
        let ticking = false;

        const requestTick = () => {
            if (!ticking) {
                requestAnimationFrame(() => {
                    updateScrollY();
                    ticking = false;
                });
                ticking = true;
            }
        };

        const handleScroll = () => requestTick();

        window.addEventListener('scroll', handleScroll, { passive: true });
        return () => window.removeEventListener('scroll', handleScroll);
    }, [updateScrollY]);

    // Parallax với scrollY trực tiếp - background di chuyển ngược chiều scroll
    const parallaxOffset = scrollY * 0.5;

    return (
        <div className="relative max-h-fit min-h-screen overflow-hidden">
            {/* Background image với parallax effect */}
            <div
                className="absolute inset-0 bg-cover bg-center bg-no-repeat will-change-transform"
                style={{
                    backgroundImage: 'url(/images/bg-tea.jpeg)',
                    transform: `translate3d(0, ${parallaxOffset}px, 0)`,
                    height: '150%',
                    top: '-100%',
                    width: '100%',
                }}
            />

            {/* Gradient overlay để text rõ ràng */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/60 via-black/50 to-black/70" />

            {/* Content chính */}
            <div className="relative z-10 flex min-h-screen items-center justify-center py-12 sm:py-16 lg:py-20">
                <div className="responsive-container text-center">
                    <div className="mx-auto max-w-5xl">
                        {/* Main title */}
                        <h2
                            className="mb-6 text-2xl font-bold leading-tight tracking-wide text-white drop-shadow-2xl sm:mb-8 sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl 2xl:text-7xl"
                            style={{
                                textShadow: '0 4px 8px rgba(0,0,0,0.8)',
                            }}
                        >
                            THƯƠNG THỨC HƯƠNG VỊ TRÀ
                            <br />
                            <span className="bg-gradient-to-r from-amber-300 via-yellow-400 to-amber-500 bg-clip-text text-transparent">
                                THƯỢNG HẠNG
                            </span>
                        </h2>

                        {/* Decorative line */}
                        <div className="mx-auto mb-8 flex items-center justify-center">
                            <div className="h-px w-16 bg-gradient-to-r from-transparent to-amber-400" />
                            <div className="h-px w-32 bg-gradient-to-r from-amber-400 via-yellow-500 to-amber-400" />
                            <div className="h-px w-16 bg-gradient-to-r from-amber-400 to-transparent" />
                        </div>

                        {/* Description */}
                        <div className="mx-auto max-w-5xl rounded-lg bg-black/30 p-4 backdrop-blur-sm sm:p-6 lg:p-8">
                            <p
                                className="mx-auto max-w-4xl text-base leading-relaxed text-gray-200 sm:text-lg md:text-xl lg:text-2xl"
                                style={{
                                    textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                                }}
                            >
                                Soma Tea mang đến những dòng trà thảo mộc thanh
                                nhiệt giải độc, chắt lọc từ nguồn nguyên liệu
                                tinh túy nhất, giúp cân bằng cơ thể, thư thái
                                tâm hồn, dẫn lối bạn đến với trải nghiệm trà độc
                                đáo và sâu sắc.
                            </p>
                        </div>

                        {/* Quote */}
                        <div className="mt-8 sm:mt-12">
                            <blockquote
                                className="text-lg italic text-amber-200 sm:text-xl md:text-2xl lg:text-3xl"
                                style={{
                                    textShadow: '0 2px 4px rgba(0,0,0,0.8)',
                                }}
                            >
                                &quot;Mỗi ngụm trà là một bước trở về với thiên
                                nhiên, an lành và nhẹ nhõm.&quot;
                            </blockquote>
                        </div>

                        {/* Call to Action */}
                        <div className="mt-12 sm:mt-16">
                            <button
                                className="group relative overflow-hidden rounded-full border-2 border-amber-400 bg-transparent px-6 py-3 text-base font-semibold text-amber-400 shadow-2xl transition-all duration-500 hover:border-amber-300 hover:text-stone-900 hover:shadow-amber-400/50 sm:px-8 sm:py-4 sm:text-lg lg:px-10 lg:py-5"
                                onClick={() => {
                                    router.push('/product');
                                }}
                                style={{
                                    backdropFilter: 'blur(10px)',
                                    background:
                                        'linear-gradient(135deg, rgba(200, 150, 95, 0.1) 0%, rgba(139, 105, 20, 0.1) 100%)',
                                }}
                                type="button"
                            >
                                <span className="absolute inset-0 -z-10 scale-0 bg-gradient-to-r from-amber-400 to-yellow-500 opacity-0 transition-transform duration-500 group-hover:scale-100 group-hover:opacity-100" />
                                <span className="relative z-10">
                                    Khám phá hương vị
                                </span>
                            </button>
                        </div>
                    </div>
                </div>
            </div>

            {/* Floating elements với parallax nhẹ */}
            <div
                className="absolute bottom-1/4 right-8 opacity-20 md:right-20"
                style={{
                    transform: `translate3d(${parallaxOffset * 0.3}px, ${parallaxOffset * 0.2}px, 0)`,
                    animation: 'float 12s ease-in-out infinite',
                }}
            >
            </div>

            <div
                className="absolute left-1/4 top-3/4 opacity-15"
                style={{
                    transform: `translate3d(${parallaxOffset * 0.1}px, ${parallaxOffset * 0.2}px, 0)`,
                    animation: 'float 10s ease-in-out infinite reverse',
                }}
            >
            </div>
        </div>
    );
};

export default NaturalBackgroundSection;
