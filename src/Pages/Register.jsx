
import { useForm } from "react-hook-form";
import { Link } from "react-router";
import useAuth from "../hooks/useAuth";
import SocialLogin from "../Components/SocialLogin";
import { toast } from "react-toastify";
import axios from "axios";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Register = () => {
  const { register, handleSubmit, formState:{errors}} = useForm()
  const {registerUser,updateUserProfile  } = useAuth();
  const axiosSecure = useAxiosSecure()


  const handleRegister = (data) => {
    const {email, password, name, } = data
    const profileImg= data.photoURL[0]
   
    console.log('after register', data);
    registerUser(email, password)
    .then(result =>{
      const formData = new FormData()
      formData.append('image', profileImg)
      const img_API_URL = `https://api.imgbb.com/1/upload?key=${import.meta.env.VITE_IMAGE_API_KEY}`
      axios.post(img_API_URL, formData)
      .then(res=>{
        const photoURL = res.data.data.url
        console.log(res.data.data.url);
        const userInfo ={
          email: email,
          displayName: name,
          photoURL: photoURL
        }
        axiosSecure.post('/users', userInfo)
        .then(res =>{
          if (res.data.insertedId) {
            console.log('user created in the db');
          }
        })
        //create user in the database
        const userProfile = {displayName: name, photoURL: photoURL}
        updateUserProfile(userProfile)
        .then(()=>{
          toast('Register Successful')
          console.log('user pf update done');
        })
        .catch(err=>{
          console.log(err);
        })
      })
      console.log(result.user);
      
    }) .catch(err=>{
      console.log(err);
    })
  }




  return (
    <div className="min-h-screen bg-slate-950 flex items-center justify-center px-4 py-12 relative overflow-hidden">

      <div className="absolute inset-0">
        <div className="absolute top-0 -left-10 w-96 h-96 bg-amber-500/30 rounded-full blur-3xl animate-pulse"></div>
        <div className="absolute bottom-0 -right-10 w-96 h-96 bg-cyan-500/30 rounded-full blur-3xl animate-pulse delay-1000"></div>
      </div>

      {/* Register Card */}
      <div className="bg-slate-900/80 backdrop-blur-xl rounded-3xl shadow-2xl border border-white/10 p-8 md:p-10">
        {/* Logo */}
        <div className="text-center mb-8">
          <Link to="/" className="inline-block">
            <h1 className="text-5xl font-black bg-gradient-to-r from-amber-400 via-yellow-400 to-cyan-400 
              bg-clip-text text-transparent">
              GOTRACK
            </h1>
          </Link>
          <p className="mt-3 text-gray-400 text-lg">Create your factory account</p>
        </div>

        <form onSubmit={handleSubmit(handleRegister)} className="space-y-6 ">
          {/* Name */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Full Name</label>
            <input
              type="text"
              {...register('name', { required: true })}
              name="name"
              className="w-full px-5 py-4 bg-slate-800/50 border border-white/20 rounded-xl text-white 
              placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
              placeholder="Md. Rahim Khan"
            />
            {
              errors.name?.type==='required' && <p className="text-red-400">set name</p>
            }
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Email Address</label>
            <input
              type="email"
              {...register('email', { required: true })}
              name="email"
              className="w-full px-5 py-4 bg-slate-800/50 border border-white/20 rounded-xl text-white 
              placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
              placeholder="rahim@factory.com"
            />
            {
              errors.email?.type==='required' && <p className="text-red-400">set email</p>
            }
          </div>

          {/* Photo URL */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Photo URL</label>
            <input
              {...register('photoURL', { required: true })}
              name="photoURL"
              type="file"
              className="w-full file-input file-input-neutral"
              placeholder="https://example.com/photo.jpg"
            />
            {
              errors.photoURL?.type==='required' && <p className="text-red-400">set photoURL</p>
            }
          </div>

          {/* Role Dropdown */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">I am a</label>
            <select
              name="role"
              {...register('role', { required: true })}
              className="w-full px-5 py-4 bg-slate-800/50 border border-white/20 rounded-xl text-white 
                focus:outline-none focus:ring-4 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
            >
              <option value="buyer">Buyer / Merchandiser</option>
              <option value="manager">Factory Manager / Owner</option>
            </select>
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-gray-300 mb-2">Password</label>
            <input
              type="password"
              {...register('password', { required: true, minLength: 6,pattern: /^(?=.*[a-z])(?=.*[A-Z]).{6,}$/})}
              name="password"
              className="w-full px-5 py-4 bg-slate-800/50 border border-white/20 rounded-xl text-white
              placeholder-gray-500 focus:outline-none focus:ring-4 focus:ring-amber-500/50 focus:border-amber-500 transition-all"
              placeholder="••••••••"
            />
            {
              errors.password?.type==='required' && <p className="text-red-400">set your password</p>
            }
            {
              errors.password?.type === 'minLength' && <p className="text-red-400">Length at least 6 character & one upperCase & one lowerCase</p>
            }
            {
              errors.password?.type === 'pattern' && <p className="text-red-400">Length at least 6 character & one upperCase & one lowerCase</p>
            }
          </div>


          {/* Submit Button */}
          <button
            type="submit"
            className="w-full py-4 bg-gradient-to-r from-amber-500 to-amber-600 hover:from-amber-600 
              hover:to-amber-700 text-black font-bold text-lg rounded-xl shadow-xl shadow-amber-500/30 transform hover:scale-105 transition-all duration-300"
          >
            Create Account
          </button>

          {/* Google */}
          <div className="flex justify-center">
           <SocialLogin />
          </div>
        </form>

        {/* Login Link */}
        <div className="mt-8 text-center">
          <p className="text-gray-400">
            Already have an account?{" "}
            <Link to="/login" className="font-bold text-amber-400 hover:text-amber-300 transition">
              Sign In
            </Link>
          </p>
        </div>
      </div>
    </div>
  );
};

export default Register;