import React, { useImperativeHandle } from 'react';
import { useQuery } from '@tanstack/react-query';
import * as request from '@shopping/common/utils/http-request';
import { QueryResponseType } from '@shopping/common/types';
import Avatar from '@shopping/common/components/avatar';
import { getImageUrl } from '@shopping/common/utils/getImageUrl';
import moment from 'moment';
import { Spin } from '@shopping/common/components/spin';
import { Activity } from '~/types/activity';

type Props = {
    orderId: string;
};

export type OrderActivityHandle = {
    reload: () => void;
};

const OrderActivity = React.forwardRef<OrderActivityHandle, Props>(
    ({ orderId }, ref) => {
        const { data, isFetching, refetch } = useQuery<
            QueryResponseType<Activity>
        >({
            queryKey: ['audit-log', orderId],
            queryFn: () =>
                request
                    .get(`order/audit-log/${orderId}`)
                    .then((res) => res.data),
            enabled: !!orderId,
        });

        useImperativeHandle(ref, () => {
            return {
                reload: () => {
                    refetch();
                },
            };
        });

        return (
            <>
                <Spin spinning={isFetching} />
                <div>
                    <div className="border-b-2 py-3 text-xl font-semibold">
                        Activities
                    </div>
                    <div className="max-h-[600px] space-y-4 overflow-auto py-4">
                        {data?.data?.map((item) => (
                            <div
                                className="grid grid-cols-10 gap-x-4"
                                key={item.id}
                            >
                                <div className="col-span-2 flex items-center gap-4 rounded-lg border px-2 py-1">
                                    <div>
                                        <Avatar
                                            height={40}
                                            src={
                                                getImageUrl(item?.userImage) ??
                                                ''
                                            }
                                            width={40}
                                        />
                                    </div>
                                    <div>
                                        <p className="font-medium">
                                            {item?.userName}
                                        </p>
                                        <p className="text-slate-500">
                                            {item?.userEmail}
                                        </p>
                                    </div>
                                </div>
                                <div className="col-span-7 flex items-center font-medium text-slate-600">
                                    {item?.title}
                                </div>
                                {item?.createdAt && (
                                    <div className="col-span-1 flex items-center space-x-1 font-medium text-slate-500">
                                        <span>
                                            {moment(item.createdAt).format(
                                                'DD MMM YYYY'
                                            )}
                                        </span>
                                        <span>at</span>
                                        <span>
                                            {moment(item.createdAt).format(
                                                'HH:mm'
                                            )}
                                        </span>
                                    </div>
                                )}
                            </div>
                        ))}
                    </div>
                </div>
            </>
        );
    }
);

export default OrderActivity;
