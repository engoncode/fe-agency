import { useState } from "react";
import { useNavigate } from "react-router";
import { useAuthStore } from "../stores/authStore";
import ConfirmationDialog from "../components/notifications/ConfirmationDialog";
import { useNotification } from "../components/notifications/NotificationProvider";

export default function SidebarWidget() {
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { showSuccess } = useNotification();

  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const handleLogout = () => {
    setConfirmationOpen(true);
  };

  const doLogout = async () => {
    try {
      setIsLoggingOut(true);
      // perform logout
      logout();
      showSuccess("Logged out", "You have been logged out.");
      navigate("/login");
    } catch (err) {
      // nothing special here for now
    } finally {
      setIsLoggingOut(false);
      setConfirmationOpen(false);
    }
  };

  return (
    <div className="mx-auto mb-10 w-full max-w-60">
      <button
        onClick={handleLogout}
        className="flex items-center justify-center gap-2 w-full p-3 font-medium text-gray-700 dark:text-gray-300 rounded-md border border-gray-100 dark:border-gray-700 bg-transparent hover:bg-gray-50 dark:hover:bg-white/5 transition-colors">
        <svg className="w-5 h-5 text-gray-700 dark:text-gray-300" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          />
        </svg>
        Logout
      </button>

      <ConfirmationDialog
        isOpen={confirmationOpen}
        title="Confirm Logout"
        message="Are you sure you want to logout?"
        confirmText="Logout"
        cancelText="Cancel"
        type="warning"
        isLoading={isLoggingOut}
        onConfirm={doLogout}
        onCancel={() => setConfirmationOpen(false)}
      />
    </div>
  );
}
