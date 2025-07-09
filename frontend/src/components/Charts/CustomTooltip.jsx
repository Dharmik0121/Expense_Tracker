import React from 'react'

const CustomTooltip = ({ active, payload }) => {
    if (active && payload.length && payload) {
        return (
            <div className='bg-white shadow-md p-2 rounded-lg border border-gray-300'>
                <p className={`text-xs font-semibold mb-1`}>{payload[0].name}</p>
                <p className='text-sm text-gary-600'>
                    Amount: <span className='text-sm font-medium text-gray-900'>&#8377;. {payload[0].value}</span>
                </p>
            </div>
        )
    }

}

export default CustomTooltip;