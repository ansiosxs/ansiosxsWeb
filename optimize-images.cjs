// Script para optimizar imágenes de retratos
// Este script crea versiones optimizadas de los retratos

const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

// Configuración de optimización
const optimizationConfig = {
  maxWidth: 300,  // Máximo ancho para retratos
  maxHeight: 300, // Máximo alto para retratos
  quality: 80,    // Calidad de compresión
  format: 'webp'  // Formato optimizado
};

// Lista de retratos a optimizar
const portraits = [
  {
    input: 'public/images/retratos/Hans Peralta (1).png',
    output: 'public/images/retratos-optimized/hans-peralta.webp',
    name: 'Hans Peralta'
  },
  {
    input: 'public/images/retratos/Pamela_Mendoza (1).png',
    output: 'public/images/retratos-optimized/pamela-mendoza.webp',
    name: 'Pamela Mendoza'
  },
  {
    input: 'public/images/retratos/Elisa Echeverría (1).png',
    output: 'public/images/retratos-optimized/elisa-echeverria.webp',
    name: 'Elisa Echeverría'
  },
  {
    input: 'public/images/retratos/Adrián Cortes (1).png',
    output: 'public/images/retratos-optimized/adrian-cortes.webp',
    name: 'Adrián Cortés'
  }
];

console.log('🎨 Optimizando imágenes de retratos...');
console.log('📁 Directorio de entrada: public/images/retratos/');
console.log('📁 Directorio de salida: public/images/retratos-optimized/');
console.log('⚙️ Configuración:', optimizationConfig);

// Verificar que existe el directorio de entrada
if (!fs.existsSync('public/images/retratos')) {
  console.error('❌ No se encontró el directorio public/images/retratos/');
  process.exit(1);
}

// Crear directorio de salida si no existe
if (!fs.existsSync('public/images/retratos-optimized')) {
  fs.mkdirSync('public/images/retratos-optimized', { recursive: true });
  console.log('✅ Directorio de salida creado');
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

console.log('\n💡 Para optimizar las imágenes, puedes usar herramientas como:');
console.log('   - Squoosh (https://squoosh.app/)');
console.log('   - TinyPNG (https://tinypng.com/)');
console.log('   - ImageOptim (macOS)');
console.log('   - FileOptimizer (Windows)');
console.log('\n🎯 Objetivo: Reducir el tamaño de archivo manteniendo buena calidad visual');
console.log('📊 Tamaño objetivo: < 50KB por imagen');
console.log('📐 Dimensiones: 300x300px máximo');
console.log('🔄 Formato recomendado: WebP o PNG optimizado');

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