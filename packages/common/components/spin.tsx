/* eslint-disable react/style-prop-object */
import React from 'react';
import { Spin as Spinner } from 'antd';
import loadingAnimation from 'b2c-client/public/images/loading.json';
import Lottie from 'lottie-react';

type Props = {
    spinning?: boolean;
    // eslint-disable-next-line react/require-default-props
    children?: React.ReactNode;
};

const CustomLoading = () => {
    return (
        <div style={{ width: 200, height: 200 }}>
            <Lottie animationData={loadingAnimation} loop />
        </div>
    );
};

export const Spin: React.FC<Props> = ({ spinning, children }) => {
    return (
        <Spinner fullscreen indicator={<CustomLoading />} spinning={spinning}>
            {children}
        </Spinner>
    );
};

Spin.defaultProps = {
    spinning: true,
};
