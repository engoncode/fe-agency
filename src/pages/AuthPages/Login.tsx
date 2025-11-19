import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../stores/authStore";
import { authService } from "../../services/auth.service";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();
  const { setToken } = useAuthStore();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const response = await authService.login({ email, password });

      // Response API menggunakan access_token, bukan token
      if (response.data && response.data.access_token) {
        const { access_token, user } = response.data;
        setToken(access_token, user);
        navigate("/");
      } else {
        setError("Login failed: No token received.");
      }
    } catch (err: any) {
      setError(err.response?.data?.message || "Invalid email or password.");
      console.error("Login error:", err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen relative overflow-hidden flex items-center justify-center p-4">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-blue-900 to-pink-900">
        {/* Animated Orbs */}
        <div className="absolute top-0 left-0 w-96 h-96 bg-purple-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob"></div>
        <div className="absolute top-0 right-0 w-96 h-96 bg-yellow-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-2000"></div>
        <div className="absolute bottom-0 left-1/2 w-96 h-96 bg-pink-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-4000"></div>
        <div className="absolute bottom-0 right-0 w-96 h-96 bg-blue-500 rounded-full mix-blend-multiply filter blur-3xl opacity-70 animate-blob animation-delay-6000"></div>

        {/* Grid Pattern */}
        <div className="absolute inset-0 bg-grid-pattern opacity-10"></div>
      </div>

      {/* Login Card */}
      <div className="relative z-10 w-full max-w-md">
        {/* Glowing Effect */}
        <div className="absolute -inset-1 bg-gradient-to-r from-purple-600 via-pink-600 to-blue-600 rounded-2xl blur opacity-75 group-hover:opacity-100 transition duration-1000 group-hover:duration-200 animate-tilt"></div>

        <div className="relative bg-white dark:bg-gray-900 rounded-2xl shadow-2xl overflow-hidden">
          {/* Top Gradient Bar */}
          <div className="h-2 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500"></div>

          <div className="p-8">
            {/* Logo */}
            <div className="flex justify-center mb-8">
              {/* <img src="images/logo/sd-logo.svg" alt="Logo" className="h-16 w-auto" /> */}
            </div>

            {/* Title */}
            <h1 className="text-3xl font-bold text-center mb-2 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 bg-clip-text text-transparent">
              Welcome Back!
            </h1>
            <p className="text-center text-gray-600 dark:text-gray-400 mb-8">Sign in to continue to your dashboard</p>

            <form onSubmit={handleLogin} className="space-y-5">
              {/* Email Input */}
              <div>
                <label htmlFor="email" className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Email Address
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  <input
                    id="email"
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="relative w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 outline-none transition-all duration-300 text-gray-900 dark:text-white"
                    placeholder="you@example.com"
                    required
                  />
                  <div className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth={2}
                        d="M16 12a4 4 0 10-8 0 4 4 0 008 0zm0 0v1.5a2.5 2.5 0 005 0V12a9 9 0 10-9 9m4.5-1.206a8.959 8.959 0 01-4.5 1.207"
                      />
                    </svg>
                  </div>
                </div>
              </div>

              {/* Password Input */}
              <div>
                <label htmlFor="password" className="block mb-2 text-sm font-semibold text-gray-700 dark:text-gray-300">
                  Password
                </label>
                <div className="relative group">
                  <div className="absolute inset-0 bg-gradient-to-r from-purple-600 to-pink-600 rounded-lg opacity-0 group-hover:opacity-20 transition-opacity"></div>
                  <input
                    id="password"
                    type={showPassword ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="relative w-full px-4 py-3 bg-gray-50 dark:bg-gray-800 border-2 border-gray-200 dark:border-gray-700 rounded-lg focus:border-purple-500 focus:ring-4 focus:ring-purple-500/20 outline-none transition-all duration-300 text-gray-900 dark:text-white"
                    placeholder="••••••••"
                    required
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors">
                    {showPassword ? (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                        />
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"
                        />
                      </svg>
                    ) : (
                      <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M13.875 18.825A10.05 10.05 0 0112 19c-4.478 0-8.268-2.943-9.543-7a9.97 9.97 0 011.563-3.029m5.858.908a3 3 0 114.243 4.243M9.878 9.878l4.242 4.242M9.88 9.88l-3.29-3.29m7.532 7.532l3.29 3.29M3 3l3.59 3.59m0 0A9.953 9.953 0 0112 5c4.478 0 8.268 2.943 9.543 7a10.025 10.025 0 01-4.132 5.411m0 0L21 21"
                        />
                      </svg>
                    )}
                  </button>
                </div>
              </div>

              {/* Error Message */}
              {error && (
                <div className="flex items-center gap-2 p-3 bg-red-50 dark:bg-red-900/20 border border-red-200 dark:border-red-800 rounded-lg">
                  <svg
                    className="w-5 h-5 text-red-500 flex-shrink-0"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"
                    />
                  </svg>
                  <p className="text-sm text-red-600 dark:text-red-400">{error}</p>
                </div>
              )}

              {/* Login Button */}
              <button type="submit" disabled={loading} className="relative w-full group overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 transition-transform group-hover:scale-105 group-disabled:scale-100"></div>
                <div className="absolute inset-0 bg-gradient-to-r from-purple-600 via-pink-500 to-blue-500 opacity-0 group-hover:opacity-100 blur-xl transition-opacity"></div>
                <span className="relative block px-6 py-3 text-white font-semibold rounded-lg transition-all duration-300">
                  {loading ? (
                    <span className="flex items-center justify-center gap-2">
                      <svg className="animate-spin h-5 w-5" fill="none" viewBox="0 0 24 24">
                        <circle
                          className="opacity-25"
                          cx="12"
                          cy="12"
                          r="10"
                          stroke="currentColor"
                          strokeWidth="4"></circle>
                        <path
                          className="opacity-75"
                          fill="currentColor"
                          d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Signing in...
                    </span>
                  ) : (
                    "Sign In"
                  )}
                </span>
              </button>
            </form>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-sm text-gray-600 dark:text-gray-400">
                Don't have an account?{" "}
                <button className="text-purple-600 dark:text-purple-400 hover:underline font-semibold">Sign up</button>
              </p>
            </div>
          </div>
        </div>
      </div>

      <style>{`
        @keyframes blob {
          0%, 100% { transform: translate(0, 0) scale(1); }
          25% { transform: translate(20px, -50px) scale(1.1); }
          50% { transform: translate(-20px, 20px) scale(0.9); }
          75% { transform: translate(50px, 50px) scale(1.05); }
        }
        
        @keyframes tilt {
          0%, 100% { transform: rotate(0deg); }
          25% { transform: rotate(1deg); }
          75% { transform: rotate(-1deg); }
        }
        
        .animate-blob {
          animation: blob 7s infinite;
        }
        
        .animation-delay-2000 {
          animation-delay: 2s;
        }
        
        .animation-delay-4000 {
          animation-delay: 4s;
        }
        
        .animation-delay-6000 {
          animation-delay: 6s;
        }
        
        .animate-tilt {
          animation: tilt 10s infinite linear;
        }
        
        .bg-grid-pattern {
          background-image: 
            linear-gradient(to right, rgba(255, 255, 255, 0.1) 1px, transparent 1px),
            linear-gradient(to bottom, rgba(255, 255, 255, 0.1) 1px, transparent 1px);
          background-size: 50px 50px;
        }
      `}</style>
    </div>
  );
};

export default Login;
