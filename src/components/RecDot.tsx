export function RecDot({ className = "" }: { className?: string }) {
  return (
    <span className={`inline-flex items-center gap-1.5 ${className}`}>
      <span
        className="animate-rec inline-block h-2 w-2 rounded-full bg-rec"
        aria-hidden="true"
      />
      <span className="font-mono-label text-rec">REC</span>
    </span>
  );
}
