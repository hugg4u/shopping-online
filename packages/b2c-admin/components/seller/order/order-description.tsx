import React from 'react';
import type { OrderCms } from 'common/types/order';

type Props = {
    data: Partial<OrderCms>;
};

const OrderDescription: React.FC<Props> = ({ data }) => {
    return <div>{data?.name}</div>;
};

export default OrderDescription;
