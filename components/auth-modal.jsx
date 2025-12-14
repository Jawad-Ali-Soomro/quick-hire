"use client";

import { useState } from "react";
import { 
  MdEmail,
  MdLock,
  MdPerson,
  MdPhone,
  MdBusiness,
  MdArrowForward,
  MdClose
} from "react-icons/md";

export default function AuthModal({ isOpen, onClose }) {
  const [isLogin, setIsLogin] = useState(true);
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    confirmPassword: "",
    businessName: ""
  });

  if (!isOpen) return null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission
    console.log(isLogin ? "Login" : "Signup", formData);
    onClose();
  };

  return (
    <div 
      className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 dark:bg-white/20 backdrop-blur-md h-full min-h-screen"
      onClick={onClose}
    >
      <div 
        className="relative w-full max-w-md bg-white dark:bg-black border-black dark:border-white rounded-[30px] shadow-2xl max-h-[90vh] overflow-y-auto"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 w-10 h-10 flex items-center justify-center text-black dark:text-white hover:opacity-70 transition-opacity z-10"
        >
          <MdClose className="text-2xl" />
        </button>

        {/* Content */}
        <div className="p-8">
          {/* Header */}
          <div className="text-center mb-8">
            <h2 className="text-3xl sm:text-4xl font-black text-black dark:text-white mb-2">
              {isLogin ? "Welcome Back" : "Join QuickHire"}
            </h2>
            <p className="text-sm font-bold text-gray-600 dark:text-gray-400">
              {isLogin 
                ? "Sign in to access your account" 
                : "Create your account and start connecting"}
            </p>
          </div>

          {/* Toggle Buttons */}
          <div className="flex justify-center mb-6">
            <div className="inline-flex border-2 border-gray-300 dark:border-gray-700 rounded-[30px] p-1 bg-gray-50 dark:bg-gray-900">
              <button
                onClick={() => setIsLogin(true)}
                className={`px-6 py-2 rounded-[30px] font-bold cursor-pointer text-sm transition-all duration-300 ${
                  isLogin
                    ? "bg-black dark:bg-white text-white dark:text-black"
                    : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                }`}
              >
                Continue
              </button>
              <button
                onClick={() => setIsLogin(false)}
                className={`px-6 py-2 rounded-[30px] font-bold cursor-pointer text-sm transition-all duration-300 ${
                  !isLogin
                    ? "bg-black dark:bg-white text-white dark:text-black"
                    : "text-gray-600 dark:text-gray-400 hover:text-black dark:hover:text-white"
                }`}
              >
               Join Us!
              </button>
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-4">
            {!isLogin && (
              <>
                <div>
                  <div className="relative">
                    <MdPerson className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-400" />
                    <input
                      type="text"
                      name="name"
                      value={formData.name}
                      onChange={handleChange}
                      required={!isLogin}
                      placeholder="Full Name"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-[30px] bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors text-sm"
                    />
                  </div>
                </div>
                <div>
                  <div className="relative">
                    <MdPhone className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-400" />
                    <input
                      type="tel"
                      name="phone"
                      value={formData.phone}
                      onChange={handleChange}
                      required={!isLogin}
                      placeholder="Phone Number"
                      className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-[30px] bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors text-sm"
                    />
                  </div>
                </div>
               
              </>
            )}

            <div>
              <div className="relative">
                <MdEmail className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-400" />
                <input
                  type="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  placeholder="Email Address"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-[30px] bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors text-sm"
                />
              </div>
            </div>

            <div>
              <div className="relative">
                <MdLock className="absolute left-4 top-1/2 -translate-y-1/2 text-lg text-gray-400" />
                <input
                  type="password"
                  name="password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  placeholder="Password"
                  className="w-full pl-12 pr-4 py-3 border-2 border-gray-300 dark:border-gray-700 rounded-[30px] bg-white dark:bg-black text-black dark:text-white focus:outline-none focus:border-black dark:focus:border-white transition-colors text-sm"
                />
              </div>
            </div>

           
            {isLogin && (
              <div className="flex items-center justify-between text-xs">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input type="checkbox" className="w-4 h-4 rounded border-gray-300 dark:border-gray-700" />
                  <span className="text-gray-600 dark:text-gray-400 font-bold">Remember me</span>
                </label>
                <a href="#" className="text-black dark:text-white font-bold hover:opacity-80 transition-opacity">
                  Forgot password?
                </a>
              </div>
            )}

            <button
              type="submit"
              className="w-full py-3 bg-black dark:bg-white text-white dark:text-black font-black rounded-[30px] hover:opacity-90 transition-opacity flex items-center justify-center gap-2 border-2 border-black dark:border-white mt-4"
            >
              {isLogin ? "Sign In" : "Create Account"}
              <MdArrowForward className="text-lg" />
            </button>

            {!isLogin && (
              <p className="text-xs text-center text-gray-500 dark:text-gray-500 font-bold mt-2">
                By signing up, you agree to our{" "}
                <a href="#" className="text-black dark:text-white underline">Terms</a>{" "}
                and{" "}
                <a href="#" className="text-black dark:text-white underline">Privacy Policy</a>
              </p>
            )}
          </form>

          {/* Divider */}
          <div className="my-6 flex items-center gap-4">
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
            <span className="text-xs font-bold text-gray-500 dark:text-gray-500">OR</span>
            <div className="flex-1 h-px bg-gray-300 dark:bg-gray-700"></div>
          </div>

          {/* Social Login */}
          <div className="space-y-2">
            <button className="w-full py-3 border-2 border-gray-300 dark:border-gray-700 rounded-[30px] font-bold text-sm text-black dark:text-white hover:border-black dark:hover:border-white transition-all duration-300">
              Continue with Google
            </button>
           
          </div>
        </div>
      </div>
    </div>
  );
}
