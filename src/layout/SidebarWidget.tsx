import { useNavigate } from "react-router";
import { useAuthStore } from "../stores/authStore";

export default function SidebarWidget() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();

  const handleLogout = () => {
    if (confirm("Are you sure you want to logout?")) {
      logout();
      navigate("/login");
    }
  };

  return (
    <div className="mx-auto mb-10 w-full max-w-60">
      <button
        onClick={handleLogout}
        className="flex items-center justify-center gap-2 w-full p-3 font-medium text-white rounded-lg bg-red-500 hover:bg-red-600 transition-colors">
        <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        Logout
      </button>
    </div>
  );
}
