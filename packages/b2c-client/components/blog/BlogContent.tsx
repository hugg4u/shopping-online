import React from 'react';
import { Layout, Pagination } from 'antd';
import BlogCard from './BlogCard';

const { Content } = Layout;

type Blog = {
    id: string;
    title: string;
    briefInfo: string;
    thumbnail: string;
    createdAt: string;
    category: string;
};

type BlogContentProps = {
    blogs: Blog[];
    total: number;
    currentPage: number;
    pageSize: number;
    onPageChange: (page: number, pageSize?: number) => void;
};

const BlogContent: React.FC<BlogContentProps> = ({
    blogs,
    total,
    currentPage,
    pageSize,
    onPageChange,
}) => {
    return (
        <Layout className="bg-white">
            <Content className="min-h-[280px] bg-white p-6">
                <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                    {blogs.map((blog) => (
                        <div className="flex justify-center" key={blog.id}>
                            <BlogCard {...blog} />
                        </div>
                    ))}
                </div>

                {total > 0 && (
                    <div className="mt-8 flex justify-center">
                        <Pagination
                            current={currentPage}
                            onChange={onPageChange}
                            pageSize={pageSize}
                            showQuickJumper
                            showSizeChanger
                            showTotal={(totalItems, range) =>
                                `${range[0]}-${range[1]} của ${totalItems} bài viết`
                            }
                            total={total}
                        />
                    </div>
                )}

                {blogs.length === 0 && (
                    <div className="py-16 text-center">
                        <div className="mb-4 text-6xl">📝</div>
                        <h3 className="mb-2 text-xl font-semibold text-gray-600">
                            Chưa có bài viết nào
                        </h3>
                        <p className="text-gray-500">
                            Hãy quay lại sau để đọc những bài viết mới nhất
                        </p>
                    </div>
                )}
            </Content>
        </Layout>
    );
};

export default BlogContent;
