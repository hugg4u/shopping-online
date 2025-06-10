import * as gtag from './gtag';

// Search tracking
export const trackSearch = (searchTerm: string, resultsCount: number) => {
    gtag.event({
        action: 'search',
        category: 'engagement',
        label: searchTerm,
        value: resultsCount,
    });
};

// Product view tracking
export const trackProductView = (product: {
    id: string;
    name: string;
    price: number;
    category?: string;
}) => {
    gtag.event({
        action: 'view_item',
        category: 'ecommerce',
        label: `${product.name} (${product.id})`,
        value: product.price,
    });
};

// Wishlist actions tracking
export const trackWishlistAction = (
    action: 'add' | 'remove',
    product: { id: string; name: string }
) => {
    gtag.event({
        action: `wishlist_${action}`,
        category: 'engagement',
        label: `${product.name} (${product.id})`,
    });
};

// Checkout step tracking
export const trackCheckoutStep = (step: number, option?: string) => {
    gtag.event({
        action: 'checkout_step',
        category: 'ecommerce',
        label: `Step ${step}${option ? `: ${option}` : ''}`,
        value: step,
    });
};

// Form tracking
export const trackFormInteraction = (
    formName: string,
    action: 'start' | 'complete' | 'error',
    details?: string
) => {
    gtag.event({
        action: `form_${action}`,
        category: 'engagement',
        label: `${formName}${details ? `: ${details}` : ''}`,
    });
};

// Button click tracking
export const trackButtonClick = (
    buttonName: string,
    buttonLocation: string,
    additionalInfo?: string
) => {
    gtag.event({
        action: 'button_click',
        category: 'engagement',
        label: `${buttonLocation} - ${buttonName}${
            additionalInfo ? `: ${additionalInfo}` : ''
        }`,
    });
};

// Purchase tracking
export const trackPurchase = (order: {
    id: string;
    total: number;
    items: Array<{ id: string; name: string; price: number; quantity: number }>;
}) => {
    gtag.event({
        action: 'purchase',
        category: 'ecommerce',
        label: `Order: ${order.id}`,
        value: order.total,
    });
};
