import { useEffect } from "react";
import { useForm, SubmitHandler } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useLoginMutation } from "../redux/slices/api/authApiSlice";
import { toast } from "sonner";
import { setCredentials } from "../redux/slices/authSlice";
import { Loader } from "../components/Loader";

type LoginData = {
  email: string;
  password: string;
}
export const Login = () => {

  const {user} = useSelector((state:any) => state.auth);
  const {register, handleSubmit, formState: {errors}} = useForm<LoginData>();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const [login, {isLoading}] = useLoginMutation();
 
  const submitHandler:SubmitHandler<LoginData> = async(data:any) => {
    try {
      const result = await login(data).unwrap();
      dispatch(setCredentials(result));
      navigate("/");
    } catch (error:any) {
      console.log(error);
      toast.error(error?.data?.message || error.message);
    }
  }

  useEffect(()=> {
    user ? navigate('/dashboard') : navigate('/login')
  },[user])

  return (
    <div className="w-full min-h-screen flex flex-col justify-center items-center bg-[#f3f4f6]">
      
      {/* Login container */}
      <div className="w-full max-w-5xl p-8">
        <h2 className="text-4xl font-semibold text-center mb-4 animate-bounce">TaskMate:Cloud based Task Manager</h2>
        <p className="text-center text-gray-500 mb-6 font-semibold">Log into TaskMate</p>

        {/* Login form */}
        <div className="flex justify-center flex-col md:flex-row items-center">

        <form className="space-y-4 md:space-y-8 w-3/4 md:w-2/4" onSubmit={handleSubmit(submitHandler)}>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email Address</label>
              <input
                type="email"
                id="email"
                placeholder="name@example.com"
                {...register('email', {
                  required: "Email address is required",
                  pattern: {
                    value: /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,4}$/,
                    message: "Please enter a valid email address"
                  }
                })}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500"
              />
              {/* Error message */}
              {errors.email && <p className="text-sm text-red-500 mt-1"> {errors.email.message}</p>}
            </div>
            <div>
              <label htmlFor="password" className="block text-sm font-medium text-gray-700">Password</label>
              <input
                type="password"
                id="password"
                placeholder="Password"
                {...register('password', {
                  required: "Password is required",
                  minLength: {
                    value: 6,
                    message: "Password must be at least 6 characters long"
                  }
                })}
                className="mt-1 w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 mb-3"
              />
              {errors.password && <p className="text-sm text-red-500 mt-1">{errors.password.message}</p>}
              <button className="text-sm font-medium text-blue-600">Forgot password ?</button>
            </div>
            {isLoading ? <Loader /> : (
              <button
              type="submit"
              className="w-full py-2 mt-4 bg-gray-800 text-white rounded-md font-medium hover:bg-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Log In
            </button>
            )}
          </form>

          <div className="flex items-center my-6">
            <hr className="flex-grow border-gray-300" />
            <span className="px-4 text-gray-500 text-sm">OR</span>
            <hr className="flex-grow border-gray-300" />
          </div>

          {/* OAuth Buttons */}
          <div className="space-y-3 md:space-y-6 w-3/4 md:w-2/4">
            <button className="w-full flex items-center justify-evenly py-2 border border-gray-300 rounded-md hover:bg-gray-50">
            <img src="https://img.icons8.com/?size=100&id=17949&format=png&color=000000" alt="Google Logo" className="w-5 h-5 mr-2" />
              Continue with Google
            </button>
            <button className="w-full flex items-center justify-evenly py-2 border border-gray-300 rounded-md hover:bg-gray-50">
              <img src="https://img.icons8.com/?size=100&id=12599&format=png&color=000000" alt="GitHub Logo" className="w-5 h-5 mr-2" />
              Continue with GitHub
            </button>
            <button className="w-full flex items-center justify-evenly py-2 border border-gray-300 rounded-md hover:bg-gray-50 text-[15px]">
            <img src="https://img.icons8.com/?size=100&id=uLWV5A9vXIPu&format=png&color=000000" alt="Facebook Logo" className="w-5 h-5 mr-2" />
              Continue with Facebook
            </button>
          </div>

        </div>

        {/* Can't log in? */}
        <div className="mt-6 text-center">
          <a href="#" className="text-sm text-blue-600 hover:underline">Can't log in?</a>
        </div>

        {/* reCAPTCHA message */}
        <div className="mt-4 text-center text-xs text-gray-400">
          Secure Login with reCAPTCHA subject to Google <a href="#" className="underline">Terms</a> and <a href="#" className="underline">Privacy</a>
        </div>
      </div>
    </div>
  );
}
