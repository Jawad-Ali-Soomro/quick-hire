"use client";

import Link from "next/link";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { useAuth } from "@/contexts/AuthContext";
import { 
  MdEmail,
  MdLock,
  MdPerson,
  MdPhone,
  MdArrowForward
} from "react-icons/md";

export default function Join() {
  const router = useRouter();
  const { login, register } = useAuth();
  const [isLogin, setIsLogin] = useState(true);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: ""
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    setError("");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      let result;
      if (isLogin) {
        result = await login(formData.email, formData.password);
      } else {
        if (!formData.name || !formData.phone) {
          setError("All fields are required");
          setLoading(false);
          return;
        }
        result = await register(formData);
      }

      if (result.success) {
        router.push('/');
      } else {
        setError(result.error || "An error occurred");
      }
    } catch (err) {
      setError("An error occurred. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="w-full min-h-screen bg-gray-100 dark:bg-black font-sans flex items-center justify-center p-4">
      <div className="w-full max-w-md">
        <div className="bg-white dark:bg-black border-black dark:border-white rounded-[30px] p-8">
          {/* Header */}
          <div className="text-center mb-8">
           
           
            <h2 className="text-3xl sm:text-4xl font-black text-black dark:text-white mb-2 mt-10">
            <Link href="/" className="flex items-center z-50 w-full justify-center">
              <span className="text-3xl font-black text-black dark:text-white">
                QuickHire<sup className="text-xs md:text-sm align-super">™</sup>
              </span>
            </Link>
            </h2>
            <p className="text-sm font-bold text-gray-600 dark:text-gray-400">
              {isLogin 
                ? "Sign in to access your account" 
                : "Create your account and start connecting"}
            </p>
          </div>

          {error && (
            <div className="mb-4 p-3 bg-red-100 dark:bg-red-900/30 border-2 border-red-300 dark:border-red-700 rounded-[30px]">
              <p className="text-sm font-bold text-red-600 dark:text-red-400 text-center">{error}</p>
            </div>
          )}

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
              disabled={loading}
              className="w-full py-3 bg-black dark:bg-white text-white dark:text-black font-black rounded-[30px] hover:opacity-90 transition-opacity flex items-center justify-center gap-2 border-2 border-black dark:border-white mt-4 disabled:opacity-50 disabled:cursor-not-allowed"
            >
              {loading ? "Processing..." : isLogin ? "Sign In" : "Create Account"}
              {!loading && <MdArrowForward className="text-lg" />}
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

          {/* Toggle Buttons */}
          <div className="flex justify-center gap-3">
            {isLogin ? (
              <button
                onClick={() => setIsLogin(false)}
                className="px-6 py-3 border-2 w-full border-gray-300 dark:border-gray-700 rounded-[30px] font-black text-sm text-black dark:text-white hover:border-black dark:hover:border-white transition-all duration-300"
              >
                Register
              </button>
            ) : (
              <button
                onClick={() => setIsLogin(true)}
                className="px-6 py-3 border-2 w-full border-gray-300 dark:border-gray-700 rounded-[30px] font-black text-sm text-black dark:text-white hover:border-black dark:hover:border-white transition-all duration-300"
              >
                Login
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
