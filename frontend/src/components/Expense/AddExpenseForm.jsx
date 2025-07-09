import React, { useState } from 'react';
import EmojiPickerPopup from '../EmojiPickerPopup';
import Input from '../Inputs/Input';
import { FaArrowRight } from 'react-icons/fa6';

const AddExpenseForm = ({ onAddExpense }) => {
    const [expense, setExpense] = useState({
        category: '',
        amount: '',
        date: '',
        icon: '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (key, value) => {
        setExpense({ ...expense, [key]: value });
    };

    const handleSubmit = async () => {
        if (!expense.category || !expense.amount || !expense.date) {
            alert('Please fill in all fields');
            return;
        }

        setLoading(true);
        try {
            await onAddExpense(expense); // if this is async
            setExpense({
                category: '',
                amount: '',
                date: '',
                icon: '',
            });
        } catch (error) {
            console.error("Error adding expense:", error);
            alert("Something went wrong");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
                <EmojiPickerPopup
                    icon={expense.icon}
                    onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
                />
            </div>

            <Input
                value={expense.category}
                onChange={({ target }) => handleChange('category', target.value)}
                label="Category"
                placeholder="e.g., Rent, Groceries"
                type="text"
            />

            <Input
                value={expense.amount}
                onChange={({ target }) => handleChange('amount', target.value)}
                label="Amount"
                placeholder="e.g., 1500"
                type="number"
            />

            <Input
                value={expense.date}
                onChange={({ target }) => handleChange('date', target.value)}
                label="Date"
                placeholder=""
                type="date"
            />

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="group relative inline-flex items-center justify-center px-6 py-2 bg-red-500 hover:bg-red-600 disabled:opacity-60 text-white font-semibold rounded-xl shadow-md transition-all duration-300 active:scale-95"
                    onClick={handleSubmit}
                >
                    {loading ? (
                        <svg
                            className="animate-spin h-5 w-5 text-white"
                            xmlns="http://www.w3.org/2000/svg"
                            fill="none"
                            viewBox="0 0 24 24"
                        >
                            <circle
                                className="opacity-25"
                                cx="12"
                                cy="12"
                                r="10"
                                stroke="currentColor"
                                strokeWidth="4"
                            />
                            <path
                                className="opacity-75"
                                fill="currentColor"
                                d="M4 12a8 8 0 018-8v8z"
                            />
                        </svg>
                    ) : (
                        <>
                            <span className="mr-2">Add Expense</span>
                            <FaArrowRight className="transform transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-2" />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default AddExpenseForm;
