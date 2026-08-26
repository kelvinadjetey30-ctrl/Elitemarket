/** Elitebin brand mark — exact EB monogram from your artwork */
import { LOGO_PARTS_A } from './logoDataA';
import { LOGO_PARTS_B } from './logoDataB';

const LOGO_SRC = `data:image/jpeg;base64,${[...LOGO_PARTS_A, ...LOGO_PARTS_B].join('')}`;

export function Logo({ size = 32, className = '' }: { size?: number; className?: string }) {
  return (
    <img
      src={LOGO_SRC}
      alt="Elitebin"
      width={size}
      height={size}
      className={`rounded-full object-cover shrink-0 border border-white/10 ${className}`}
      style={{ width: size, height: size }}
    />
  );
}
