// Script para optimizar imágenes de retratos
// Este script crea versiones optimizadas de los retratos

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuración de optimización
const optimizationConfig = {
  maxWidth: 256,  // Máximo ancho para retratos (128px * 2 para alta resolución)
  maxHeight: 256, // Máximo alto para retratos
  quality: 85,    // Calidad de compresión
  format: 'webp'  // Formato optimizado
};

// Lista de retratos a optimizar
const portraits = [
  {
    input: 'public/images/Retratos/Hans Peralta.png',
    output: 'public/images/Retratos/hans-peralta-optimized.webp',
    name: 'Hans Peralta'
  },
  {
    input: 'public/images/Retratos/Angela Rabanal.png',
    output: 'public/images/Retratos/angela-rabanal-optimized.webp',
    name: 'Angela Rabanal'
  },
  {
    input: 'public/images/Retratos/Elisa Echeverría.png',
    output: 'public/images/Retratos/elisa-echeverria-optimized.webp',
    name: 'Elisa Echeverría'
  },
  {
    input: 'public/images/Retratos/Adrián Cortes.png',
    output: 'public/images/Retratos/adrian-cortes-optimized.webp',
    name: 'Adrián Cortés'
  }
];

console.log('🎨 Optimizando imágenes de retratos...');
console.log('📁 Directorio de entrada: public/images/Retratos/');
console.log('📁 Directorio de salida: public/images/Retratos/ (optimizadas)');
console.log('⚙️ Configuración:', optimizationConfig);

// Verificar que existe el directorio de entrada
if (!fs.existsSync('public/images/Retratos')) {
  console.error('❌ No se encontró el directorio public/images/Retratos/');
  process.exit(1);
}

// Verificar archivos de entrada
portraits.forEach(portrait => {
  if (!fs.existsSync(portrait.input)) {
    console.warn(`⚠️ No se encontró: ${portrait.input}`);
  } else {
    const stats = fs.statSync(portrait.input);
    console.log(`📸 ${portrait.name}: ${(stats.size / 1024).toFixed(1)} KB`);
  }
});

// Función para optimizar una imagen
async function optimizePortrait(portrait) {
  try {
    if (!fs.existsSync(portrait.input)) {
      console.warn(`⚠️ No se encontró: ${portrait.input}`);
      return;
    }

    const inputStats = fs.statSync(portrait.input);
    console.log(`📸 Procesando ${portrait.name}: ${(inputStats.size / 1024).toFixed(1)} KB`);

    await sharp(portrait.input)
      .resize(optimizationConfig.maxWidth, optimizationConfig.maxHeight, {
        fit: 'cover',
        position: 'center'
      })
      .webp({ quality: optimizationConfig.quality })
      .toFile(portrait.output);

    const outputStats = fs.statSync(portrait.output);
    const reduction = ((inputStats.size - outputStats.size) / inputStats.size * 100).toFixed(1);
    console.log(`✅ ${portrait.name}: ${(outputStats.size / 1024).toFixed(1)} KB (${reduction}% reducción)`);
  } catch (error) {
    console.error(`❌ Error procesando ${portrait.name}:`, error.message);
  }
}

// Si se pasa una imagen como argumento, optimizar solo esa imagen
const inputArg = process.argv[2];
if (inputArg) {
  const inputPath = inputArg;
  const ext = path.extname(inputPath);
  const base = path.basename(inputPath, ext);
  const dir = path.dirname(inputPath);
  const outputPath = path.join(dir, base + '.webp');

  if (!fs.existsSync(inputPath)) {
    console.error(`❌ No se encontró la imagen: ${inputPath}`);
    process.exit(1);
  }

  sharp(inputPath)
    .resize({ width: 1920, withoutEnlargement: true }) // Ajusta el tamaño máximo si quieres
    .webp({ quality: 80 })
    .toFile(outputPath)
    .then(() => {
      const stats = fs.statSync(outputPath);
      console.log(`✅ Imagen optimizada: ${outputPath} (${(stats.size / 1024).toFixed(1)} KB)`);
    })
    .catch(err => {
      console.error('❌ Error al optimizar la imagen:', err);
    });
  return;
}

// Optimizar todas las imágenes si no se especifica una imagen individual
if (!inputArg) {
  console.log('\n🚀 Iniciando optimización de retratos...');
  
  Promise.all(portraits.map(optimizePortrait))
    .then(() => {
      console.log('\n🎉 ¡Optimización completada!');
      console.log('💡 Las imágenes optimizadas están listas para usar en la web');
    })
    .catch(error => {
      console.error('❌ Error durante la optimización:', error);
    });
} 