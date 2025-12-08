import { writeFileSync, mkdirSync } from 'fs';
import { join } from 'path';

const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8" />
    <script>
      location.replace("/business-charts/");
    </script>
  </head>
  <body></body>
</html>
`;

mkdirSync(join(process.cwd(), 'dist'), { recursive: true });
writeFileSync(join(process.cwd(), 'dist', '404.html'), html);
console.log('✅ Created dist/404.html for GitHub Pages SPA redirect');