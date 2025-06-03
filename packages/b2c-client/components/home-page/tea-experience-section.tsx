import React from 'react';
import Image from 'next/image';

const TeaExperienceSection: React.FC = () => {
    const teaExperiences = [
        {
            id: 1,
            number: '01',
            title: 'THANH LỌC CƠ THỂ',
            description:
                'Có những mệt mỏi không hiện hình, chỉ khi lặng lại mới cảm được. Một tách trà thảo mộc dịu nhẹ – như dòng suối mát lành chảy qua từng tế bào, âm thầm cuốn trôi cái nóng, cái gắt, cái mệt của những bộn bề thường nhật.',
            image: 'images/tea-experience-1.jpg',
        },
        {
            id: 2,
            number: '02',
            title: 'GIẢI ĐỘC TỰ NHIÊN',
            description:
                'Cơ thể không cần phải gồng mình để khỏe. Nó chỉ cần được yêu thương đúng cách. Somma Tea là sự kết hợp của những lá, hoa và rễ – thứ mà thiên nhiên đã tạo ra để nâng đỡ cơ thể người – một cách tự nhiên, hiền hậu và bền bỉ.',
            image: 'images/tea-experience-2.jpg',
        },
        {
            id: 3,
            number: '03',
            title: 'NUÔI DƯỠNG AN YÊN',
            description:
                'Trong một thế giới ồn ào, đôi khi chỉ cần một khoảnh khắc ngồi yên bên tách trà. Không vội, không phải cố gắng, chỉ là được là chính mình – nhẹ nhàng, an yên, và đủ đầy.',
            image: 'images/tea-experience-3.jpg',
        },
    ];

    return (
        <div className="container mx-auto px-4">
            {/* Tiêu đề chính */}
            <div className="mb-16 text-center">
                <h2
                    className="mb-6 text-3xl font-bold tracking-widest md:text-4xl"
                    style={{ color: '#3C2415' }}
                >
                    THƯỞNG TRÀ THEO CÁCH CỦA RIÊNG BẠN
                </h2>
                <div
                    className="mx-auto h-1 w-24"
                    style={{ backgroundColor: '#C8965F' }}
                />
            </div>

            {/* Grid 3 cột */}
            <div className="mx-auto grid max-w-6xl grid-cols-1 gap-12 md:grid-cols-3">
                {teaExperiences.map((experience) => (
                    <div
                        className="group cursor-pointer text-center"
                        key={experience.id}
                    >
                        {/* Hình ảnh */}
                        <div className="relative mb-6 overflow-hidden rounded-lg shadow-lg transition-all duration-300 group-hover:shadow-xl">
                            <div className="relative aspect-[4/3]">
                                <Image
                                    alt={experience.title}
                                    className="object-cover transition-transform duration-500 group-hover:scale-105"
                                    fill
                                    src={experience.image}
                                />
                            </div>
                        </div>

                        {/* Nội dung */}
                        <div className="text-center">
                            <div className="flex items-end space-x-4">
                                <p
                                    className="text-5xl font-bold italic leading-none text-white"
                                    style={{
                                        color: '#C8965F',
                                        fontFamily: 'Merriweather,serif',
                                    }}
                                >
                                    {experience.number}
                                </p>
                                <h3
                                    className="mb-1 text-xl font-bold tracking-wider md:text-2xl"
                                    style={{
                                        color: '#3C2415',
                                    }}
                                >
                                    {experience.title}
                                </h3>
                            </div>
                            <p
                                className="text-left text-base leading-relaxed md:text-lg"
                                style={{ color: '#6B5B4F' }}
                            >
                                {experience.description}
                            </p>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default TeaExperienceSection;
