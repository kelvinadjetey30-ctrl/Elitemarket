type Props = {
  option?: { symbol: string; color: string; name?: string };
  symbol?: string;
  color?: string;
  size?: number;
  title?: string;
};

export function CryptoIcon({ option, symbol: sym, color: col, size = 28, title }: Props) {
  const symbol = option?.symbol || sym || '?';
  const color = option?.color || col || '#888';
  return (
    <span
      className="inline-flex items-center justify-center rounded-full font-bold text-white shrink-0 shadow-sm"
      style={{
        width: size,
        height: size,
        background: color,
        fontSize: size * 0.4,
      }}
      title={title || option?.name || symbol}
    >
      {symbol.slice(0, 1)}
    </span>
  );
}
