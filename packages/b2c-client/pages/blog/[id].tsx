/* eslint-disable react/no-danger */
import React, { useEffect, useState } from 'react';
import { Breadcrumb, Layout, Spin } from 'antd';
import { CalendarOutlined, TagOutlined, UserOutlined } from '@ant-design/icons';
import { useRouter } from 'next/router';
import { get } from 'common/utils/http-request';
import { getImageUrl } from 'common/utils/getImageUrl';
import Link from 'next/link';
import { getBlogCategoryName } from 'common/utils/getBlogCategoryName';

import Sidebar from '../../components/blog/Sidebar';

const { Content } = Layout;

type Blog = {
    id: string;
    title: string;
    description: string;
    briefInfo: string;
    thumbnail: string;
    updatedAt: string;
    createdAt: string;
    user: {
        name: string;
    };
    category: 'NEWS' | 'REVIEW';
};

const BlogDetailPage: React.FC = () => {
    const router = useRouter();
    const { id } = router.query;

    const [blog, setBlog] = useState<Blog | null>(null);
    const [isLoading, setIsLoading] = useState<boolean>(true);

    useEffect(() => {
        if (id) {
            get(`post-public/${id}`)
                .then((res) => {
                    setBlog(res.data.data);
                })
                .finally(() => {
                    setIsLoading(false);
                });
        }
    }, [id]);

    if (isLoading) {
        return <Spin spinning={isLoading} />;
    }

    return (
        <Layout className="mx-[80px] flex gap-8 overflow-hidden rounded-lg bg-transparent shadow-lg">
            <Sidebar isDetailPage />
            <Layout className="flex-1 rounded-r-lg bg-white">
                <Content className="min-h-[280px] bg-white p-8">
                    <Breadcrumb>
                        <Breadcrumb.Item>
                            <Link href="/">Trang chủ</Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>
                            <Link
                                href={{
                                    pathname: '/blog',
                                    query: {
                                        category: blog?.category,
                                    },
                                }}
                            >
                                {getBlogCategoryName(blog?.category, 'vi')}
                            </Link>
                        </Breadcrumb.Item>
                        <Breadcrumb.Item>{blog?.title}</Breadcrumb.Item>
                    </Breadcrumb>
                    <hr />
                    <br />
                    <h1 className="mb-6 text-4xl font-bold text-gray-800">
                        {blog?.title}
                    </h1>
                    <div className="mb-8 flex flex-wrap items-center gap-4 text-sm text-gray-600">
                        <span className="flex items-center gap-2">
                            <UserOutlined />
                            {blog?.user.name || 'Admin'}
                        </span>
                        <span className="flex items-center gap-2">
                            <CalendarOutlined />
                            {blog?.createdAt
                                ? new Date(blog.createdAt).toLocaleDateString()
                                : ''}
                        </span>
                        <span className="flex items-center gap-2">
                            <TagOutlined />
                            {getBlogCategoryName(blog?.category, 'vi')}
                        </span>
                    </div>

                    {blog?.thumbnail && (
                        <img
                            alt={blog?.title}
                            className="mb-8 w-full rounded-lg object-cover shadow-lg"
                            src={getImageUrl(blog?.thumbnail)}
                        />
                    )}

                    <div
                        className="prose prose-lg max-w-none"
                        dangerouslySetInnerHTML={{
                            __html: blog?.description || '',
                        }}
                    />
                </Content>
            </Layout>
        </Layout>
    );
};

export default BlogDetailPage;
/* eslint-enable react/no-danger */
