const fs = require('fs');
const path = require('path');

// Remove unnecessary files after build
function optimizeBuild() {
  const buildPath = path.join(__dirname, '../build');
  const distPath = path.join(__dirname, '../dist/win-unpacked');
  
  if (fs.existsSync(distPath)) {
    // Remove source maps
    removeSourceMaps(distPath);
    
    // Remove unnecessary locales
    removeUnnecessaryLocales(distPath);
    
    // Remove development files
    removeDevFiles(distPath);
    
    console.log('✅ Build optimized!');
  }
}

function removeSourceMaps(dir) {
  const files = fs.readdirSync(dir, { recursive: true });
  files.forEach(file => {
    if (file.endsWith('.map')) {
      fs.unlinkSync(path.join(dir, file));
    }
  });
}

function removeUnnecessaryLocales(dir) {
  const localesPath = path.join(dir, 'locales');
  if (fs.existsSync(localesPath)) {
    const locales = fs.readdirSync(localesPath);
    const keepLocales = ['en-US.pak', 'en.pak']; // Keep only English
    
    locales.forEach(locale => {
      if (!keepLocales.includes(locale)) {
        fs.unlinkSync(path.join(localesPath, locale));
      }
    });
  }
}

function removeDevFiles(dir) {
  const devFiles = [
    'LICENSE',
    'LICENSES.chromium.html',
    'chrome_100_percent.pak',
    'chrome_200_percent.pak',
    'resources.pak'
  ];
  
  devFiles.forEach(file => {
    const filePath = path.join(dir, file);
    if (fs.existsSync(filePath)) {
      fs.unlinkSync(filePath);
    }
  });
}

optimizeBuild(); 