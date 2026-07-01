import path from 'path';
import fs from 'fs';
import { defineConfig, loadEnv } from 'vite';
import react from '@vitejs/plugin-react';

const MEDIA_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.webp', '.gif', '.mp4', '.mov', '.avi', '.webm'];

function scanMediaFiles(publicDir: string): { path: string; name: string; folder: string; type: string; size: number }[] {
  const results: any[] = [];

  function walkDir(dir: string, relativeTo: string) {
    if (!fs.existsSync(dir)) return;
    const entries = fs.readdirSync(dir, { withFileTypes: true });
    for (const entry of entries) {
      const fullPath = path.join(dir, entry.name);
      if (entry.isDirectory()) {
        walkDir(fullPath, relativeTo);
      } else if (entry.isFile()) {
        const ext = path.extname(entry.name).toLowerCase();
        if (MEDIA_EXTENSIONS.includes(ext)) {
          const relPath = '/' + path.relative(relativeTo, fullPath).replace(/\\/g, '/');
          const folderName = path.basename(path.dirname(fullPath));
          const stats = fs.statSync(fullPath);
          results.push({
            path: relPath,
            name: entry.name,
            folder: folderName,
            type: ['.mp4', '.mov', '.avi', '.webm'].includes(ext) ? 'video' : 'image',
            size: stats.size,
          });
        }
      }
    }
  }

  walkDir(publicDir, publicDir);
  return results;
}

function adminApiPlugin() {
  return {
    name: 'admin-api',
    configureServer(server: any) {
      server.middlewares.use((req: any, res: any, next: any) => {

        // Save posts
        if (req.url === '/api/posts' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => { body += chunk.toString(); });
          req.on('end', () => {
            try {
              const filePath = path.join(__dirname, 'public', 'posts.json');
              fs.writeFileSync(filePath, body);
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true }));
            } catch (err: any) {
              res.writeHead(500);
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        // Save site content
        if (req.url === '/api/site-content' && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => { body += chunk.toString(); });
          req.on('end', () => {
            try {
              const filePath = path.join(__dirname, 'public', 'site-content.json');
              fs.writeFileSync(filePath, body);
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(JSON.stringify({ success: true }));
            } catch (err: any) {
              res.writeHead(500);
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        // Get site content explicitly bypassing vite cache
        if (req.url.startsWith('/api/site-content') && req.method === 'GET') {
          try {
            const filePath = path.join(__dirname, 'public', 'site-content.json');
            if (fs.existsSync(filePath)) {
              const content = fs.readFileSync(filePath, 'utf-8');
              res.writeHead(200, { 'Content-Type': 'application/json' });
              res.end(content);
            } else {
              res.writeHead(404);
              res.end(JSON.stringify({ error: 'File not found' }));
            }
          } catch (err: any) {
            res.writeHead(500);
            res.end(JSON.stringify({ error: err.message }));
          }
          return;
        }

        // Scan media files in public folder
        if (req.url === '/api/scan-media' && req.method === 'GET') {
          try {
            const publicDir = path.join(__dirname, 'public');
            const media = scanMediaFiles(publicDir);
            // Also update site-content.json with the media library
            const siteContentPath = path.join(publicDir, 'site-content.json');
            if (fs.existsSync(siteContentPath)) {
              const siteContent = JSON.parse(fs.readFileSync(siteContentPath, 'utf-8'));
              siteContent.mediaLibrary = media;
              fs.writeFileSync(siteContentPath, JSON.stringify(siteContent, null, 2));
            }
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, count: media.length, media }));
          } catch (err: any) {
            res.writeHead(500);
            res.end(JSON.stringify({ error: err.message }));
          }
          return;
        }

        // Upload media to any folder inside public
        if (req.url.startsWith('/api/upload') && req.method === 'POST') {
          const urlObj = new URL(req.url, `http://${req.headers.host}`);
          const folder = urlObj.searchParams.get('folder');
          const filename = urlObj.searchParams.get('filename');

          if (!folder || !filename) {
            res.writeHead(400);
            res.end(JSON.stringify({ error: 'Missing folder or filename' }));
            return;
          }

          const dirPath = path.join(__dirname, 'public', 'insta_post', folder);
          if (!fs.existsSync(dirPath)) {
            fs.mkdirSync(dirPath, { recursive: true });
          }

          const filePath = path.join(dirPath, filename);
          const writeStream = fs.createWriteStream(filePath);

          req.pipe(writeStream);

          req.on('end', () => {
            res.writeHead(200, { 'Content-Type': 'application/json' });
            res.end(JSON.stringify({ success: true, path: `/insta_post/${folder}/${filename}` }));
          });

          req.on('error', (err: any) => {
            res.writeHead(500);
            res.end(JSON.stringify({ error: err.message }));
          });
          return;
        }

        // Delete media file
        if (req.url.startsWith('/api/delete-media') && req.method === 'POST') {
          let body = '';
          req.on('data', (chunk: any) => { body += chunk.toString(); });
          req.on('end', () => {
            try {
              const { filePath: mediaPath } = JSON.parse(body);
              const fullPath = path.join(__dirname, 'public', mediaPath.replace(/^\//, ''));
              if (fs.existsSync(fullPath)) {
                fs.unlinkSync(fullPath);
                res.writeHead(200, { 'Content-Type': 'application/json' });
                res.end(JSON.stringify({ success: true }));
              } else {
                res.writeHead(404);
                res.end(JSON.stringify({ error: 'File not found' }));
              }
            } catch (err: any) {
              res.writeHead(500);
              res.end(JSON.stringify({ error: err.message }));
            }
          });
          return;
        }

        next();
      });
    }
  };
}

export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, '.', '');
  return {
    server: {
      port: 3000,
      host: '0.0.0.0',
      allowedHosts: [
        'localhost',
        '127.0.0.1',
        'www.mimarisanat.com',
        '.mimarisanat.com',
        'www.mekayapi.tr',
        '.mekayapi.tr'
      ]
    },
    plugins: [react(), adminApiPlugin()],
    define: {
      'process.env.API_KEY': JSON.stringify(env.GEMINI_API_KEY),
      'process.env.GEMINI_API_KEY': JSON.stringify(env.GEMINI_API_KEY)
    },
    resolve: {
      alias: {
        '@': path.resolve(__dirname, '.'),
      }
    }
  };
});
