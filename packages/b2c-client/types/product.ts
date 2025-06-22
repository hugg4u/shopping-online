export type Product = {
    id: string;
    name: string;
    discount_price: number;
    original_price: number;
    quantity: number;
    description: string;
    ingredients?: string;
    benefits?: string;
    usage?: string;
    thumbnail: string;
    updatedAt: string;
    briefInfo: string;
    rating: number;
};
