import React from 'react';
import { Button, Card, Col, Layout, Row } from 'antd';
import { Product } from '@shopping/common/types/cart';
import { useQuery } from '@tanstack/react-query';
import request from '@shopping/common/utils/http-request';
import { QueryResponseGetOneType } from '@shopping/common/types';
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import Image from 'next/image';
import { currencyFormatter } from '@shopping/common/utils/formatter';
import useCartStore from '~/hooks/useCartStore';

type CartStoreItemProps = {
    productId: string;
    quantity: number;
};
const { Content } = Layout;

const CartStoreItem: React.FC<CartStoreItemProps> = ({
    productId,
    quantity,
}) => {
    const { data } = useQuery<QueryResponseGetOneType<Product>>({
        queryKey: ['product-info-cart', productId],
        queryFn: () =>
            request
                .get(`productPublicInfo/${productId}`)
                .then((res) => res.data),
        enabled: !!productId,
    });

    const { deleteProduct, updateProductQuantity } = useCartStore();

    return (
        <div key={data?.data?.id} className="mb-4">
            <Card
                bordered={false}
                className="shadow-sm"
                extra={
                    <Button
                        danger
                        icon={<DeleteOutlined />}
                        onClick={() => deleteProduct(data?.data?.id ?? '')}
                        size="small"
                        className="sm:size-default"
                    />
                }
                title={
                    <div className="flex items-center gap-2 text-sm sm:text-base">
                        {` Mã sản phẩm: ${data?.data?.id}`}
                    </div>
                }
            >
                <div className="space-y-4">
                    <div className="flex flex-col sm:flex-row gap-4">
                        <div className="w-full sm:w-32 md:w-40 flex-shrink-0">
                            <div className="relative h-32 sm:h-36 md:h-40 rounded-lg overflow-hidden">
                                <Image
                                    alt=""
                                    className="shadow-lg"
                                    layout="fill"
                                    objectFit="cover"
                                    src={`${data?.data?.thumbnail}`}
                                />
                            </div>
                        </div>
                        <div className="flex-1 space-y-3 sm:space-y-4">
                            <div className="relative flex justify-center text-xl font-semibold">
                                {data?.data?.name}
                            </div>
                            <div className="relative top-2 flex justify-center">
                                <div>
                                    <div className="text-center">Số lượng</div>
                                    <div
                                        className="max-sm: relative top-1 flex border-spacing-2 justify-evenly backdrop-brightness-90"
                                        style={{
                                            borderRadius: 10,
                                            width: 100,
                                        }}
                                    >
                                        <Button
                                            block
                                            icon={<MinusOutlined />}
                                            onClick={() =>
                                                updateProductQuantity(
                                                    {
                                                        productId:
                                                            data?.data?.id ??
                                                            '',
                                                        quantity: quantity - 1,
                                                    },
                                                    data?.data?.quantity ?? 0
                                                )
                                            }
                                        />
                                        <span className="mx-2 flex items-center">
                                            {quantity}
                                        </span>
                                        <Button
                                            block
                                            icon={<PlusOutlined />}
                                            onClick={() =>
                                                updateProductQuantity(
                                                    {
                                                        productId:
                                                            data?.data?.id ??
                                                            '',
                                                        quantity: quantity + 1,
                                                    },
                                                    data?.data?.quantity ?? 0
                                                )
                                            }
                                        />
                                    </div>
                                </div>
                            </div>
                        </Col>
                        <Col span={8}>
                            <div
                                style={{
                                    marginTop: 38,
                                }}
                            >
                                <div className="flex justify-evenly">
                                    <div>
                                        <div>Giá</div>
                                        <div className="text-lg font-semibold">
                                            {currencyFormatter(
                                                data?.data?.discount_price ??
                                                    data?.data
                                                        ?.original_price ??
                                                    0
                                            )}
                                        </div>
                                    </div>
                                    <div>
                                        <div>Tổng</div>
                                        <div className="text-lg font-semibold">
                                            {currencyFormatter(
                                                quantity *
                                                    (data?.data
                                                        ?.discount_price ??
                                                        data?.data
                                                            ?.original_price ??
                                                        0)
                                            )}
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Col>
                    </Row>
                </Content>
            </Card>
        </Layout>
    );
};

export default CartStoreItem;
