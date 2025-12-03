import { useState } from "react";
import { Link, useLocation, useNavigate } from "react-router";

// Icons
import { GridIcon } from "../icons";
import { useSidebar } from "../context/SidebarContext";
import { useAuthStore } from "../stores/authStore";
import { useNotification } from "../components/notifications/NotificationProvider";
import ConfirmationDialog from "../components/notifications/ConfirmationDialog";

type MenuItem = {
  name: string;
  icon: React.ReactNode;
  path: string;
};

type NavGroup = {
  header: string;
  items: MenuItem[];
};

// SVG Icon Components
const MegaphoneIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M21 6L9 12L21 18V6Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 12H3V18H9" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
    <path d="M9 18L7 22" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const UsersIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M17 21V19C17 17.9391 16.5786 16.9217 15.8284 16.1716C15.0783 15.4214 14.0609 15 13 15H5C3.93913 15 2.92172 15.4214 2.17157 16.1716C1.42143 16.9217 1 17.9391 1 19V21"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M9 11C11.2091 11 13 9.20914 13 7C13 4.79086 11.2091 3 9 3C6.79086 3 5 4.79086 5 7C5 9.20914 6.79086 11 9 11Z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M23 21V19C22.9993 18.1137 22.7044 17.2528 22.1614 16.5523C21.6184 15.8519 20.8581 15.3516 20 15.13"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M16 3.13C16.8604 3.35031 17.623 3.85071 18.1676 4.55232C18.7122 5.25392 19.0078 6.11683 19.0078 7.005C19.0078 7.89318 18.7122 8.75608 18.1676 9.45769C17.623 10.1593 16.8604 10.6597 16 10.88"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const FileTextIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M14 2H6a2 2 0 00-2 2v16a2 2 0 002 2h12a2 2 0 002-2V8z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path
      d="M14 2v6h6M16 13H8M16 17H8M10 9H8"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

const TagsIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M20.59 13.41l-7.17 7.17a2 2 0 01-2.83 0L2 12V2h10l8.59 8.59a2 2 0 010 2.82z"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
    <path d="M7 7h.01" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const LogoutIcon = () => (
  <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path
      d="M9 21H5a2 2 0 01-2-2V5a2 2 0 012-2h4M16 17l5-5m0 0l-5-5m5 5H9"
      stroke="currentColor"
      strokeWidth="2"
      strokeLinecap="round"
      strokeLinejoin="round"
    />
  </svg>
);

// Navigation Groups
const navGroups: NavGroup[] = [
  {
    header: "MENU",
    items: [{ name: "Dashboard", icon: <GridIcon />, path: "/" }],
  },
  {
    header: "CAMPAIGN",
    items: [
      { name: "All Campaigns", icon: <MegaphoneIcon />, path: "/campaigns" },
      { name: "Posts", icon: <FileTextIcon />, path: "/posts" },
    ],
  },
  {
    header: "INFLUENCER",
    items: [
      { name: "Talents", icon: <UsersIcon />, path: "/influencers" },
      { name: "Categories", icon: <TagsIcon />, path: "/influencer-categories" },
    ],
  },
];

const AppSidebar: React.FC = () => {
  const { isExpanded, isMobileOpen, isHovered, setIsHovered } = useSidebar();
  const location = useLocation();
  const navigate = useNavigate();
  const { logout } = useAuthStore();
  const { showSuccess } = useNotification();

  const [confirmationOpen, setConfirmationOpen] = useState(false);
  const [isLoggingOut, setIsLoggingOut] = useState(false);

  const isActive = (path: string) => location.pathname === path;

  const handleLogout = () => {
    setConfirmationOpen(true);
  };

  const doLogout = async () => {
    try {
      setIsLoggingOut(true);
      logout();
      showSuccess("Logged out", "You have been logged out.");
      navigate("/login");
    } catch (err) {
      // handle error if needed
    } finally {
      setIsLoggingOut(false);
      setConfirmationOpen(false);
    }
  };

  return (
    <aside
      className={`fixed flex flex-col top-0 left-0 bg-white dark:bg-gray-900 dark:border-gray-800 text-gray-900 h-screen transition-all duration-300 ease-in-out border-r border-gray-200 
        ${isExpanded || isMobileOpen ? "w-[290px]" : isHovered ? "w-[290px]" : "w-[90px]"}
        ${isMobileOpen ? "translate-x-0 z-50" : "-translate-x-full lg:translate-x-0 z-40"}
        lg:z-40 px-5`}
      onMouseEnter={() => !isExpanded && setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}>
      {/* Logo */}
      <div className={`py-8 flex ${!isExpanded && !isHovered ? "lg:justify-center" : "justify-start"}`}>
        <Link to="/">
          {isExpanded || isHovered || isMobileOpen ? (
            <>
              <img className="dark:hidden" src="/images/logo/sd-logo-dark.svg" alt="Logo" width={150} height={40} />
              <img className="hidden dark:block" src="/images/logo/sd-logo.svg" alt="Logo" width={150} height={40} />
            </>
          ) : (
            <img src="/images/logo/sd-logo-icon.svg" alt="Logo" width={32} height={32} />
          )}
        </Link>
      </div>

      {/* Scrollable Menu Area */}
      <div className="flex-1 flex flex-col overflow-y-auto duration-300 ease-linear no-scrollbar pb-4">
        <nav className="flex flex-col">
          {navGroups.map((group, groupIndex) => (
            <div key={group.header}>
              {/* Section Header */}
              {(isExpanded || isHovered || isMobileOpen) && (
                <h3
                  className={`text-xs font-bold text-slate-400 dark:text-slate-500 uppercase tracking-wider mb-2 px-3 ${
                    groupIndex === 0 ? "" : "mt-6"
                  }`}>
                  {group.header}
                </h3>
              )}

              {/* Menu Items */}
              <ul className="space-y-1">
                {group.items.map((item) => (
                  <li key={item.path}>
                    <Link
                      to={item.path}
                      className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors ${
                        !isExpanded && !isHovered ? "lg:justify-center" : ""
                      } ${
                        isActive(item.path)
                          ? "bg-sky-50 text-sky-700 dark:bg-sky-900/20 dark:text-sky-400"
                          : "text-slate-600 hover:bg-slate-100 hover:text-slate-900 dark:text-slate-400 dark:hover:bg-slate-800 dark:hover:text-slate-200"
                      }`}>
                      <span className="flex-shrink-0 w-5 h-5">{item.icon}</span>
                      {(isExpanded || isHovered || isMobileOpen) && <span>{item.name}</span>}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          ))}
        </nav>
      </div>

      {/* Sticky Logout Footer */}
      <div className="mt-auto sticky bottom-0 pb-6 pt-4 bg-white dark:bg-gray-900 border-t border-slate-200 dark:border-slate-700">
        <button
          onClick={handleLogout}
          className={`flex items-center gap-3 px-3 py-2 rounded-lg text-sm font-medium transition-colors w-full ${
            !isExpanded && !isHovered ? "lg:justify-center" : ""
          } text-slate-500 hover:text-red-600 hover:bg-red-50 dark:text-slate-400 dark:hover:text-red-400 dark:hover:bg-red-900/20`}>
          <span className="flex-shrink-0 w-5 h-5">
            <LogoutIcon />
          </span>
          {(isExpanded || isHovered || isMobileOpen) && <span>Logout</span>}
        </button>
      </div>

      {/* Confirmation Dialog */}
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
    </aside>
  );
};

export default AppSidebar;
