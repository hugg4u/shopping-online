export type PaymentResponse = {
    qrCode: string | undefined;
    appTransId: string | undefined;
    checkoutUrl: string | undefined;
    accountNumber: string | undefined;
    accountName: string | undefined;
    bankName: string | undefined;
    bankLogo: string | undefined;
    description: string | undefined;
    amount: number;
};

export type CheckPaymentStatusResponse = {
    status: 'PAID' | 'PENDING' | 'PROCESSING' | 'CANCELLED ';
    orderCode: string;
    amount: number;
};
