import React from 'react';
import {
    XAxis,
    YAxis,
    Tooltip,
    ResponsiveContainer,
    AreaChart,
    Area,
    CartesianGrid,
} from 'recharts';

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className='bg-white shadow-lg rounded-md p-3 border border-green-200'>
                <p className='text-xs font-semibold  mb-1'>
                    {payload[0].payload.category || payload[0].payload.month}
                </p>
                <p className='text-sm text-gray-700'>
                    Amount: <span className='font-semibold text-gray-900'>₹{payload[0].payload.amount}</span>
                </p>
            </div>
        );
    }
    return null;
};

const CustomLineChart = ({ data = [] }) => {
    return (
        <div className='w-full h-[320px] bg-white p-4 rounded-xl '>
            {data.length === 0 ? (
                <div className="text-gray-500 text-sm text-center pt-10">No data available</div>
            ) : (
                <ResponsiveContainer width='100%' height='100%'>
                    <AreaChart data={data} margin={{ top: 10, right: 30, left: 0, bottom: 0 }}>
                        <defs>
                            <linearGradient id='incomeGradient' x1='0' y1='0' x2='0' y2='1'>
                                <stop offset='0%' stopColor='#EF4444' stopOpacity={0.4} />
                                <stop offset='100%' stopColor='#EF4444' stopOpacity={0} />
                            </linearGradient>
                        </defs>
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#e5e7eb" />
                        <XAxis
                            dataKey="month"
                            tick={{ fontSize: 12, fill: '#6b7280' }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <YAxis
                            tick={{ fontSize: 12, fill: '#6b7280' }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Area
                            type='monotone'
                            dataKey='amount'
                            stroke='#EF4444'
                            fill='url(#incomeGradient)'
                            strokeWidth={3}
                            dot={{ r: 4, stroke: '#EF4444', strokeWidth: 2, fill: 'white' }}
                            activeDot={{ r: 6 }}
                        />
                    </AreaChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default CustomLineChart;
