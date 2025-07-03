import React, { useEffect, useState } from 'react'
import CustomPieChart from '../Charts/CustomPieChart';

// const COLORS = ["#FF8042", "#FA2C37", "#FF6900", "#4f39f6"];
const generateColors = (count) => {
    const colors = [];
    for (let i = 0; i < count; i++) {
        const hue = Math.floor((360 / count) * i);
        colors.push(`hsl(${hue}, 70%, 50%)`);
    }
    return colors;
};

const RecentIncomeWithChart = ({ data, totalIncome }) => {

    const [chartData, setChartData] = useState([]);

    const prepareChartData = () => {
        const dataArr = data?.map((item) => ({
            name: item?.source,
            amount: item?.amount,
        }));

        setChartData(dataArr);
    };

    useEffect(() => {
        prepareChartData();

        return () => { };
    }, [data]);
    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Last 60 Days Income</h5>

            </div>

            <CustomPieChart
                data={chartData}
                label="Total Income"
                totalAmount={`$${totalIncome}`}
                showTextAnchor
                colors={generateColors(chartData.length)}
            />
        </div>
    )
}

export default RecentIncomeWithChart