/* eslint-disable max-lines */
import { DeleteOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { useMutation, useQuery } from '@tanstack/react-query';
import { Button, Card, Checkbox, Col, Layout, Modal, Row } from 'antd';
import { QueryResponseType } from '@shopping/common/types';
import { Cart } from '@shopping/common/types/cart';
import { Product } from '@shopping/common/types/product';
import { currencyFormatter } from '@shopping/common/utils/formatter';
import * as request from '@shopping/common/utils/http-request';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import { useAuth } from '~/hooks/useAuth';
import useCartStore from '~/hooks/useCartStore';
import DeleteCartProductFormModal from './delete-cart-product';

const { Content } = Layout;

// eslint-disable-next-line max-lines-per-function
const CartDetails = () => {
    const auth = useAuth();
    const router = useRouter();
    const { query } = useRouter();

    // Initialize cartItems from localStorage or default to empty array
    const [cartItems, setCartItems] = useState<Cart[]>([]);

    const itemKeysQuery = query.itemKeys as string;

    const [selectedItems, setSelectedItems] = useState<
        {
            id: string;
            quantity: string;
        }[]
    >([]);

    const [totalCartPrice, setTotalCartPrice] = useState(0);
    const {
        data: cartStorage,
        deleteProduct,
        updateProductQuantity,
    } = useCartStore();

    const {
        data: listCartItemsStore,
        isLoading: isLoadinglistCartItemsStore,
        refetch: listCartItemsStoreRefetch,
    } = useQuery<QueryResponseType<Product>>({
        queryKey: ['list_product_cart'],
        queryFn: async () => {
            return request
                .get('/list-product-cart', {
                    params: {
                        listProductId: cartStorage.map(
                            (cart) => cart.productId
                        ),
                    },
                })
                .then((res) => res.data);
        },
        enabled: cartStorage.length > 0,
    });

    const { data: cartData, refetch: refetchCart } = useQuery<
        QueryResponseType<Cart>
    >({
        queryKey: ['cart'],
        queryFn: () => {
            if (auth) {
                return request.get('cart').then((res) => res.data);
            }
            return Promise.resolve({ data: null }); // Return a dummy response or handle as needed
        },
        enabled: !!auth, // Only fetch data when auth is true
    });

    const { mutate: updateCartTrigger } = useMutation({
        mutationFn: ({ id, quantity }: { id: string; quantity: number }) => {
            return request
                .put(`cart/updateQuantity/${id}`, { quantity })
                .then((res) => res.data);
        },
    });

    useEffect(() => {
        if (listCartItemsStore?.data) {
            const total = listCartItemsStore.data.reduce((acc, cur) => {
                const cartItem = cartStorage.find(
                    (item) => item.productId === cur.id
                );
                if (cartItem) {
                    const price = cur.discount_price ?? cur.original_price ?? 0;
                    // eslint-disable-next-line no-param-reassign
                    acc += price * cartItem.quantity;
                }
                return acc;
            }, 0);
            setTotalCartPrice(total);
        } else {
            setTotalCartPrice(0);
        }
    }, [listCartItemsStore, cartStorage, isLoadinglistCartItemsStore]);

    useEffect(() => {
        if (auth) {
            if (cartData?.data) {
                setCartItems(cartData.data);
            }
        } else {
            setCartItems(cartStorage);
        }
    }, [cartData, cartStorage, auth]);

    const updateCartQuantity = (id: string, type: 'plus' | 'minus') => {
        const updatedCartItems = cartItems.map((item) => {
            if (item.id === id) {
                let newQuantity =
                    type === 'plus'
                        ? (item.quantity ?? 0) + 1
                        : (item.quantity ?? 0) - 1;
                // Ensure quantity doesn't go below 1
                newQuantity = Math.max(newQuantity, 1);
                newQuantity = Math.min(
                    newQuantity,
                    item?.product?.quantity ?? 0
                );
                updateCartTrigger({
                    id: id || '',
                    quantity: newQuantity,
                });
                return { ...item, quantity: newQuantity };
            }

            return item;
        });
        setCartItems(updatedCartItems); // Update state
    };

    const totalPrice = cartItems.reduce(
        (total, item) =>
            total +
            (item.quantity ?? 0) *
                (item.product?.discount_price ??
                    item.product?.original_price ??
                    0),
        0
    );

    useEffect(() => {
        if (itemKeysQuery) {
            const product = itemKeysQuery.split(',');
            product.forEach((e: string) => {
                const [id, quantity] = e.split(':');

                setSelectedItems((prevSelectedItems) => [
                    ...prevSelectedItems,
                    { id, quantity },
                ]);
            });
        }
    }, [itemKeysQuery, cartItems]);

    const handleCheckboxChange = (id: string, checked: boolean) => {
        setSelectedItems((prevSelectedItems) => {
            if (checked) {
                return [...prevSelectedItems, { id, quantity: '1' }];
            }
            return prevSelectedItems.filter((item) => item.id !== id);
        });
    };

    const handlePurchase = () => {
        const queryString = selectedItems?.map((e) => `${e.id}`).join(',');
        if (queryString === null || queryString === '') {
            Modal.warn({
                content: 'Vui lòng chọn sản phẩm để tiến hành đặt hàng.',
                okText: 'Trở lại',
            });
            return;
        }
        router.push(`/cart-contact?itemKeys=${queryString}`);
    };

    if (!auth) {
        return (
            <Layout className="bg-[#ffff]">
                <Content className="bg-[#0000]" style={{ padding: '0 48px' }}>
                    <Layout
                        className="bg-[#ffff]"
                        style={{ padding: '24px 0' }}
                    >
                        <Content className="bg-[#ffff]">
                            <Row gutter={16}>
                                <Col span={16}>
                                    {listCartItemsStore?.data?.map((item) => (
                                        <Card
                                            bordered={false}
                                            extra={
                                                <Button
                                                    danger
                                                    icon={<DeleteOutlined />}
                                                    onClick={async () => {
                                                        await deleteProduct(
                                                            item?.id ?? ''
                                                        );
                                                        listCartItemsStoreRefetch();
                                                    }}
                                                />
                                            }
                                            style={{
                                                marginBottom: 10,
                                                marginLeft: 10,
                                            }}
                                            title={
                                                <div className="flex items-center gap-2">
                                                    <Checkbox
                                                        checked={selectedItems.some(
                                                            (e) =>
                                                                e.id === item.id
                                                        )}
                                                        onChange={(e) =>
                                                            handleCheckboxChange(
                                                                item?.id ?? '',
                                                                e.target.checked
                                                            )
                                                        }
                                                        value={item?.id}
                                                    />
                                                    {` Mã sản phẩm:  ${item?.id}`}
                                                </div>
                                            }
                                        >
                                            <Content>
                                                <Row gutter={16}>
                                                    <Col span={6}>
                                                        <div
                                                            style={{
                                                                height: 150,
                                                            }}
                                                        >
                                                            <Image
                                                                alt=""
                                                                className="shadow-lg"
                                                                layout="fill"
                                                                objectFit="cover"
                                                                src={`${item?.thumbnail}`}
                                                            />
                                                        </div>
                                                    </Col>
                                                    <Col span={8}>
                                                        <div className="relative flex justify-center text-xl font-semibold">
                                                            {item?.name}
                                                        </div>
                                                        <div className="relative top-2 flex justify-center">
                                                            <div>
                                                                <div className="text-center">
                                                                    Số lượng
                                                                </div>
                                                                <div
                                                                    className="max-sm: relative top-1 flex border-spacing-2 justify-evenly backdrop-brightness-90"
                                                                    style={{
                                                                        borderRadius: 10,
                                                                        width: 100,
                                                                    }}
                                                                >
                                                                    <Button
                                                                        block
                                                                        icon={
                                                                            <MinusOutlined />
                                                                        }
                                                                        onClick={() =>
                                                                            updateProductQuantity(
                                                                                {
                                                                                    productId:
                                                                                        item?.id ??
                                                                                        '',
                                                                                    quantity:
                                                                                        (cartStorage.find(
                                                                                            (
                                                                                                e
                                                                                            ) =>
                                                                                                e.productId ===
                                                                                                item.id
                                                                                        )
                                                                                            ?.quantity ??
                                                                                            0) >
                                                                                        0
                                                                                            ? (cartStorage.find(
                                                                                                  (
                                                                                                      e
                                                                                                  ) =>
                                                                                                      e.productId ===
                                                                                                      item.id
                                                                                              )
                                                                                                  ?.quantity ??
                                                                                                  0) -
                                                                                              1
                                                                                            : 0,
                                                                                },
                                                                                cartStorage.find(
                                                                                    (
                                                                                        e
                                                                                    ) =>
                                                                                        e.productId ===
                                                                                        item.id
                                                                                )
                                                                                    ?.quantity ??
                                                                                    0
                                                                            )
                                                                        }
                                                                    />
                                                                    <span className="mx-2 flex items-center">
                                                                        {
                                                                            cartStorage.find(
                                                                                (
                                                                                    e
                                                                                ) =>
                                                                                    e.productId ===
                                                                                    item.id
                                                                            )
                                                                                ?.quantity
                                                                        }
                                                                    </span>
                                                                    <Button
                                                                        block
                                                                        icon={
                                                                            <PlusOutlined />
                                                                        }
                                                                        onClick={() =>
                                                                            updateProductQuantity(
                                                                                {
                                                                                    productId:
                                                                                        item?.id ??
                                                                                        '',
                                                                                    quantity:
                                                                                        (cartStorage.find(
                                                                                            (
                                                                                                e
                                                                                            ) =>
                                                                                                e.productId ===
                                                                                                item.id
                                                                                        )
                                                                                            ?.quantity ??
                                                                                            0) >
                                                                                        0
                                                                                            ? (cartStorage.find(
                                                                                                  (
                                                                                                      e
                                                                                                  ) =>
                                                                                                      e.productId ===
                                                                                                      item.id
                                                                                              )
                                                                                                  ?.quantity ??
                                                                                                  0) +
                                                                                              1
                                                                                            : 0,
                                                                                },
                                                                                item?.quantity ??
                                                                                    0
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
                                                                    <div>
                                                                        Giá
                                                                    </div>
                                                                    <div className="text-lg font-semibold">
                                                                        {currencyFormatter(
                                                                            item?.discount_price ??
                                                                                item?.original_price ??
                                                                                0
                                                                        )}
                                                                    </div>
                                                                </div>
                                                                <div>
                                                                    <div>
                                                                        Tổng
                                                                    </div>
                                                                    <div className="text-lg font-semibold">
                                                                        {currencyFormatter(
                                                                            (cartStorage.find(
                                                                                (
                                                                                    e
                                                                                ) =>
                                                                                    e.productId ===
                                                                                    item.id
                                                                            )
                                                                                ?.quantity ??
                                                                                0) >
                                                                                0
                                                                                ? (cartStorage.find(
                                                                                      (
                                                                                          e
                                                                                      ) =>
                                                                                          e.productId ===
                                                                                          item.id
                                                                                  )
                                                                                      ?.quantity ??
                                                                                      0) *
                                                                                      (item?.discount_price ??
                                                                                          item?.original_price ??
                                                                                          0)
                                                                                : 0
                                                                        )}
                                                                    </div>
                                                                </div>
                                                            </div>
                                                        </div>
                                                    </Col>
                                                </Row>
                                            </Content>
                                        </Card>
                                    ))}
                                </Col>
                                <Col span={8}>
                                    <Card
                                        bordered={false}
                                        className="shadow-lg"
                                        title={
                                            <div className="flex items-center justify-between">
                                                <span className="text-xl font-semibold">
                                                    Tổng đơn hàng:
                                                </span>
                                                <span className="text-primary text-2xl font-bold">
                                                    {currencyFormatter(
                                                        totalCartPrice
                                                    )}
                                                </span>
                                            </div>
                                        }
                                    >
                                        <div className="space-y-4">
                                            <div className="rounded-lg bg-gray-50 p-4">
                                                <div className="flex items-center justify-between">
                                                    <span className="text-base text-gray-600">
                                                        Tạm tính:
                                                    </span>
                                                    <span className="text-lg font-semibold">
                                                        {currencyFormatter(
                                                            totalCartPrice
                                                        )}
                                                    </span>
                                                </div>
                                                <div className="mt-2 flex items-center justify-between">
                                                    <span className="text-base text-gray-600">
                                                        Phí vận chuyển:
                                                    </span>
                                                    <span className="text-base">
                                                        Miễn phí
                                                    </span>
                                                </div>
                                                <hr className="my-3 border-gray-200" />
                                                <div className="flex items-center justify-between">
                                                    <span className="text-lg font-semibold">
                                                        Tổng cộng:
                                                    </span>
                                                    <span className="text-primary text-xl font-bold">
                                                        {currencyFormatter(
                                                            totalCartPrice
                                                        )}
                                                    </span>
                                                </div>
                                            </div>

                                            <Link href="/product">
                                                <Button
                                                    block
                                                    className="h-12 text-base font-medium"
                                                    size="large"
                                                    type="default"
                                                >
                                                    Tiếp tục mua sắm
                                                </Button>
                                            </Link>
                                            <Button
                                                block
                                                className="bg-primary hover:bg-primary/90 h-12 text-base font-semibold"
                                                onClick={handlePurchase}
                                                size="large"
                                                type="primary"
                                            >
                                                Thanh toán đơn hàng
                                            </Button>
                                        </div>
                                    </Card>
                                </Col>
                            </Row>
                        </Content>
                    </Layout>
                </Content>
            </Layout>
        );
    }
    return (
        <div className="w-full">
            <div className="flex flex-col gap-6 lg:flex-row lg:gap-8">
                <div className="flex-1 space-y-4 lg:w-2/3">
                    {cartItems?.map((item) => (
                        <Card
                            bordered={false}
                            className="mb-4"
                            extra={
                                <DeleteCartProductFormModal
                                    cartId={item.id ?? ''}
                                    productId={item.product?.id ?? ''}
                                    reload={refetchCart}
                                />
                            }
                            key={item.id}
                            title={
                                <div className="flex items-center gap-2">
                                    <Checkbox
                                        checked={selectedItems.some(
                                            (e) => e.id === item.product?.id
                                        )}
                                        onChange={(e) =>
                                            handleCheckboxChange(
                                                item.product?.id ?? '',
                                                e.target.checked
                                            )
                                        }
                                        value={item.product?.id}
                                    />
                                    <span className="text-sm sm:text-base">
                                        {`Mã sản phẩm: ${auth ? item.product?.id : item.productId}`}
                                    </span>
                                </div>
                            }
                        >
                            <div className="flex flex-col gap-4 sm:flex-row">
                                {/* Product Image */}
                                <div className="relative h-32 w-full flex-shrink-0 sm:w-32 lg:h-40 lg:w-40">
                                    <Image
                                        alt={item.id ?? ''}
                                        className="rounded-lg shadow-lg"
                                        layout="fill"
                                        objectFit="cover"
                                        src={`${item.product?.thumbnail}`}
                                    />
                                </div>

                                {/* Product Info */}
                                <div className="flex flex-1 flex-col justify-between gap-4 sm:flex-row">
                                    {/* Product Name & Quantity */}
                                    <div className="flex-1">
                                        <div className="mb-4 text-base font-semibold sm:text-lg lg:text-xl">
                                            {item.product?.name}
                                        </div>
                                        <div className="flex flex-col gap-2 sm:flex-row sm:items-center">
                                            <span className="text-sm sm:text-base">
                                                Số lượng:
                                            </span>
                                            <div className="flex w-fit items-center gap-2 rounded-lg bg-gray-50 p-1">
                                                <Button
                                                    icon={<MinusOutlined />}
                                                    onClick={() =>
                                                        updateCartQuantity(
                                                            item.id ?? '',
                                                            'minus'
                                                        )
                                                    }
                                                    size="small"
                                                />
                                                <span className="min-w-[40px] text-center font-medium">
                                                    {item.quantity ?? 0}
                                                </span>
                                                <Button
                                                    icon={<PlusOutlined />}
                                                    onClick={() =>
                                                        updateCartQuantity(
                                                            item.id ?? '',
                                                            'plus'
                                                        )
                                                    }
                                                    size="small"
                                                />
                                            </div>
                                        </div>
                                    </div>

                                    {/* Price Info */}
                                    <div className="flex min-w-0 flex-row justify-between gap-4 sm:min-w-[120px] sm:flex-col sm:justify-start sm:gap-2 sm:text-right">
                                        <div>
                                            <div className="text-sm text-gray-600">
                                                Giá
                                            </div>
                                            <div className="text-sm font-semibold sm:text-base lg:text-lg">
                                                {currencyFormatter(
                                                    item.product
                                                        ?.discount_price ??
                                                        item.product
                                                            ?.original_price ??
                                                        0
                                                )}
                                            </div>
                                        </div>
                                        <div>
                                            <div className="text-sm text-gray-600">
                                                Tổng
                                            </div>
                                            <div className="text-primary text-sm font-semibold sm:text-base lg:text-lg">
                                                {currencyFormatter(
                                                    (item.quantity ?? 0) *
                                                        (item.product
                                                            ?.discount_price ??
                                                            item.product
                                                                ?.original_price ??
                                                            0)
                                                )}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </Card>
                    ))}
                </div>

                {/* Order Summary */}
                <div className="w-full lg:w-1/3 lg:flex-shrink-0">
                    {/* Mobile Summary - Simple Box */}
                    <div className="lg:hidden">
                        <div className="mb-4 rounded-lg border bg-white p-4 shadow-sm">
                            <div className="mb-4 flex items-center justify-between">
                                <span className="text-lg font-semibold">
                                    Tổng đơn hàng
                                </span>
                                <span className="text-primary text-xl font-bold">
                                    {currencyFormatter(totalPrice)}
                                </span>
                            </div>
                            <div className="space-y-3">
                                <Link href="/product">
                                    <Button
                                        block
                                        className="h-11 text-sm font-medium"
                                        size="large"
                                        type="default"
                                    >
                                        Tiếp tục mua sắm
                                    </Button>
                                </Link>
                                <Button
                                    block
                                    className="h-11 text-sm font-semibold"
                                    onClick={handlePurchase}
                                    size="large"
                                    type="primary"
                                >
                                    Thanh toán đơn hàng
                                </Button>
                            </div>
                        </div>
                    </div>

                    {/* Desktop Summary - Full Card */}
                    <div className="hidden lg:block">
                        <Card
                            bordered={false}
                            className="sticky top-4 shadow-lg"
                            title={
                                <div className="flex items-center justify-between">
                                    <span className="text-xl font-semibold">
                                        Tổng đơn hàng:
                                    </span>
                                    <span className="text-primary text-2xl font-bold">
                                        {currencyFormatter(totalPrice)}
                                    </span>
                                </div>
                            }
                        >
                            <div className="space-y-4">
                                <div className="rounded-lg bg-gray-50 p-4">
                                    <div className="flex items-center justify-between">
                                        <span className="text-base text-gray-600">
                                            Tạm tính:
                                        </span>
                                        <span className="text-lg font-semibold">
                                            {currencyFormatter(totalPrice)}
                                        </span>
                                    </div>
                                    <div className="mt-2 flex items-center justify-between">
                                        <span className="text-base text-gray-600">
                                            Phí vận chuyển:
                                        </span>
                                        <span className="text-base">
                                            Miễn phí
                                        </span>
                                    </div>
                                    <hr className="my-3 border-gray-200" />
                                    <div className="flex items-center justify-between">
                                        <span className="text-lg font-semibold">
                                            Tổng cộng:
                                        </span>
                                        <span className="text-primary text-xl font-bold">
                                            {currencyFormatter(totalPrice)}
                                        </span>
                                    </div>
                                </div>

                                <Link href="/product">
                                    <Button
                                        block
                                        className="h-12 text-base font-medium"
                                        size="large"
                                        type="default"
                                    >
                                        Tiếp tục mua sắm
                                    </Button>
                                </Link>
                                <Button
                                    block
                                    className="bg-primary hover:bg-primary/90 h-12 text-base font-semibold"
                                    onClick={handlePurchase}
                                    size="large"
                                    type="primary"
                                >
                                    Thanh toán đơn hàng
                                </Button>
                            </div>
                        </Card>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CartDetails;
