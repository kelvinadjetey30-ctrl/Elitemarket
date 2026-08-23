/** Official-style crypto logos (SVG color icons) */
const ICON_URLS: Record<string, string> = {
  BTC: 'https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color/btc.svg',
  ETH: 'https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color/eth.svg',
  SOL: 'https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color/sol.svg',
  LTC: 'https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color/ltc.svg',
  TRX: 'https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color/trx.svg',
  USDT: 'https://cdn.jsdelivr.net/npm/cryptocurrency-icons@0.18.1/svg/color/usdt.svg',
};

type Props = {
  option?: { symbol: string; color?: string; name?: string };
  symbol?: string;
  color?: string;
  size?: number;
  title?: string;
};

export function CryptoIcon({ option, symbol: sym, size = 36, title }: Props) {
  const symbol = (option?.symbol || sym || '?').toUpperCase();
  const src = ICON_URLS[symbol];
  const label = title || option?.name || symbol;

  if (src) {
    return (
      <img
        src={src}
        alt={label}
        width={size}
        height={size}
        className="shrink-0 rounded-full bg-white object-contain p-0.5 shadow-sm"
        style={{ width: size, height: size }}
        loading="lazy"
      />
    );
  }

  return (
    <span
      className="inline-flex items-center justify-center rounded-full bg-surface-2 font-bold text-accent shrink-0"
      style={{ width: size, height: size, fontSize: size * 0.35 }}
      title={label}
    >
      {symbol.slice(0, 1)}
    </span>
  );
}
