import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/Inputs/Input.jsx';
import AuthLayout from '../../components/layouts/AuthLayout.jsx';
import { useContext, useState } from 'react';
import { FaArrowRight } from 'react-icons/fa6';
import { validateEmail } from '../../utils/helper.js';
import { API_PATHS } from '../../utils/apiPaths.js';
import axiosInstance from '../../utils/axiosInstance.js';
import { UserContext } from '../../context/UserContext.jsx';



const Login = () => {

    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);
    const [loading, setLoading] = useState(false);

    const { updateUser } = useContext(UserContext);


    const navigate = useNavigate();


    const handleLogin = async (e) => {
        e.preventDefault();

        if (!validateEmail(email)) {
            setError("Please enter a valid email address.");
            return;
        }

        if (!password) {
            setError("Please enter a valid password.");
            return;
        }

        setError("");
        //Login API call
        try {
            setLoading(true)

            const delay = new Promise(resolve => setTimeout(resolve, 1000));

            const [response] = await Promise.all([
                axiosInstance.post(API_PATHS.AUTH.LOGIN, { email, password }),
                delay
            ]);
            // const response = await axiosInstance.post(API_PATHS.AUTH.LOGIN, {
            //     email,
            //     password,
            // });

            const { token, user } = response.data;

            if (token) {
                localStorage.setItem('token', token);
                updateUser(user);
                navigate("/dashboard");
            }
        } catch (error) {
            if (error.response && error.response.data.message) {
                setError(error.response.data.message);
            } else {
                setError("Something went wrong. Please try again.");
            }
        } finally {
            setLoading(false)
        }
    }


    return (
        <AuthLayout>
            <div className='lg:w-[70%] h-3/4 md:h-full flex flex-col justify-center z-10'>
                <div className='w-10 h-10 rounded-[40px] bg-emerald-500 absolute top-7  left-9.5 -z-10'></div>
                <div className='text-xl font-semibold text-black mt-30'>Welcome Back</div>
                <p className='text-xs text-slate-700 mt-[5px] mb-6'>Please enter your details to log in</p>

                <form onSubmit={handleLogin} className='z-10'>
                    <Input
                        value={email}
                        onChange={({ target }) => setEmail(target.value)}
                        label="Email Address"
                        placeholder="shaf@example.com"
                        type="text"
                    />

                    <Input
                        value={password}
                        onChange={({ target }) => setPassword(target.value)}
                        label="Password"
                        placeholder="Min 8 characters"
                        type="password"
                    />

                    {error && <p className='text-red-500 text-xs pb-2.5'>{error}</p>}

                    {/* <button
                        type="submit"
                        className="group relative inline-flex items-center justify-center px-6 py-3 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-xl shadow-md transition-all duration-300 active:scale-95"
                    >
                        <span className="mr-2">LOGIN</span>
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
                        Don't have an account?{" "}
                        <Link className="font-medium text-emerald-500 underline" to="/signup">
                            SignUp
                        </Link>
                    </p>

                </form>
            </div>
        </AuthLayout>
    )


}
export default Login;



