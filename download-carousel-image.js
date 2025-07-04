const https = require('https');
const fs = require('fs');
const path = require('path');

// URL de la imagen del carrusel
const imageUrl = 'https://storage.googleapis.com/hostinger-horizons-assets-prod/30a6ebc2-adae-4ac3-ae05-32a429feedcf/8fb710186ec1a25aef25363aec67dd83.jpg';
const outputPath = path.join(__dirname, 'public', 'images', 'carousel', 'main-hero.jpg');

// Crear directorio si no existe
const dir = path.dirname(outputPath);
if (!fs.existsSync(dir)) {
  fs.mkdirSync(dir, { recursive: true });
}

console.log('Descargando imagen del carrusel...');

https.get(imageUrl, (response) => {
  if (response.statusCode === 200) {
    const fileStream = fs.createWriteStream(outputPath);
    response.pipe(fileStream);
    
    fileStream.on('finish', () => {
      fileStream.close();
      console.log('✅ Imagen del carrusel descargada exitosamente');
      console.log(`📁 Ubicación: ${outputPath}`);
      
      // Mostrar información del archivo
      const stats = fs.statSync(outputPath);
      const fileSizeInMB = (stats.size / (1024 * 1024)).toFixed(2);
      console.log(`📊 Tamaño: ${fileSizeInMB} MB`);
      
      console.log('\n💡 Recomendaciones para optimización:');
      console.log('1. Considera comprimir la imagen usando herramientas como:');
      console.log('   - TinyPNG (https://tinypng.com/)');
      console.log('   - ImageOptim (macOS)');
      console.log('   - FileOptimizer (Windows)');
      console.log('2. Convierte a formato WebP para mejor compresión');
      console.log('3. Considera crear versiones en diferentes tamaños para responsive');
    });
  } else {
    console.error(`❌ Error al descargar: ${response.statusCode}`);
  }
}).on('error', (err) => {
  console.error('❌ Error de conexión:', err.message);
}); 