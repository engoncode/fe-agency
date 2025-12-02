import React from "react";

interface StatusCardsProps {
  statusCounts: {
    draft: number;
    upcoming: number;
    active: number;
    expired: number;
  };
  onStatusClick?: (status: "draft" | "upcoming" | "active" | "expired") => void;
  currentStatus?: string;
}

const StatusCards: React.FC<StatusCardsProps> = ({ statusCounts, onStatusClick, currentStatus }) => {
  // Provide default values to prevent undefined errors
  const counts = {
    draft: statusCounts?.draft || 0,
    upcoming: statusCounts?.upcoming || 0,
    active: statusCounts?.active || 0,
    expired: statusCounts?.expired || 0,
  };

  const cards = [
    {
      status: "draft" as const,
      label: "Draft",
      value: counts.draft,
      iconPath:
        "M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z",
      bgColor: "bg-white dark:bg-slate-900",
      iconColor: "text-yellow-500",
      borderColor: "border-slate-200 dark:border-slate-800",
    },
    {
      status: "upcoming" as const,
      label: "Upcoming",
      value: counts.upcoming,
      iconPath: "M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z",
      bgColor: "bg-white dark:bg-slate-900",
      iconColor: "text-blue-500",
      borderColor: "border-slate-200 dark:border-slate-800",
    },
    {
      status: "active" as const,
      label: "Active",
      value: counts.active,
      iconPath: "M13 10V3L4 14h7v7l9-11h-7z",
      bgColor: "bg-white dark:bg-slate-900",
      iconColor: "text-green-500",
      borderColor: "border-slate-200 dark:border-slate-800",
    },
    {
      status: "expired" as const,
      label: "Expired",
      value: counts.expired,
      iconPath: "M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z",
      bgColor: "bg-white dark:bg-slate-900",
      iconColor: "text-red-500",
      borderColor: "border-slate-200 dark:border-slate-800",
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-3">
      {cards.map((card) => {
        const isActive = currentStatus === card.status;
        return (
          <button
            key={card.status}
            onClick={() => onStatusClick?.(card.status)}
            className={`${card.bgColor} ${
              card.borderColor
            } border rounded-lg p-4 transition-all hover:border-slate-300 dark:hover:border-slate-700 ${
              isActive ? "ring-2 ring-brand-500 border-brand-500" : ""
            }`}>
            <div className="flex items-center justify-between">
              <div className="text-left">
                <p className="text-xs font-medium text-slate-500 dark:text-slate-400">{card.label}</p>
                <p className="text-2xl font-bold text-slate-900 dark:text-white mt-1">{card.value.toLocaleString()}</p>
              </div>
              <div className={`p-2 rounded bg-slate-50 dark:bg-slate-800`}>
                <svg className={`w-5 h-5 ${card.iconColor}`} fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d={card.iconPath} />
                </svg>
              </div>
            </div>
          </button>
        );
      })}
    </div>
  );
};

export default StatusCards;
