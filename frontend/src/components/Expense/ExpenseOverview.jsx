import React, { useEffect, useState } from 'react'
import { prepareExpenseLineChartData } from '../../utils/helper';
import { LuPlus } from 'react-icons/lu';
import CustomLineChart from '../Charts/CustomLineChart';
import { LuHandCoins } from "react-icons/lu";

const ExpenseOverview = ({ transactions, onExpenseIncome }) => {

    const [chartData, setChartData] = useState([]);

    useEffect(() => {
        const result = prepareExpenseLineChartData(transactions);
        setChartData(result);

        return () => { };
    }, [transactions]);
    return (
        <div className='card'>
            <div className='flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-6'>
                <div>
                    <h5 className='text-sm sm:text-lg'>Expense Overview</h5>
                    <p className='text-[10px] sm:text-xs text-gray-400 mt-0.5'>
                        Track your spending trends over time and gain insights where your money goes.
                    </p>
                </div>

                <button
                    className='group flex items-center gap-2 px-3 py-1 sm:px-5 sm:py-2 bg-red-500 text-white text-[12px] sm:text-base rounded-lg hover:bg-red-600 transition duration-300 shadow-md'
                    onClick={onExpenseIncome}
                >
                    <span className='transition-transform duration-300 group-hover:translate-x-1'>
                        <LuHandCoins className='text-sm sm:text-lg' />
                    </span>
                    Add Expense
                </button>
            </div>
            <div className='mt-10'>
                <CustomLineChart data={chartData} />
            </div>
        </div>
    )
}

export default ExpenseOverview