import { fileURLToPath } from 'node:url';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';
import { sendVerificationCodeHandler } from './api/lib/sendVerificationCodeHandler.mjs';
import { sendPinResetHandler } from './api/lib/sendPinResetHandler.mjs';
import { sendPasswordResetHandler } from './api/lib/sendPasswordResetHandler.mjs';
import { verifyRecaptchaHandler } from './api/lib/verifyRecaptchaHandler.mjs';

type PostHandler = (body: unknown) => Promise<{ status: number; body: unknown }>;

type MiddlewareReq = { method?: string; on?: (event: string, listener: (chunk?: Buffer) => void | Promise<void>) => void };
type MiddlewareRes = { statusCode: number; setHeader: (name: string, value: string) => void; end: (body?: string) => void };

function mountJsonPost(server: { middlewares: { use: (path: string, handler: (req: MiddlewareReq, res: MiddlewareRes) => Promise<void>) => void } }, path: string, handler: PostHandler) {
  server.middlewares.use(path, async (req, res) => {
    res.setHeader('Content-Type', 'application/json');
    if (req.method !== 'POST') {
      res.statusCode = 405;
      res.setHeader('Allow', 'POST');
      res.end(JSON.stringify({ error: 'method_not_allowed' }));
      return;
    }

    const chunks: Buffer[] = [];
    req.on?.('data', (chunk?: Buffer) => { if (chunk) chunks.push(chunk); });
    req.on?.('end', async () => {
      let body: unknown = null;
      try {
        body = JSON.parse(Buffer.concat(chunks).toString('utf8'));
      } catch {
        body = null;
      }

      const result = await handler(body);
      res.statusCode = result.status;
      res.end(JSON.stringify(result.body));
    });
  });
}

function verificationApiPlugin() {
  return {
    name: 'verification-api',
    configureServer(server: { middlewares: { use: (path: string, handler: (req: MiddlewareReq, res: MiddlewareRes) => Promise<void>) => void } }) {
      mountJsonPost(server, '/api/send-verification-code', sendVerificationCodeHandler);
      mountJsonPost(server, '/api/send-pin-reset', sendPinResetHandler);
      mountJsonPost(server, '/api/send-password-reset', sendPasswordResetHandler);
      mountJsonPost(server, '/api/verify-recaptcha', verifyRecaptchaHandler);
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
