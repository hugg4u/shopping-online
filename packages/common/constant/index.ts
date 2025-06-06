import { PostCategoryType } from '@shopping/common/types/post';

export const RATING_LIST = [
    { id: 0, value: 0 },
    { id: 1, value: 1 },
    { id: 2, value: 2 },
    { id: 3, value: 3 },
    { id: 4, value: 4 },
    { id: 5, value: 5 },
];

export const ORDER_STATUS = [
    { id: 'PAYMENT_PENDING', value: 'PAYMENT_PENDING' },
    { id: 'PAID', value: 'PAID' },
    { id: 'PENDING', value: 'PENDING' },
    { id: 'CONFIRMED', value: 'CONFIRMED' },
    { id: 'DELIVERING', value: 'DELIVERING' },
    { id: 'DELIVERED', value: 'DELIVERED' },
    { id: 'CANCELED', value: 'CANCELED' },
];

export const CUSTOMER_STATUS = [
    {
        value: 'NEWLY_REGISTER',
    },
    {
        value: 'NEWLY_BOUGHT',
    },
    {
        value: 'BANNED',
    },
];

export const USER_GENDER = [
    {
        value: 'MALE',
    },
    {
        value: 'FEMALE',
    },
];

export const RATING_LIST_CLIENT = [
    { id: 5, value: 5 },
    { id: 4, value: 4 },
    { id: 3, value: 3 },
    { id: 2, value: 2 },
    { id: 1, value: 1 },
];

type PostCategoryConstant = {
    id: PostCategoryType;
    value: PostCategoryType;
};

export const POST_CATEGORY: PostCategoryConstant[] = [
    { id: 'REVIEW', value: 'REVIEW' },
    { id: 'NEWS', value: 'NEWS' },
];

export const FILTER_LIST = [
    {
        id: 'NAME_A_TO_Z',
        name: 'Name: A to Z',
    },
    {
        id: 'NAME_Z_TO_A',
        name: 'Name: Z to A',
    },
    {
        id: 'RATE_LOW_TO_HIGHT',
        name: 'Rate: Low to Hight',
    },
    {
        id: 'RATE_HIGHT_TO_LOW',
        name: 'Rate: Hight to low',
    },
    {
        id: 'PRICE_LOW_TO_HIGHT',
        name: 'Price: Low to Hight',
    },
    {
        id: 'PRICE_HIGHT_TO_LOW',
        name: 'Price: Hight to low',
    },
    {
        id: 'DISCOUNT_PRICE_LOW_TO_HIGHT',
        name: 'Discount Price: Low to Hight',
    },
    {
        id: 'DISCOUNT_PRICE_HIGHT_TO_LOW',
        name: 'Discount Price: Hight to low',
    },
    {
        id: 'QUANTITY_LOW_TO_HIGHT',
        name: 'Quantity: Low to Hight',
    },
    {
        id: 'QUANTITY_HIGHT_TO_LOW',
        name: 'Quantity: Hight to low',
    },
    {
        id: 'SOLD_QUANTITY_LOW_TO_HIGHT',
        name: 'Sold Quantity: Low to Hight',
    },
    {
        id: 'SOLD_QUANTITY_HIGHT_TO_LOW',
        name: 'Sold Quantity: Hight to low',
    },
    {
        id: 'LATEST',
        name: 'Latest Create Date',
    },
    {
        id: 'OLDEST',
        name: 'Oldest Create Date',
    },
];

export const PAGE_SIZE = 5;

export const PAGE_SIZE_CLIENT = 10;

export const PAGE_SIZE_CLIENT_PRODUCT = 12;
export const PAGE_SIZE_CLIENT_BLOG = 12;
