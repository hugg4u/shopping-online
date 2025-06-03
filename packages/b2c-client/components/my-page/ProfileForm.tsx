import React, { useEffect, useState } from 'react';
import {
    Button,
    Form,
    Input,
    message,
    Spin,
    Typography,
    Upload,
    UploadFile,
} from 'antd';
import { UploadOutlined } from '@ant-design/icons';
import request, { get } from 'common/utils/http-request';
import { useMutation } from '@tanstack/react-query';
import { getImageUrl } from 'common/utils/getImageUrl';
import moment from 'moment';
import { RcFile, UploadProps } from 'antd/es/upload';
import { toast } from 'react-toastify';
import { useUserQueryStore } from 'common/store/useUserStore';
import Avatar from 'common/components/avatar';
import EditProfilePopup from './EditProfilePopup';

const { Title } = Typography;

const ProfileForm = () => {
    const [form] = Form.useForm();
    const [loading, setLoading] = useState(false);
    const [avatarUrl, setAvatarUrl] = useState('');
    const [isModalVisible, setIsModalVisible] = useState(false);
    const [uploadedImageName, setUploadedImageName] = useState(avatarUrl);
    const [fileList, setFileList] = useState<UploadFile[]>([]);
    const [checkUpdateImg, setCheckUpdateImg] = useState(false);
    const [checkHideImg, setCheckHideImg] = useState(false);
    const { reload } = useUserQueryStore();

    const mapGender = (gender: string) => {
        if (gender === 'MALE') return 'Nam';
        if (gender === 'FEMALE') return 'Nữ';
        return '';
    };

    const fetchUserProfile = async () => {
        setLoading(true);
        try {
            const response = await get('/user-profile');
            const userData = response.data.data;

            form.setFieldsValue({
                name: userData.name,
                email: userData.email,
                phone: userData.phone,
                gender: mapGender(userData.gender),
                dob: userData.dob
                    ? moment(userData.dob).format('DD/MM/YYYY')
                    : '',
                address: userData.address,
            });

            if (userData.image) {
                setAvatarUrl(getImageUrl(userData.image));
            }
        } catch (error) {
            message.error('Không tải được thông tin người dùng');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchUserProfile();
        setCheckUpdateImg(false);
    }, [form, checkUpdateImg]);

    const handlePopupClose = () => {
        setIsModalVisible(false);
        fetchUserProfile();
    };

    const { mutateAsync: uploadFileTrigger } = useMutation({
        mutationFn: (files: RcFile[]) => {
            const formData = new FormData();
            files.forEach((file) => formData.append('files', file));
            return request.post('upload', formData).then((res) => res.data);
        },
        onError: () => {
            toast.error('Tải ảnh lên không thành công');
        },
    });

    const { mutateAsync: updateUserImage } = useMutation({
        mutationFn: (image: string) => {
            return request.put('/user-profile/update-image', { image });
        },
        onSuccess: () => {
            message.success('Thông tin người dùng được cập nhật thành công');
            setFileList([]);
            setUploadedImageName('');
            setCheckUpdateImg(true);
            setCheckHideImg(false);
            setTimeout(() => {
                reload();
            }, 200);
        },
        onError: (err) => {
            const error = err as Error;
            message.error(
                error.message || 'Không thể cập nhật thông tin người dùng'
            );
        },
    });

    const beforeUpload = (file: UploadFile) => {
        const isImage = file.type && file.type.startsWith('image/');
        if (!isImage) {
            message.error('Bạn chỉ có thể tải lên tập tin hình ảnh');
            return Upload.LIST_IGNORE;
        }
        return isImage;
    };

    const handleChange = ({
        fileList: newFileList,
    }: {
        fileList: UploadFile[];
    }) => setFileList(newFileList);

    const normFile = (e: { fileList: UploadFile[] }) => {
        return e?.fileList;
    };

    const handleUpdateImage = async () => {
        try {
            let newUploadedImageName = uploadedImageName;

            if (fileList.length > 0) {
                const fileListToUpload = fileList.map(
                    (file) => file.originFileObj as RcFile
                );

                if (fileListToUpload.length > 0) {
                    const uploadResponse =
                        await uploadFileTrigger(fileListToUpload);
                    const { imageUrls } = uploadResponse;

                    if (imageUrls && imageUrls.length > 0) {
                        [newUploadedImageName] = imageUrls;
                        setUploadedImageName(newUploadedImageName);
                    } else {
                        throw new Error(
                            'Image upload failed, no image URLs returned'
                        );
                    }
                }
            }

            await updateUserImage(newUploadedImageName);
        } catch (err) {
            const error = err as Error;
            message.error(
                error.message || 'Không thể cập nhật thông tin người dùng'
            );
        }
    };

    const handleDisplayImg = () => {
        setCheckHideImg(true);
    };

    const openModal = () => {
        setFileList([]); // Clear file list before opening modal
        setIsModalVisible(true);
    };

    const formItemLayout = {
        labelCol: {
            xs: { span: 24 },
            sm: { span: 8 },
        },
        wrapperCol: {
            xs: { span: 24 },
            sm: { span: 16 },
        },
    };

    const customItemRender: UploadProps['itemRender'] = (originNode) => {
        const customFileName = '';
        return React.cloneElement(originNode, {
            ...originNode.props,
            children: React.Children.map(
                originNode.props.children,
                (child, index) => {
                    if (index === 1 && React.isValidElement(child)) {
                        return React.cloneElement(child as React.ReactElement, {
                            children: customFileName,
                        });
                    }
                    return child;
                }
            ),
        } as React.ReactElement);
    };

    return (
        <Spin spinning={loading}>
            <div className="mx-auto max-w-6xl rounded-lg bg-white p-8 shadow-lg">
                <Title className="mb-6 text-center text-gray-800" level={3}>
                    Hồ Sơ Của Tôi
                </Title>

                <Form
                    className="mt-6"
                    form={form}
                    initialValues={{
                        name: '',
                        email: '',
                        phone: '',
                        gender: 'Khác',
                        dob: '',
                        address: '',
                    }}
                    layout="horizontal"
                    name="profile"
                >
                    <div className="flex gap-8">
                        <div className="flex-1 space-y-6">
                            <Form.Item
                                {...formItemLayout}
                                className="mb-4"
                                label="Tên"
                                name="name"
                            >
                                <Input
                                    className="rounded-lg border-gray-300 bg-gray-50"
                                    readOnly
                                />
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                className="mb-4"
                                label="Email"
                                name="email"
                            >
                                <Input
                                    className="rounded-lg border-gray-300 bg-gray-50"
                                    readOnly
                                />
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                className="mb-4"
                                label="Số điện thoại"
                                name="phone"
                            >
                                <Input
                                    className="rounded-lg border-gray-300 bg-gray-50"
                                    readOnly
                                />
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                className="mb-4"
                                label="Giới tính"
                                name="gender"
                            >
                                <Input
                                    className="rounded-lg border-gray-300 bg-gray-50"
                                    readOnly
                                    value={form.getFieldValue('gender')}
                                />
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                className="mb-4"
                                label="Ngày sinh"
                                name="dob"
                            >
                                <Input
                                    className="rounded-lg border-gray-300 bg-gray-50"
                                    readOnly
                                />
                            </Form.Item>
                            <Form.Item
                                {...formItemLayout}
                                className="mb-4"
                                label="Địa chỉ"
                                name="address"
                            >
                                <Input
                                    className="rounded-lg border-gray-300 bg-gray-50"
                                    readOnly
                                />
                            </Form.Item>
                        </div>

                        <div className="h-full w-px bg-gray-200" />

                        <div className="flex w-80 flex-col items-center space-y-6">
                            <Avatar height={150} src={avatarUrl} width={150} />

                            <div className="text-lg font-semibold text-gray-700">
                                Avatar
                            </div>

                            <Form.Item
                                className="w-full"
                                getValueFromEvent={normFile}
                                name="avatar"
                            >
                                <Upload
                                    beforeUpload={beforeUpload}
                                    className="flex w-full justify-center"
                                    fileList={fileList}
                                    itemRender={customItemRender}
                                    listType="picture"
                                    maxCount={1}
                                    onChange={handleChange}
                                    showUploadList={checkHideImg}
                                >
                                    <Button
                                        className="rounded-lg bg-amber-500 text-white hover:bg-amber-600"
                                        icon={<UploadOutlined />}
                                        onClick={handleDisplayImg}
                                    >
                                        Chọn Ảnh
                                    </Button>
                                </Upload>
                            </Form.Item>

                            <Button
                                className="rounded-lg bg-green-500 text-white hover:bg-green-600"
                                icon={<UploadOutlined />}
                                onClick={handleUpdateImage}
                                style={{
                                    display:
                                        fileList.length > 0 ? 'block' : 'none',
                                }}
                            >
                                Cập nhật
                            </Button>
                        </div>
                    </div>

                    <Form.Item className="mt-8 text-center">
                        <Button
                            className="rounded-lg bg-blue-500 px-8 py-2 text-white hover:bg-blue-600"
                            htmlType="submit"
                            onClick={openModal}
                            type="primary"
                        >
                            Sửa hồ sơ
                        </Button>
                    </Form.Item>
                </Form>

                <EditProfilePopup
                    onClose={handlePopupClose}
                    visible={isModalVisible}
                />
            </div>
        </Spin>
    );
};

export default ProfileForm;
