import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts';

const NoActiveShape = () => null;

const CustomTooltip = ({ active, payload }) => {
    if (active && payload && payload.length) {
        return (
            <div className='bg-white p-3 rounded-lg shadow-lg border border-gray-200 text-xs sm:text-sm'>
                <p className='text-xs mb-1 font-semibold '>
                    {payload[0].payload.category || payload[0].payload.month}
                </p>
                <p className='text-gray-700'>
                    Amount: <span className='font-medium text-gray-900'>&#8377; {payload[0].payload.amount}</span>
                </p>
            </div>
        );
    }
    return null;
};

const CustomBarChart = ({ data, color }) => {
    const isEmpty = !data || data.length === 0;

    return (
        <div className='bg-white p-4 sm:p-6 rounded-xl mt-6 w-full h-[300px] flex items-center justify-center'>
            {isEmpty ? (
                <p className="text-gray-400 text-sm">No data available</p>
            ) : (
                <ResponsiveContainer width="100%" height="100%">
                    <BarChart
                        data={data}
                        barSize={30}
                        margin={{ top: 20, right: 20, left: 0, bottom: 5 }}
                    >
                        <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="#E5E7EB" />
                        <XAxis
                            dataKey="month"
                            tick={{ fontSize: 12, fill: '#4B5563' }}
                            axisLine={false}
                            tickLine={false}
                            interval={0}
                        />
                        <YAxis
                            tick={{ fontSize: 12, fill: '#4B5563' }}
                            axisLine={false}
                            tickLine={false}
                        />
                        <Tooltip content={<CustomTooltip />} />
                        <Legend
                            verticalAlign="top"
                            height={20}
                            iconType="circle"
                            wrapperStyle={{ fontSize: '12px' }}
                        />
                        <Bar
                            dataKey="amount"
                            fill={color}
                            radius={[10, 10, 0, 0]}
                            animationDuration={800}
                            label={{ position: 'top', fill: '#374151', fontSize: 10 }}
                            activeBar={<NoActiveShape />}
                        />
                    </BarChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default CustomBarChart;
