import React, { useEffect, useState } from 'react'
import { prepareIncomeBarChartData } from '../../utils/helper.js';
import { LuHandCoins, LuPlus } from 'react-icons/lu';
import CustomBarChart from '../Charts/CustomBarChart';

const IncomeOverview = ({ transactions, onAddIncome }) => {
    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareIncomeBarChartData(transactions);
        setChartData(result);

        return () => { };
    }, [transactions]);
    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <div className=''>
                    <h5 className='text-lg'>Income Overview</h5>
                    <p className='text-xs text-gray-400 mt-0.5'>
                        Track your earning over time and analyze your income trends.
                    </p>
                </div>

                {/* <button className='add-btn flex' onClick={onAddIncome}>
                    <LuPlus className='text-lg' />
                    Add
                </button> */}
                <button
                    className='group flex items-center gap-2 px-5 py-2 bg-emerald-500 text-white rounded-lg hover:bg-emerald-600 transition duration-300 shadow-md'
                    onClick={onAddIncome}
                >
                    <span className='transition-transform duration-300 group-hover:translate-x-1'>
                        <LuHandCoins className='text-lg' />
                    </span>
                    Add Income
                </button>
            </div>

            <div className='mt-10'>
                <CustomBarChart data={chartData} color="#059669" />
            </div>
        </div>
    )
}

export default IncomeOverview