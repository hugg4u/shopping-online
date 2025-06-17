import React, { useEffect, useRef, useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as request from '@shopping/common/utils/http-request';
import { QueryResponseType } from '@shopping/common/types';
import { Slider } from '@shopping/common/types/slider';
import { Spin } from 'antd';
import { Swiper, SwiperSlide } from 'swiper/react';
import Image from 'next/image';
import { cn } from '@shopping/common/utils';
import { Autoplay, Controller, Navigation, Pagination } from 'swiper/modules';
import type { Swiper as TypeSwiper } from 'swiper';
import { ArrowLeftSquare, ArrowRightSquare } from '@shopping/common/icons';
import { useRouter } from 'next/router';

const MainBanner = () => {
    const router = useRouter();

    const { data, isLoading } = useQuery<QueryResponseType<Slider>>({
        queryKey: ['slider'],
        queryFn: () => request.get('slider').then((res) => res.data),
    });

    const [currentSlice, setCurrentSlice] = useState<number>(1);
    const swiper1Ref = useRef<TypeSwiper>();
    const swiper2Ref = useRef<TypeSwiper>();

    useEffect(() => {
        if (data?.data && data?.data?.length > 0) {
            if (swiper1Ref.current) {
                swiper1Ref.current.controller.control = swiper2Ref.current;
            }
            if (swiper2Ref.current) {
                swiper2Ref.current.controller.control = swiper1Ref.current;
            }
        }
    }, [data?.data]);

    const redirectBackLink = (link: string) => {
        if (link) {
            if (link?.startsWith('https://') || link?.startsWith('http://')) {
                window.open(link, '_blank', 'noopener');
            } else router.push(link);
        }
    };

    if (data?.data?.length === 0) {
        return null;
    }

    return (
        <Spin spinning={isLoading}>
            <div
                className={cn(
                    'relative flex justify-center',
                    'h-[calc(100vh-80px)] max-h-[800px] min-h-[400px]' // Thêm min-height và max-height
                )}
                onMouseLeave={() => {
                    swiper1Ref.current?.autoplay?.start();
                    swiper2Ref.current?.autoplay?.start();
                }}
                onMouseMove={() => {
                    swiper1Ref.current?.autoplay?.stop();
                    swiper2Ref.current?.autoplay?.stop();
                }}
                style={{ backgroundColor: '#FAF6F0' }}
            >
                <Swiper
                    autoplay={{
                        delay: 6000,
                        disableOnInteraction: false,
                        pauseOnMouseEnter: true,
                    }}
                    className="w-full"
                    loop
                    modules={[Pagination, Controller, Navigation]}
                    onSlideChange={(e) => {
                        setCurrentSlice(
                            Number(e.realIndex) ? Number(e.realIndex) + 1 : 1
                        );
                    }}
                    onSwiper={(swiper) => {
                        swiper1Ref.current = swiper;
                    }}
                    preventInteractionOnTransition
                    slidesPerView={1}
                    speed={1000}
                    style={{
                        overflow: 'hidden',
                        width: '100%',
                        height: '100%',
                    }}
                >
                    {data?.data?.map((item) => (
                        <SwiperSlide
                            className="h-full"
                            key={item?.id}
                            onClick={() => {
                                redirectBackLink(item?.backlink ?? '/');
                            }}
                        >
                            <div className="relative flex h-full w-full cursor-pointer justify-center">
                                <div
                                    className="relative h-full w-full"
                                    id="background-banner"
                                    role="presentation"
                                    style={{
                                        backgroundColor:
                                            item?.backgroundSliderColor ??
                                            '#F5F1E8',
                                    }}
                                >
                                    <div className="absolute inset-0 z-10">
                                        <Image
                                            alt={item.title ?? ''}
                                            className="shadow-lg"
                                            fill
                                            priority
                                            quality={85}
                                            sizes="(max-width: 768px) 100vw, (max-width: 1200px) 100vw, 100vw"
                                            src={`${item.image}`}
                                            style={{
                                                objectFit: 'fill',
                                                objectPosition: 'center',
                                            }}
                                        />
                                    </div>
                                </div>
                            </div>
                        </SwiperSlide>
                    ))}
                </Swiper>

                {/* Content Swiper */}
                <div className="absolute z-10 grid h-full w-full max-w-[1200px] px-4 md:px-8">
                    <Swiper
                        autoplay={{
                            delay: 6000,
                            disableOnInteraction: false,
                            pauseOnMouseEnter: true,
                        }}
                        className="!relative !h-full !w-full"
                        loop
                        modules={[Controller, Navigation, Autoplay]}
                        onSwiper={(swiper) => {
                            swiper2Ref.current = swiper;
                        }}
                        speed={1000}
                    >
                        {data?.data?.map((item) => (
                            <SwiperSlide
                                key={item.id}
                                onClick={() => {
                                    redirectBackLink(item?.backlink ?? '/');
                                }}
                            >
                                <div className="animation-fade-in h-full cursor-pointer">
                                    <div
                                        className="flex h-full w-full items-center"
                                        role="presentation"
                                    >
                                        <div className="max-w-[800px]">
                                            <div
                                                className="text-2xl font-bold uppercase leading-[1.2] md:text-[32px] lg:text-[42px]"
                                                style={{
                                                    color:
                                                        item?.titleTextColor ??
                                                        '#3C2415',
                                                }}
                                            >
                                                {item?.title}
                                            </div>
                                            <div
                                                className="mt-4 text-xl font-bold leading-[1.2] md:text-[28px] lg:text-[36px]"
                                                style={{
                                                    color:
                                                        item?.noteTextColor ??
                                                        '#C8965F',
                                                }}
                                            >
                                                {item?.note}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </SwiperSlide>
                        ))}
                    </Swiper>
                </div>

                {/* Navigation Buttons */}
                <div className="absolute bottom-[24px] left-4 z-50 flex items-center md:left-[calc((100%-1200px)/2)]">
                    <div className="mr-[50px] flex space-x-[8px]">
                        <button
                            aria-label="Previous slide"
                            className="z-[10] h-[32px] w-[32px] cursor-pointer rounded-full border bg-[#C8965F] transition-all duration-300 hover:bg-[#A67B4F]"
                            onClick={() => swiper1Ref.current?.slidePrev()}
                            type="button"
                        >
                            <ArrowLeftSquare
                                background="none"
                                height="30px"
                                iconColor="#fff"
                                width="30px"
                            />
                        </button>

                        <button
                            aria-label="Next slide"
                            className="z-[10] h-[32px] w-[32px] cursor-pointer rounded-full border bg-[#C8965F] transition-all duration-300 hover:bg-[#A67B4F]"
                            onClick={() => swiper1Ref.current?.slideNext()}
                            type="button"
                        >
                            <ArrowRightSquare
                                background="none"
                                height="30px"
                                iconColor="#fff"
                                width="30px"
                            />
                        </button>
                    </div>
                    <div className="text-lg leading-[19px] text-[#3C2415]">
                        <span>{currentSlice}</span>
                        <span className="mx-1.5">/</span>
                        <span>{data?.data?.length}</span>
                    </div>
                </div>
            </div>
        </Spin>
    );
};

export default MainBanner;
