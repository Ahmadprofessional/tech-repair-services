interface MarkerProps {
  variant?: "brackets" | "crosshair" | "registration";
  className?: string;
  dark?: boolean;
  children?: React.ReactNode;
}

export function Marker({
  variant = "brackets",
  className = "",
  dark = false,
  children,
}: MarkerProps) {
  const colorClass = dark ? "marker-bracket-ink" : "";

  if (variant === "crosshair") {
    return (
      <div className={`relative inline-flex items-center justify-center ${className}`} aria-hidden="true">
        {/* Horizontal line */}
        <span
          className="absolute h-px w-full"
          style={{ background: dark ? "var(--color-line-dark)" : "var(--color-line-light)" }}
        />
        {/* Vertical line */}
        <span
          className="absolute w-px h-full"
          style={{ background: dark ? "var(--color-line-dark)" : "var(--color-line-light)" }}
        />
        {/* Center dot */}
        <span
          className="relative z-10 h-1 w-1 rounded-full"
          style={{ background: dark ? "var(--color-line-dark)" : "var(--color-line-light)" }}
        />
      </div>
    );
  }

  if (variant === "registration") {
    return (
      <div className={`relative ${className}`} aria-hidden="true">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <circle
            cx="8"
            cy="8"
            r="6"
            stroke={dark ? "var(--color-line-dark)" : "var(--color-line-light)"}
            strokeWidth="0.5"
          />
          <line
            x1="8" y1="0" x2="8" y2="16"
            stroke={dark ? "var(--color-line-dark)" : "var(--color-line-light)"}
            strokeWidth="0.5"
          />
          <line
            x1="0" y1="8" x2="16" y2="8"
            stroke={dark ? "var(--color-line-dark)" : "var(--color-line-light)"}
            strokeWidth="0.5"
          />
        </svg>
      </div>
    );
  }

  // Default: brackets
  return (
    <div className={`marker-bracket ${colorClass} ${className}`}>
      {children}
    </div>
  );
}
