/** Country → flag emoji + ISO code for background images */
export const COUNTRY_FLAGS: Record<string, string> = {
  USA: '🇺🇸',
  UK: '🇬🇧',
  CANADA: '🇨🇦',
  GERMANY: '🇩🇪',
  FRANCE: '🇫🇷',
  ITALY: '🇮🇹',
  SPAIN: '🇪🇸',
  AUSTRALIA: '🇦🇺',
  BELGIUM: '🇧🇪',
  NETHERLANDS: '🇳🇱',
  COLOMBIA: '🇨🇴',
  PERU: '🇵🇪',
  BAHAMAS: '🇧🇸',
  MEXICO: '🇲🇽',
  BRAZIL: '🇧🇷',
};

export const COUNTRY_ISO: Record<string, string> = {
  USA: 'us',
  UK: 'gb',
  CANADA: 'ca',
  GERMANY: 'de',
  FRANCE: 'fr',
  ITALY: 'it',
  SPAIN: 'es',
  AUSTRALIA: 'au',
  BELGIUM: 'be',
  NETHERLANDS: 'nl',
  COLOMBIA: 'co',
  PERU: 'pe',
  BAHAMAS: 'bs',
  MEXICO: 'mx',
  BRAZIL: 'br',
};

export function countryFlag(country: string): string {
  return COUNTRY_FLAGS[country] || '🏳️';
}

/** Blurry country flag background URL */
export function countryBgUrl(country: string): string {
  const iso = COUNTRY_ISO[country] || 'un';
  return `https://flagcdn.com/w1280/${iso}.png`;
}
