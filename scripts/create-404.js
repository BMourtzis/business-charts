// scripts/create-404.js
import { writeFileSync } from 'fs'
import { join } from 'path'

const html = `<!DOCTYPE html>
<html>
  <head>
    <meta charset="utf-8">
    <script>
      // GitHub Pages SPA redirect fix
      const redirect = sessionStorage.redirect;
      delete sessionStorage.redirect;
      if (redirect && redirect !== location.href) {
        history.replaceState(null, null, redirect);
      }
    </script>
  </head>
  <body>
    <script>
      // Save current path and redirect to index.html
      sessionStorage.redirect = location.href;
      location.replace('./');
    </script>
  </body>
</html>
`

// Write 404.html into the built /dist directory
const output = join(process.cwd(), 'dist', '404.html')
writeFileSync(output, html)
console.log('✅ Created dist/404.html for GitHub Pages SPA redirect')