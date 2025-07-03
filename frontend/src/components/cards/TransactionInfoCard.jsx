import React from 'react';
import {
    LuUtensils,
    LuTrendingUp,
    LuTrendingDown,
    LuTrash2,
} from 'react-icons/lu';

const TransactionInfoCard = ({
    title,
    icon,
    date,
    type,
    hideDeleteBtn,
    onDelete,
    amount,
}) => {
    const getAmountStyles = () =>
        type === 'income'
            ? 'bg-green-100 text-green-500'
            : 'bg-red-50 text-red-500';

    return (
        <div className="group relative flex items-start gap-4 mt-2 p-3 rounded-lg hover:bg-gray-100/60 w-full">
            <div className="w-12 h-12 flex items-center justify-center text-xl text-gray-800 bg-gray-100 rounded shrink-0">
                {icon ? (
                    <img src={icon} alt={title} className="w-6 h-6" />
                ) : (
                    <>😶</>
                )}
            </div>

            <div className="flex flex-col md:flex-row justify-between items-start md:items-center w-full gap-3">
                {/* Title and Date */}
                <div>
                    <p className="text-sm text-gray-700 font-medium">{title}</p>
                    <p className="text-xs text-gray-400 mt-1">{date}</p>
                </div>

                {/* Amount and Delete Button */}
                <div className="flex items-center gap-2">
                    {!hideDeleteBtn && (
                        <button
                            className="text-gray-400 hover:text-red-500 opacity-0 group-hover:opacity-100 transition-opacity cursor-pointer"
                            onClick={onDelete}
                        >
                            <LuTrash2 size={18} />
                        </button>
                    )}

                    <div
                        className={`flex items-center gap-2 px-3 py-1.5 rounded-md ${getAmountStyles()}`}
                    >
                        <h6 className="text-xs font-medium">
                            {type === 'income' ? '+' : '-'} &#8377;. {amount}
                        </h6>
                        {type === 'income' ? <LuTrendingUp /> : <LuTrendingDown />}
                    </div>
                </div>
            </div>
        </div>
    );
};

export default TransactionInfoCard;
