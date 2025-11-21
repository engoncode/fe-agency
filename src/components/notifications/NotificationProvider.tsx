import React, { createContext, useContext, useState, ReactNode } from "react";
import Toast, { Notification, NotificationType } from "./Toast";

interface NotificationContextType {
  showNotification: (type: NotificationType, title: string, message?: string, duration?: number) => void;
  showSuccess: (title: string, message?: string, duration?: number) => void;
  showError: (title: string, message?: string, duration?: number) => void;
  showWarning: (title: string, message?: string, duration?: number) => void;
  showInfo: (title: string, message?: string, duration?: number) => void;
}

const NotificationContext = createContext<NotificationContextType | undefined>(undefined);

export const useNotification = () => {
  const context = useContext(NotificationContext);
  if (!context) {
    throw new Error("useNotification must be used within a NotificationProvider");
  }
  return context;
};

interface NotificationProviderProps {
  children: ReactNode;
}

export const NotificationProvider: React.FC<NotificationProviderProps> = ({ children }) => {
  const [notifications, setNotifications] = useState<Notification[]>([]);

  const showNotification = (type: NotificationType, title: string, message?: string, duration?: number) => {
    const id = Date.now().toString() + Math.random().toString(36).substr(2, 9);
    const notification: Notification = {
      id,
      type,
      title,
      message,
      duration: duration || 5000,
    };

    setNotifications((prev) => [...prev, notification]);
  };

  const showSuccess = (title: string, message?: string, duration?: number) => {
    showNotification("success", title, message, duration);
  };

  const showError = (title: string, message?: string, duration?: number) => {
    showNotification("error", title, message, duration);
  };

  const showWarning = (title: string, message?: string, duration?: number) => {
    showNotification("warning", title, message, duration);
  };

  const showInfo = (title: string, message?: string, duration?: number) => {
    showNotification("info", title, message, duration);
  };

  const removeNotification = (id: string) => {
    setNotifications((prev) => prev.filter((notification) => notification.id !== id));
  };

  const value: NotificationContextType = {
    showNotification,
    showSuccess,
    showError,
    showWarning,
    showInfo,
  };

  return (
    <NotificationContext.Provider value={value}>
      {children}
      <div className="fixed top-0 right-0 z-50 space-y-2 p-4">
        {notifications.map((notification) => (
          <Toast key={notification.id} notification={notification} onClose={removeNotification} />
        ))}
      </div>
    </NotificationContext.Provider>
  );
};
