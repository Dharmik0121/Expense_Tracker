import React, { useState } from 'react';
import { MdDeleteForever } from 'react-icons/md';

const DeleteAlert = ({ content, onDelete }) => {
    const [loading, setLoading] = useState(false);

    const handleDelete = () => {
        setLoading(true);
        setTimeout(() => {
            onDelete();
            setLoading(false);
        }, 1000); // 1 second delay
    };

    return (
        <div className='bg-white p-6 rounded-lg'>
            <p className='text-gray-700 text-sm'>{content}</p>

            <div className='flex justify-end mt-6'>
                <button
                    type="button"
                    disabled={loading}
                    onClick={handleDelete}
                    className='flex items-center gap-2 px-4 py-2 bg-red-600 hover:bg-red-700 disabled:opacity-60 text-white rounded-md transition-all duration-300 shadow-md'
                >
                    {loading ? (
                        <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                        </svg>
                    ) : (
                        <>
                            <MdDeleteForever className='text-lg' />
                            Delete
                        </>
                    )}
                </button>
            </div>
        </div>
    );
};

export default DeleteAlert;

