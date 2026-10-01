import React from "react";

export interface QuickAccessItem {
  id: string;
  label: string;
  onClick?: () => void;
  href?: string;
  isExternal?: boolean;
  badge?: string;
  active?: boolean;
}

interface QuickAccessPillsProps {
  label?: string;
  items: QuickAccessItem[];
  className?: string;
}

export default function QuickAccessPills({
  label = "Direct view:",
  items,
  className = "",
}: QuickAccessPillsProps) {
  return (
    <div className={`flex flex-wrap items-center gap-1.5 sm:gap-2 ${className}`}>
      {label && (
        <span className="font-mono text-[10px] sm:text-[11px] uppercase tracking-wider text-text-muted mr-1 select-none">
          {label}
        </span>
      )}
      {items.map((item) => {
        if (item.href) {
          return (
            <a
              key={item.id}
              href={item.href}
              target={item.isExternal ? "_blank" : undefined}
              rel={item.isExternal ? "noopener noreferrer" : undefined}
              className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-secondary transition-all cursor-pointer border ${
                item.active
                  ? "bg-accent-subtle text-accent border-accent/40 font-medium"
                  : "bg-bg-card hover:bg-accent-subtle text-text-secondary hover:text-accent border-border-card hover:border-accent/40"
              }`}
            >
              <span>{item.label}</span>
              {item.badge && (
                <span className="font-mono text-[10px] text-text-muted">
                  {item.badge}
                </span>
              )}
            </a>
          );
        }

        return (
          <button
            key={item.id}
            type="button"
            onClick={item.onClick}
            className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs font-secondary transition-all cursor-pointer border ${
              item.active
                ? "bg-accent-subtle text-accent border-accent/40 font-medium"
                : "bg-bg-card hover:bg-accent-subtle text-text-secondary hover:text-accent border-border-card hover:border-accent/40"
            }`}
          >
            <span>{item.label}</span>
            {item.badge && (
              <span className="font-mono text-[10px] text-text-muted">
                {item.badge}
              </span>
            )}
          </button>
        );
      })}
    </div>
  );
}
