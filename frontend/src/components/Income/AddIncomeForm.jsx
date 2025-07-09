import React, { useState } from 'react';
import Input from '../Inputs/Input';
import EmojiPickerPopup from '../EmojiPickerPopup';
import { FaArrowRight } from 'react-icons/fa';

const AddIncomeForm = ({ onAddIncome }) => {
    const [income, setIncome] = useState({
        source: '',
        amount: '',
        date: '',
        icon: '',
    });

    const [loading, setLoading] = useState(false);

    const handleChange = (key, value) => {
        setIncome({ ...income, [key]: value });
    };

    const handleSubmit = async () => {
        if (!income.source || !income.amount || !income.date) {
            alert('Please fill in all fields.');
            return;
        }

        setLoading(true);
        try {
            await onAddIncome(income); // assumes async handler
            setIncome({
                source: '',
                amount: '',
                date: '',
                icon: '',
            });
        } catch (error) {
            console.error("Error adding income:", error);
            alert("Something went wrong.");
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="bg-white p-6 rounded-xl">
            <div className="flex items-center justify-between mb-4">
                <EmojiPickerPopup
                    icon={income.icon}
                    onSelect={(selectedIcon) => handleChange('icon', selectedIcon)}
                />
            </div>

            <Input
                value={income.source}
                onChange={({ target }) => handleChange('source', target.value)}
                label="Income Source"
                placeholder="e.g. Freelance, Salary"
                type="text"
            />

            <Input
                value={income.amount}
                onChange={({ target }) => handleChange('amount', target.value)}
                label="Amount"
                placeholder="e.g. 2000"
                type="number"
            />

            <Input
                value={income.date}
                onChange={({ target }) => handleChange('date', target.value)}
                label="Date"
                type="date"
            />

            <div className="flex justify-end pt-4">
                <button
                    type="submit"
                    disabled={loading}
                    className="group relative inline-flex items-center justify-center px-6 py-2 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white font-semibold rounded-xl shadow-md transition-all duration-300 active:scale-95"
                    onClick={handleSubmit}
                >
                    {loading ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                    ) : (
                        <>
                            <span className="mr-2">Add Income</span>
                            <FaArrowRight className="transform transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-2" />
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default AddIncomeForm;
