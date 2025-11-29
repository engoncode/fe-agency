import React from "react";

interface TooltipProps {
  content: React.ReactNode;
  children: React.ReactNode;
  className?: string;
}

const Tooltip: React.FC<TooltipProps> = ({ content, children, className = "" }) => {
  return (
    <span className={`relative inline-block group ${className}`}>
      {children}
      <span className="pointer-events-none absolute left-1/2 -translate-x-1/2 -translate-y-2 bottom-full mb-2 hidden group-hover:block">
        <div className="whitespace-nowrap px-2 py-1 rounded-md text-xs bg-gray-900 text-white shadow-md">{content}</div>
      </span>
    </span>
  );
};

export default Tooltip;
