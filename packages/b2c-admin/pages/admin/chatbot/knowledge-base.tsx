import React, { useState } from 'react';
import {
    Button,
    Card,
    Form,
    Input,
    InputNumber,
    message,
    Modal,
    Popconfirm,
    Select,
    Space,
    Table,
    Tag,
} from 'antd';
import {
    DeleteOutlined,
    EditOutlined,
    PlusOutlined,
    SearchOutlined,
} from '@ant-design/icons';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import * as request from '@shopping/common/utils/http-request';
import AdminLayout from '~/components/layouts/admin-layout';
import type { NextPageWithLayout } from '~/pages/_app';

const { TextArea } = Input;
const { Option } = Select;

interface KnowledgeBase {
    id: string;
    question: string;
    answer: string;
    category: string;
    keywords: string;
    priority: number;
    isActive: boolean;
    createdAt: string;
    updatedAt: string;
}

const categories = [
    { value: 'PRODUCT_INFO', label: 'Thông tin sản phẩm', color: 'blue' },
    { value: 'ORDER_STATUS', label: 'Trạng thái đơn hàng', color: 'orange' },
    { value: 'SHIPPING', label: 'Vận chuyển', color: 'green' },
    { value: 'PAYMENT', label: 'Thanh toán', color: 'purple' },
    { value: 'RETURN_POLICY', label: 'Chính sách đổi trả', color: 'red' },
    { value: 'GENERAL', label: 'Hỗ trợ chung', color: 'default' },
    { value: 'TECHNICAL_SUPPORT', label: 'Hỗ trợ kỹ thuật', color: 'cyan' },
];

const KnowledgeBasePage: NextPageWithLayout = () => {
    const [form] = Form.useForm();
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [editingRecord, setEditingRecord] = useState<KnowledgeBase | null>(
        null
    );
    const [searchText, setSearchText] = useState('');
    const [selectedCategory, setSelectedCategory] = useState<
        string | undefined
    >();

    const queryClient = useQueryClient();

    // Fetch knowledge base
    const { data: knowledgeData, isLoading } = useQuery({
        queryKey: ['chatbot-knowledge', selectedCategory],
        queryFn: () => {
            const params = new URLSearchParams();
            if (selectedCategory) params.append('category', selectedCategory);
            return request
                .get(`chatbot/knowledge?${params.toString()}`)
                .then((res) => res.data);
        },
    });

    // Create/Update knowledge base entry
    const { mutate: saveKnowledge, isPending: savePending } = useMutation({
        mutationFn: (data: any) => {
            if (editingRecord) {
                return request.put(
                    `chatbot/knowledge/${editingRecord.id}`,
                    data
                );
            }
            return request.post('chatbot/knowledge', data);
        },
        onSuccess: () => {
            message.success(
                editingRecord ? 'Cập nhật thành công!' : 'Tạo mới thành công!'
            );
            queryClient.invalidateQueries({ queryKey: ['chatbot-knowledge'] });
            handleModalClose();
        },
        onError: () => {
            message.error('Có lỗi xảy ra, vui lòng thử lại!');
        },
    });

    // Delete knowledge base entry
    const { mutate: deleteKnowledge } = useMutation({
        mutationFn: (id: string) => request.delete(`chatbot/knowledge/${id}`),
        onSuccess: () => {
            message.success('Xóa thành công!');
            queryClient.invalidateQueries({ queryKey: ['chatbot-knowledge'] });
        },
        onError: () => {
            message.error('Có lỗi xảy ra khi xóa!');
        },
    });

    const handleModalClose = () => {
        setIsModalVisible(false);
        setEditingRecord(null);
        form.resetFields();
    };

    const handleEdit = (record: KnowledgeBase) => {
        setEditingRecord(record);
        form.setFieldsValue(record);
        setIsModalVisible(true);
    };

    const handleSubmit = (values: any) => {
        saveKnowledge(values);
    };

    const getCategoryInfo = (category: string) => {
        return (
            categories.find((cat) => cat.value === category) || {
                label: category,
                color: 'default',
            }
        );
    };

    const filteredData = knowledgeData?.data?.filter((item: KnowledgeBase) => {
        if (!searchText) return true;
        return (
            item.question.toLowerCase().includes(searchText.toLowerCase()) ||
            item.answer.toLowerCase().includes(searchText.toLowerCase()) ||
            item.keywords.toLowerCase().includes(searchText.toLowerCase())
        );
    });

    const columns = [
        {
            title: 'Câu hỏi',
            dataIndex: 'question',
            key: 'question',
            width: '25%',
            render: (text: string) => (
                <div style={{ maxWidth: 200, wordWrap: 'break-word' }}>
                    {text}
                </div>
            ),
        },
        {
            title: 'Câu trả lời',
            dataIndex: 'answer',
            key: 'answer',
            width: '30%',
            render: (text: string) => (
                <div style={{ maxWidth: 250, wordWrap: 'break-word' }}>
                    {text.length > 100 ? `${text.substring(0, 100)}...` : text}
                </div>
            ),
        },
        {
            title: 'Danh mục',
            dataIndex: 'category',
            key: 'category',
            width: '15%',
            render: (category: string) => {
                const categoryInfo = getCategoryInfo(category);
                return (
                    <Tag color={categoryInfo.color}>{categoryInfo.label}</Tag>
                );
            },
        },
        {
            title: 'Từ khóa',
            dataIndex: 'keywords',
            key: 'keywords',
            width: '15%',
            render: (keywords: string) => (
                <div
                    style={{
                        maxWidth: 150,
                        wordWrap: 'break-word',
                        fontSize: '12px',
                    }}
                >
                    {keywords}
                </div>
            ),
        },
        {
            title: 'Độ ưu tiên',
            dataIndex: 'priority',
            key: 'priority',
            width: '10%',
            render: (priority: number) => (
                <Tag
                    color={
                        priority >= 4
                            ? 'red'
                            : priority >= 3
                              ? 'orange'
                              : 'default'
                    }
                >
                    {priority}
                </Tag>
            ),
        },
        {
            title: 'Hành động',
            key: 'actions',
            width: '15%',
            render: (_, record: KnowledgeBase) => (
                <Space>
                    <Button
                        icon={<EditOutlined />}
                        onClick={() => handleEdit(record)}
                        size="small"
                        type="primary"
                    >
                        Sửa
                    </Button>
                    <Popconfirm
                        cancelText="Hủy"
                        description="Bạn có chắc chắn muốn xóa mục này không?"
                        okText="Xóa"
                        onConfirm={() => deleteKnowledge(record.id)}
                        title="Xác nhận xóa?"
                    >
                        <Button
                            danger
                            icon={<DeleteOutlined />}
                            size="small"
                            type="primary"
                        >
                            Xóa
                        </Button>
                    </Popconfirm>
                </Space>
            ),
        },
    ];

    return (
        <div style={{ padding: '24px' }}>
            <Card
                extra={
                    <Button
                        icon={<PlusOutlined />}
                        onClick={() => setIsModalVisible(true)}
                        type="primary"
                    >
                        Thêm mới
                    </Button>
                }
                title="Quản lý Cơ sở Kiến thức Chatbot"
            >
                {/* Filters */}
                <div style={{ marginBottom: 16, display: 'flex', gap: 16 }}>
                    <Input
                        onChange={(e) => setSearchText(e.target.value)}
                        placeholder="Tìm kiếm theo câu hỏi, câu trả lời, từ khóa..."
                        prefix={<SearchOutlined />}
                        style={{ width: 300 }}
                        value={searchText}
                    />
                    <Select
                        allowClear
                        onChange={setSelectedCategory}
                        placeholder="Lọc theo danh mục"
                        style={{ width: 200 }}
                        value={selectedCategory}
                    >
                        {categories.map((cat) => (
                            <Option key={cat.value} value={cat.value}>
                                {cat.label}
                            </Option>
                        ))}
                    </Select>
                </div>

                {/* Table */}
                <Table
                    columns={columns}
                    dataSource={filteredData}
                    loading={isLoading}
                    pagination={{
                        pageSize: 10,
                        showSizeChanger: true,
                        showQuickJumper: true,
                        showTotal: (total) => `Tổng ${total} mục`,
                    }}
                    rowKey="id"
                    size="middle"
                />
            </Card>

            {/* Modal for Create/Edit */}
            <Modal
                footer={null}
                onCancel={handleModalClose}
                open={isModalVisible}
                title={
                    editingRecord ? 'Chỉnh sửa kiến thức' : 'Thêm kiến thức mới'
                }
                width={800}
            >
                <Form form={form} layout="vertical" onFinish={handleSubmit}>
                    <Form.Item
                        label="Câu hỏi"
                        name="question"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập câu hỏi!',
                            },
                        ]}
                    >
                        <TextArea placeholder="Nhập câu hỏi..." rows={2} />
                    </Form.Item>

                    <Form.Item
                        label="Câu trả lời"
                        name="answer"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập câu trả lời!',
                            },
                        ]}
                    >
                        <TextArea placeholder="Nhập câu trả lời..." rows={4} />
                    </Form.Item>

                    <Form.Item
                        label="Danh mục"
                        name="category"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng chọn danh mục!',
                            },
                        ]}
                    >
                        <Select placeholder="Chọn danh mục">
                            {categories.map((cat) => (
                                <Option key={cat.value} value={cat.value}>
                                    {cat.label}
                                </Option>
                            ))}
                        </Select>
                    </Form.Item>

                    <Form.Item
                        label="Từ khóa (phân cách bằng dấu phẩy)"
                        name="keywords"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập từ khóa!',
                            },
                        ]}
                    >
                        <TextArea
                            placeholder="ví dụ: sản phẩm, thời trang, áo, quần..."
                            rows={2}
                        />
                    </Form.Item>

                    <Form.Item
                        initialValue={3}
                        label="Độ ưu tiên (1-5)"
                        name="priority"
                        rules={[
                            {
                                required: true,
                                message: 'Vui lòng nhập độ ưu tiên!',
                            },
                        ]}
                    >
                        <InputNumber
                            max={5}
                            min={1}
                            style={{ width: '100%' }}
                        />
                    </Form.Item>

                    <Form.Item>
                        <Space>
                            <Button
                                htmlType="submit"
                                loading={savePending}
                                type="primary"
                            >
                                {editingRecord ? 'Cập nhật' : 'Tạo mới'}
                            </Button>
                            <Button onClick={handleModalClose}>Hủy</Button>
                        </Space>
                    </Form.Item>
                </Form>
            </Modal>
        </div>
    );
};

KnowledgeBasePage.getLayout = (page) => <AdminLayout>{page}</AdminLayout>;
KnowledgeBasePage.title = 'Quản lý Cơ sở Kiến thức Chatbot';

export default KnowledgeBasePage;
