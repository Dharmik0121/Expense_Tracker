import React, { useContext, useState } from 'react'
import AuthLayout from '../../components/layouts/AuthLayout.jsx'
import Input from '../../components/Inputs/Input.jsx';
import { Link, useNavigate } from 'react-router-dom';
import { FaArrowRight } from 'react-icons/fa6';
import ProfilePhotoSelector from '../../components/Inputs/ProfilePhotoSelector.jsx';
import { validateEmail } from '../../utils/helper.js';
import axiosInstance from '../../utils/axiosInstance.js';
import { API_PATHS } from '../../utils/apiPaths.js';
import { UserContext } from '../../context/UserContext.jsx';
import uplaodImage from '../../utils/uploadImage.js';



const SignUp = () => {
    const [profilePic, setProfilePic] = useState(null);
    const [fullName, setFullName] = useState("");
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(null);
    const navigate = useNavigate();
    const { updateUser } = useContext(UserContext);


    const handleSignUp = async (e) => {
        e.preventDefault();

        let profileImageUrl = "";

        if (!fullName) {
            setError("Please enter your full name");
            return;
        }

        if (!validateEmail(email)) {
            setError("Please enter a valid email address");
            return;
        }

        if (!password) {
            setError("Please enter the password");
            return;
        }

        setError("");

        //signup api call
        try {
            setLoading(true)
            //upload img if prsnt
            if (profilePic) {
                const imgUploadRes = await uplaodImage(profilePic);
                profileImageUrl = imgUploadRes.imageUrl || "";
            }
            const response = await axiosInstance.post(API_PATHS.AUTH.REGISTER, {
                fullName,
                email,
                password,
                profileImageUrl
            });

            const { token, user } = response.data;

            if (token) {
                localStorage.setItem("token", token);
                updateUser(user);
                navigate("/dashboard");
            }

        } catch (error) {
            if (error.response && error.response.data.message) {

                setError(error.response.data.message);
            }
            else {

                setError("Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false)
        }
    }

    return (
        <AuthLayout>
            <div className='pt-10 lg:w-[100%] w-full h-screen overflow-y-auto md:h-full md:mt-0  flex flex-col justify-center'>
                <div className='w-10 h-10 rounded-[40px] bg-emerald-500 absolute top-7  left-9.5 -z-10'></div>
                <h3 className='text-xl font-semibold text-black'>Create an Account</h3>
                <p className='text-xs text-slate-700 mt-[5px] mb-6'>
                    Join us today by entering your details below
                </p>

                <form onSubmit={handleSignUp} className='form-for-signup z-10 overflow-y-auto'>

                    <ProfilePhotoSelector image={profilePic} setImage={setProfilePic} />
                    <div className='grid grid-cols-1 md:grid-cols-2 md:gap-4'>
                        <div className='col-span-2 md:col-span-1'>
                            <Input
                                value={fullName}
                                onChange={({ target }) => setFullName(target.value)}
                                label="Full Name"
                                placeholder="Shaf"
                                type="text"
                            />
                        </div>

                        <div className='col-span-2 md:col-span-1'>
                            <Input
                                value={email}
                                onChange={({ target }) => setEmail(target.value)}
                                label="Email Address"
                                placeholder="shaf@example.com"
                                type="text"
                            />
                        </div>
                        <div className='col-span-2'>
                            <Input
                                value={password}
                                onChange={({ target }) => setPassword(target.value)}
                                label="Password"
                                placeholder="Min 8 characters"
                                type="password"
                                autocomplete="new-password"
                            />
                        </div>
                    </div>
                    {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

                    {/* <button
                        type="submit"
                        className="group relative inline-flex items-center justify-center px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl shadow-md transition-all duration-300 active:scale-95"
                    >
                        <span className="mr-2">SIGN UP</span>
                        <FaArrowRight className="transform transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-2" />
                    </button> */}
                    <button
                        type="submit"
                        disabled={loading}
                        className="group relative inline-flex items-center justify-center px-6 py-3 bg-emerald-500 hover:bg-emerald-600 disabled:opacity-60 text-white font-semibold rounded-xl shadow-md transition-all duration-300 active:scale-95"
                    >
                        {loading ? (
                            <svg className="animate-spin h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                                <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                                <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                            </svg>
                        ) : (
                            <>
                                <span className="mr-2">LOGIN</span>
                                <FaArrowRight className="transform transition-transform duration-300 group-hover:translate-x-1 group-active:translate-x-2" />
                            </>
                        )}
                    </button>
                    <p className='text-[13px] text-slate-800 mt-3'>
                        Already have an account?{" "}
                        <Link className='font-medium text-emerald-500 underline' to="/login">login</Link>
                    </p>
                </form>
            </div>
        </AuthLayout>
    )
}

export default SignUp