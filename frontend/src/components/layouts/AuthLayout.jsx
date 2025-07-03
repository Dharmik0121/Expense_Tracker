import React from 'react'
import { LuTrendingUpDown } from "react-icons/lu";
import FireflyEffect from '../../animations/FireflyEffect';
import ExpenseImage from "../../assets/img1.png";


const AuthLayout = ({ children }) => {
    return (
        <div className="flex">
            {/* Left Panel */}
            <div className='w-screen h-screen md:w-[60vw] px-12 pt-8 pb-12 flex flex-col'>
                <h2 className='text-lg font-medium text-black'>
                    Expense Tracker
                </h2>
                <FireflyEffect />

                {/* Scrollable children */}
                <div className="flex-1 overflow-y-auto mt-4">
                    {children}
                </div>
            </div>

            {/* Right Panel Image (hidden on mobile) */}
            <div className="hidden md:block w-[40vw] h-screen relative overflow-hidden">
                <img
                    src={ExpenseImage}
                    alt="Expense Tracker Graphic"
                    className="w-full h-full object-cover"
                />
            </div>
        </div>

    )
}

export default AuthLayout;