import React from 'react'
import moment from 'moment'
import { LuArrowRight } from 'react-icons/lu'
import TransactionInfoCard from '../Cards/TransactionInfoCard'

const RecentIncome = ({ transactions, onSeeMore }) => {
    return (
        <div className='card'>
            <div className='flex items-center justify-between'>
                <h5 className='text-lg'>Income</h5>

                <button className='card-btn group' onClick={onSeeMore}>
                    See All
                    <span className="transition-transform duration-300 group-hover:translate-x-1">
                        <LuArrowRight className='text-base' />
                    </span>
                </button>
            </div>
            <div className='mt-6'>
                {transactions?.slice(0, 5)?.map((item) => (
                    <TransactionInfoCard
                        key={item._id}
                        title={item.source}
                        icon={item.icon}
                        date={moment(item.date).format("DD MM YYYY")}
                        amount={item.amount}
                        type="income"
                        hideDeleteBtn
                    />
                ))}
            </div>
        </div>
    )
}

export default RecentIncome