/** Elitebin brand mark — cream BB monogram */
export function Logo({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 200 200"
      xmlns="http://www.w3.org/2000/svg"
      className={`shrink-0 rounded-full ${className}`}
      aria-label="Elitebin"
      role="img"
    >
      <rect width="200" height="200" rx="100" fill="#0a0a0a" />
      <g fill="#e8d5a3">
        <path d="M42 48h36c18 0 30 9 30 24 0 10-6 18-16 21 14 3 22 12 22 26 0 18-14 29-35 29H42V48zm22 18v28h14c9 0 14-4 14-14s-5-14-14-14H64zm0 46v30h16c11 0 17-5 17-15s-6-15-17-15H64z" />
        <path d="M78 48h36c18 0 30 9 30 24 0 10-6 18-16 21 14 3 22 12 22 26 0 18-14 29-35 29H78V48zm22 18v28h14c9 0 14-4 14-14s-5-14-14-14h-14zm0 46v30h16c11 0 17-5 17-15s-6-15-17-15h-16z" opacity="0.95" />
        <path d="M88 48c6 28 6 76 0 104h12c6-28 6-76 0-104H88z" fill="#f0e0b8" opacity="0.45" />
      </g>
    </svg>
  );
}
