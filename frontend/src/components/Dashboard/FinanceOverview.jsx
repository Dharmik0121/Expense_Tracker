import React from 'react'
import CustomPieChart from '../Charts/CustomPieChart';

const COLORS = ["#475569", "#EF4444", "#16A34A"]

const FinanceOverview = ({ totalBalance, totalIncome, totalExpenses }) => {
    const balanceData = [
        { name: "Total Balance", amount: totalBalance },
        { name: "Total Expenses", amount: totalExpenses },
        { name: "Total Income", amount: totalIncome },
    ];

    console.log(totalBalance, totalExpenses, totalIncome);

    return (
        <div className='card min-h-[400px]'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Financial Overview</h5>

            </div>
            <CustomPieChart
                data={balanceData}
                label="Total Balance"
                totalAmount={`$${totalBalance}`}
                colors={COLORS}
                showTextAnchor
            />

        </div>
    )
}

export default FinanceOverview;