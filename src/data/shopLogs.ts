/** Simulated digital accounts listed by admin (school demo) */
export type ShopLogAccount = {
  id: string;
  service: string;
  plan: string;
  country: string;
  price: number;
  stock: number;
  status: 'available' | 'limited';
};

export const SHOP_LOG_ACCOUNTS: ShopLogAccount[] = [
  { id: 'sl-001', service: 'Streaming Plus', plan: 'Premium 1 Month', country: 'USA', price: 8, stock: 42, status: 'available' },
  { id: 'sl-002', service: 'Streaming Plus', plan: 'Premium 3 Months', country: 'USA', price: 18, stock: 21, status: 'available' },
  { id: 'sl-003', service: 'Music Unlimited', plan: 'Individual', country: 'UK', price: 6, stock: 55, status: 'available' },
  { id: 'sl-004', service: 'Music Unlimited', plan: 'Family', country: 'UK', price: 10, stock: 18, status: 'available' },
  { id: 'sl-005', service: 'Cloud Storage Pro', plan: '200GB', country: 'CANADA', price: 5, stock: 30, status: 'available' },
  { id: 'sl-006', service: 'Cloud Storage Pro', plan: '2TB', country: 'CANADA', price: 12, stock: 12, status: 'limited' },
  { id: 'sl-007', service: 'Game Pass Elite', plan: 'PC 1 Month', country: 'USA', price: 9, stock: 25, status: 'available' },
  { id: 'sl-008', service: 'Game Pass Elite', plan: 'Console 3 Months', country: 'GERMANY', price: 22, stock: 8, status: 'limited' },
  { id: 'sl-009', service: 'VPN Shield', plan: '1 Year', country: 'NETHERLANDS', price: 15, stock: 40, status: 'available' },
  { id: 'sl-010', service: 'VPN Shield', plan: 'Lifetime', country: 'NETHERLANDS', price: 35, stock: 5, status: 'limited' },
  { id: 'sl-011', service: 'Design Suite', plan: 'Pro Monthly', country: 'USA', price: 14, stock: 16, status: 'available' },
  { id: 'sl-012', service: 'Design Suite', plan: 'Pro Yearly', country: 'UK', price: 48, stock: 7, status: 'limited' },
  { id: 'sl-013', service: 'Office Cloud', plan: 'Personal', country: 'GERMANY', price: 7, stock: 33, status: 'available' },
  { id: 'sl-014', service: 'Office Cloud', plan: 'Family', country: 'FRANCE', price: 11, stock: 19, status: 'available' },
  { id: 'sl-015', service: 'Video Creator', plan: 'Basic', country: 'ITALY', price: 9, stock: 22, status: 'available' },
  { id: 'sl-016', service: 'Video Creator', plan: 'Pro', country: 'SPAIN', price: 16, stock: 9, status: 'limited' },
  { id: 'sl-017', service: 'Learning Hub', plan: 'All Access', country: 'USA', price: 13, stock: 28, status: 'available' },
  { id: 'sl-018', service: 'Learning Hub', plan: 'Business', country: 'CANADA', price: 24, stock: 6, status: 'limited' },
  { id: 'sl-019', service: 'Antivirus Max', plan: '1 Device', country: 'UK', price: 5, stock: 50, status: 'available' },
  { id: 'sl-020', service: 'Antivirus Max', plan: '5 Devices', country: 'USA', price: 12, stock: 20, status: 'available' },
  { id: 'sl-021', service: 'Photo Studio', plan: 'Standard', country: 'AUSTRALIA', price: 8, stock: 14, status: 'available' },
  { id: 'sl-022', service: 'Photo Studio', plan: 'Extended', country: 'AUSTRALIA', price: 17, stock: 4, status: 'limited' },
  { id: 'sl-023', service: 'Mail Pro', plan: 'Custom Domain', country: 'GERMANY', price: 6, stock: 31, status: 'available' },
  { id: 'sl-024', service: 'Mail Pro', plan: 'Business Suite', country: 'FRANCE', price: 14, stock: 11, status: 'available' },
];
