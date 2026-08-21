import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

// https://vitejs.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '');
  if (env.RESEND_API_KEY) {
    process.env.RESEND_API_KEY = env.RESEND_API_KEY;
  }

  return {
    plugins: [
      react(),
      {
        name: 'vite-plugin-api-contact',
        configureServer(server) {
          server.middlewares.use(async (req, res, next) => {
            if (req.url === '/api/contact' && req.method === 'POST') {
              let body = '';
              req.on('data', (chunk) => {
                body += chunk;
              });
              req.on('end', async () => {
                try {
                  const parsedBody = body ? JSON.parse(body) : {};
                  req.body = parsedBody;

                  const customRes = {
                    setHeader: (key, val) => res.setHeader(key, val),
                    status: (code) => {
                      res.statusCode = code;
                      return {
                        json: (data) => {
                          res.setHeader('Content-Type', 'application/json');
                          res.end(JSON.stringify(data));
                        },
                        end: () => res.end()
                      };
                    },
                    json: (data) => {
                      res.setHeader('Content-Type', 'application/json');
                      res.end(JSON.stringify(data));
                    }
                  };

                  const { default: handler } = await import('./api/contact.js');
                  await handler(req, customRes);
                } catch (err) {
                  res.statusCode = 500;
                  res.setHeader('Content-Type', 'application/json');
                  res.end(JSON.stringify({ error: err.message }));
                }
              });
            } else {
              next();
            }
          });
        }
      }
    ],
    server: {
      port: 3000,
      open: true
    }
  };
});
