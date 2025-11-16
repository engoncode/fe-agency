import React, { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../../stores/authStore";
import { authService } from "../../services/auth.service";

const Login: React.FC = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
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
    <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 font-sans">
      <div className="relative w-full max-w-md bg-gray-800/50 backdrop-blur-sm rounded-2xl shadow-2xl overflow-hidden border border-purple-500/30">
        <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] animate-pulse"></div>
        <div className="p-8">
          <img src="images/logo/sd-logo.svg" alt="Logo" className=" mx-auto mb-6" />
          <p className="text-center text-gray-400 mb-8">Welcome back, please login to your account.</p>
          <form onSubmit={handleLogin} className="space-y-6">
            <div>
              <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-400">
                Email Address
              </label>
              <input
                id="email"
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300"
                placeholder="you@example.com"
                required
              />
            </div>
            <div>
              <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-400">
                Password
              </label>
              <input
                id="password"
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full p-3 bg-gray-900/50 border border-gray-700 rounded-lg focus:ring-2 focus:ring-purple-500 focus:border-purple-500 outline-none transition-all duration-300"
                placeholder="••••••••"
                required
              />
            </div>
            {error && <p className="text-[#EF4444] text-sm text-center">{error}</p>}
            <button
              type="submit"
              disabled={loading}
              className="w-full font-semibold text-white p-3 rounded-lg bg-gradient-to-r from-[#833AB4] via-[#FD1D1D] to-[#FCAF45] hover:opacity-90 transition-opacity duration-300 disabled:opacity-50 disabled:cursor-not-allowed">
              {loading ? "Authenticating..." : "Login"}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
