/** ELITEMARKET monogram — gold elite mark */
export function Logo({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 120 120"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="EliteMarket"
    >
      <circle cx="60" cy="60" r="54" stroke="#e8b923" strokeWidth="3" opacity="0.35" />
      <path
        d="M28 88 C12 68 12 40 28 22 C36 14 48 10 60 10"
        stroke="#e8b923"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
      />
      <path
        d="M60 110 C88 110 108 88 108 60 C108 40 98 24 82 16"
        stroke="#f5d76e"
        strokeWidth="4"
        strokeLinecap="round"
        fill="none"
        opacity="0.85"
      />
      <text
        x="58"
        y="72"
        textAnchor="middle"
        fontFamily="Georgia, 'Times New Roman', serif"
        fontSize="48"
        fontWeight="700"
        fill="#e8b923"
        letterSpacing="-2"
      >
        EM
      </text>
    </svg>
  );
}
