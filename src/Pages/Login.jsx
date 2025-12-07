
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";
import SocialLogin from "../Components/SocialLogin";

const Login = () => {
  const {signInUser} = useAuth()
  const { register, handleSubmit, formState: { errors } } = useForm()

  const handleLogin = (data) => {
    console.log('form data', data);
    signInUser(data.email, data.password)
    .then(result=>{
      console.log(result.user);
    }) .catch(err =>{
      console.log(err);
    })
  };

  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12 relative overflow-hidden">
      {/* Animated Background Blobs */}
      <div className="absolute inset-0">
        <div className="absolute top-0 -left-4 w-96 h-96 bg-amber-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 -right-4 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>


      {/* Login Card */}
      <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-8 md:p-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-4xl md:text-5xl font-black bg-gradient-to-r from-amber-400 via-yellow-400 to-cyan-400 bg-clip-text text-transparent">
              GOTRACK
            </h1>
          </Link>
          <p className="mt-3 text-gray-400 text-lg">Welcome back to your factory dashboard</p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit(handleLogin)} className="space-y-6">
          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <input
              type="email"
              name="email"
              required
              {...register('email', { required: true })}
              className="w-full px-5 py-4 bg-slate-800/50 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-amber-500/50 focus:border-amber-500 transition-all duration-300"
              placeholder="manager@factory.com"
            />
            {
              errors.email?.type === 'required' && <p className="text-red-400">set an email</p>
            }
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input
              type="password"
              name="password"
              required
              {...register('password', { required: true, minLength: 6, pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/ })}
              className="w-full px-5 py-4 bg-slate-800/50 border border-white/20 rounded-xl text-white placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-amber-500/50 focus:border-amber-500 transition-all duration-300"
              placeholder="••••••••"
            />
            {
              errors.password?.type === 'required' && <p className="text-red-400">validation your password</p>
            }
            {
              errors.password?.type === 'minLength' && <p className="text-red-400">Length at least 6 character & one upperCase & one lowerCase</p>
            }
            {
              errors.password?.type === 'pattern' && <p className="text-red-400">Length at least 6 character & one upperCase & one lowerCase</p>
            }
          </div>

          {/* 
            <div className="flex items-center justify-between text-sm">
              <label className="flex items-center gap-2 text-gray-400">
                <input type="checkbox" className="w-4 h-4 rounded bg-slate-700 border-white/20 text-amber-500 focus:ring-amber-500" />
                Remember me
              </label>
              <Link to="/forgot-password" className="text-amber-400 hover:text-amber-300 transition">
                Forgot password?
              </Link>
            </div> */}

          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 hover:to-amber-700 text-black font-bold text-lg rounded-xl shadow-xl shadow-amber-500/30 transform hover:scale-105 transition-all duration-300"
          >
            Sign In to Dashboard
          </button>
          {/* Google */}
          <div className="flex justify-center ">
          <SocialLogin />
          </div>
        </form>

        {/* Divider */}
        <div className="mt-8 flex items-center gap-4">
          <div className="flex-1 h-px bg-white/10"></div>
          <span className="text-gray-500 text-sm">or</span>
          <div className="flex-1 h-px bg-white/10"></div>
        </div>

        {/* Register Link */}
        <div className="mt-6 text-center">
          <p className="text-gray-400">
            Don't have an account?{" "}
            <Link to="/register" className="font-bold text-amber-400 hover:text-amber-300 transition">
              Create New Account
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Login;