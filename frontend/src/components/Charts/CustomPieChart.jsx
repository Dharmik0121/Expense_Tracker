import React from 'react'
import {
    PieChart,
    Pie,
    Cell,
    Tooltip,
    ResponsiveContainer,
    Legend,
} from 'recharts'
import CustomTooltip from './CustomTooltip';
import CustomLegend from './CustomLegend';

const CustomPieChart = ({
    data,
    label,
    totalAmount,
    colors,
    showTextAnchor,
}) => {
    const isEmpty = !data || data.length === 0;
    return (
        <div className="w-full h-[300px] md:h-[380px] flex items-center justify-center">
            {isEmpty ? (
                <p className="text-gray-400 text-sm">No data available</p>
            ) : (
                <ResponsiveContainer width="100%" height="100%">
                    <PieChart>
                        <Pie
                            data={data}
                            dataKey="amount"
                            nameKey="name"
                            cx="50%"
                            cy="50%"
                            innerRadius={70}
                            outerRadius={100}
                            labelLine={false}
                        >
                            {data.map((entry, index) => (
                                <Cell
                                    key={`cell-${index}`}
                                    fill={colors[index % colors.length]}
                                />
                            ))}
                        </Pie>
                        <Tooltip content={<CustomTooltip />} />
                        <Legend content={<CustomLegend />} />

                        {showTextAnchor && (
                            <>
                                <text
                                    x="50%"
                                    y="50%"
                                    dy={-15}
                                    textAnchor="middle"
                                    fill="#666"
                                    fontSize="12px"
                                >
                                    {label}
                                </text>
                                <text
                                    x="50%"
                                    y="50%"
                                    dy={10}
                                    textAnchor="middle"
                                    fill="#333"
                                    fontSize="16px"
                                    fontWeight="600"
                                >
                                    {totalAmount}
                                </text>
                            </>
                        )}
                    </PieChart>
                </ResponsiveContainer>
            )}
        </div>
    );
};

export default CustomPieChart;
