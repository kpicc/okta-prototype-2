import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { sendVerificationCodeHandler } from './api/lib/sendVerificationCodeHandler.mjs';

function verificationApiPlugin() {
  return {
    name: 'verification-api',
    configureServer(server: { middlewares: { use: (path: string, handler: (req: { method?: string; on?: (event: string, listener: (chunk?: Buffer) => void | Promise<void>) => void }, res: { statusCode: number; setHeader: (name: string, value: string) => void; end: (body?: string) => void }) => Promise<void>) => void } }) {
      server.middlewares.use('/api/send-verification-code', async (req, res) => {
        res.setHeader('Content-Type', 'application/json');
        if (req.method !== 'POST') {
          res.statusCode = 405;
          res.setHeader('Allow', 'POST');
          res.end(JSON.stringify({ error: 'method_not_allowed' }));
          return;
        }

        const chunks: Buffer[] = [];
        req.on?.('data', (chunk: Buffer) => chunks.push(chunk));
        req.on?.('end', async () => {
          let body: unknown = null;
          try {
            body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
          } catch {
            body = null;
          }

          const result = await sendVerificationCodeHandler(body);
          res.statusCode = result.status;
          res.end(JSON.stringify(result.body));
        });
      });
    },
  };
}

export default defineConfig(({ mode }) => {
  Object.assign(process.env, loadEnv(mode, process.cwd(), ''));

  return {
  plugins: [react(), verificationApiPlugin()],
  build: process.env.VERCEL ? {} : {
    lib: {
      entry: fileURLToPath(new URL('src/index.ts', import.meta.url)),
      name: 'DesignSystem',
      fileName: 'design-system',
      formats: ['es', 'umd'],
    },
    rollupOptions: {
      external: ['react', 'react-dom'],
      output: {
        globals: {
          react: 'React',
          'react-dom': 'ReactDOM',
        },
        assetFileNames: (assetInfo) => {
          if (assetInfo.name === 'style.css') return 'styles.css';
          return assetInfo.name ?? 'assets/[name][extname]';
        },
      },
    },
    cssCodeSplit: false,
  },
  };
});
