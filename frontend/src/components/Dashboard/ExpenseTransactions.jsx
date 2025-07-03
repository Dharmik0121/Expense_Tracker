import React from 'react'
import moment from 'moment'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'

const ExpenseTransations = ({ transactions, onSeeMore }) => {


    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Expenses</h5>

                <button className='card-btn group' onClick={onSeeMore}>
                    See All
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                        <LuArrowRight className='text-base' />
                    </span>
                </button>

            </div>

            <div className='mt-6'>
                {transactions?.slice(0, 5)?.map((expense) => (
                    <TransactionInfoCard
                        key={expense._id}
                        title={expense.category}
                        icon={expense.icon}
                        date={moment(expense.date).format("DD/MM/YYYY")}
                        amount={expense.amount}
                        type="expense"
                        hideDeleteBtn
                    />

                ))}
            </div>
        </div>
    )
}

export default ExpenseTransations