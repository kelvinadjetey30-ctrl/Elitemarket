import { defineConfig, type Plugin } from 'vite';
import react from '@vitejs/plugin-react';
import tailwindcss from '@tailwindcss/vite';
import path from 'path';
import fs from 'fs';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/** Write public favicon + logo JPEG from exact EB logo data */
function elitebinFaviconPlugin(): Plugin {
  const writeFavicon = () => {
    try {
      const a = fs.readFileSync(path.resolve(__dirname, 'src/components/ui/logoDataA.ts'), 'utf8');
      const b = fs.readFileSync(path.resolve(__dirname, 'src/components/ui/logoDataB.ts'), 'utf8');
      const parts = [...a.matchAll(/"([A-Za-z0-9+/=]+)"/g), ...b.matchAll(/"([A-Za-z0-9+/=]+)"/g)].map(
        (m) => m[1]
      );
      const b64 = parts.join('');
      const svg = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 192 192">
  <image href="data:image/jpeg;base64,${b64}" width="192" height="192" preserveAspectRatio="xMidYMid slice"/>
</svg>
`;
      const pub = path.resolve(__dirname, 'public');
      fs.mkdirSync(pub, { recursive: true });
      fs.writeFileSync(path.join(pub, 'favicon.svg'), svg);
      fs.writeFileSync(path.join(pub, 'elitebin-logo.jpeg'), Buffer.from(b64, 'base64'));
    } catch (e) {
      console.warn('[elitebin-favicon]', e);
    }
  };
  return {
    name: 'elitebin-favicon',
    buildStart() {
      writeFavicon();
    },
    configureServer() {
      writeFavicon();
    },
  };
}

export default defineConfig({
  plugins: [react(), tailwindcss(), elitebinFaviconPlugin()],
  resolve: {
    alias: {
      '@': path.resolve(__dirname, './src'),
    },
  },
  server: {
    host: '0.0.0.0',
    port: 5173,
    strictPort: false,
    allowedHosts: true,
  },
});
