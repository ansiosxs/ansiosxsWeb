# Optimización de Imágenes del Carrusel y Página "Quienes Somos"

## Resumen
Se optimizaron las imágenes principales del sitio web para mejorar los tiempos de carga y la experiencia del usuario.

## Imágenes Optimizadas

### 1. Carrusel Principal (Home)
- **Imagen original**: `public/images/carousel/main.jpeg` (885 KB)
- **Imagen optimizada**: `public/images/carousel/main.webp` (402.8 KB)
- **Reducción**: ~54% de reducción de tamaño
- **Ubicación**: Página de inicio, carrusel principal

### 2. Librero - Página "Quienes Somos"
- **Imagen original**: `public/images/librero.jpg`
- **Imagen optimizada**: `public/images/librero.webp` (378.4 KB)
- **Ubicación**: Página "Quienes Somos", sección principal

## Implementación Técnica

### Componente ImageWithFallback Mejorado
Se actualizó el componente para usar `<picture>` y servir automáticamente:
- **WebP** para navegadores modernos
- **JPEG/PNG** como fallback para navegadores antiguos

```jsx
<ImageWithFallback
  src={images.carousel.main.primary}      // WebP
  fallbackSrc={images.carousel.main.fallback}  // JPEG
  alt={images.carousel.main.alt}
  className="w-full h-full object-cover"
/>
```

### Configuración Centralizada
Todas las imágenes se configuran en `src/data/images.js`:

```javascript
carousel: {
  main: {
    primary: '/images/carousel/main.webp',
    fallback: '/images/carousel/main.jpeg',
    alt: 'Imagen principal del carrusel - Biblioteca comunitaria'
  }
},
about: {
  librero: {
    primary: '/images/librero.webp',
    fallback: '/images/librero.jpg',
    alt: 'Un librero de madera lleno de libros infantiles y novelas gráficas coloridas'
  }
}
```

## Script de Optimización

### Uso del Script
```bash
# Optimizar imagen individual
node optimize-images.cjs public/images/ruta/imagen.jpg

# Optimizar retratos (funcionalidad original)
node optimize-images.cjs
```

### Características del Script
- Genera versión WebP automáticamente
- Mantiene la imagen original como fallback
- Redimensiona a 1920px de ancho máximo
- Calidad WebP: 80%
- Ubicación: `optimize-images.cjs`

## Beneficios

### Rendimiento
- **Carga más rápida**: WebP es ~50% más pequeño que JPEG
- **Mejor experiencia**: Navegadores modernos cargan WebP, antiguos usan fallback
- **Optimización automática**: Script reutilizable para futuras imágenes

### Mantenimiento
- **Configuración centralizada**: Todas las imágenes en un solo archivo
- **Fallback automático**: No requiere configuración manual
- **Documentación**: Fácil seguimiento de optimizaciones

## Próximos Pasos Recomendados

### Optimización Adicional
1. **Comprimir imágenes originales**: Usar TinyPNG o similar para reducir aún más
2. **Crear versiones responsive**: Diferentes tamaños para móvil/desktop
3. **Lazy loading**: Implementar carga diferida para imágenes fuera de pantalla

### Monitoreo
1. **Métricas de rendimiento**: Medir tiempos de carga antes/después
2. **Core Web Vitals**: Verificar mejoras en LCP (Largest Contentful Paint)
3. **Análisis de usuarios**: Monitorear experiencia en diferentes dispositivos

## Herramientas Utilizadas
- **Sharp**: Librería Node.js para procesamiento de imágenes
- **WebP**: Formato de imagen moderno con mejor compresión
- **Picture element**: HTML5 para servir diferentes formatos según soporte del navegador

## Notas Técnicas
- El script requiere Node.js y la dependencia `sharp`
- Las imágenes WebP se generan en la misma carpeta que las originales
- El componente `ImageWithFallback` maneja automáticamente el fallback
- Todas las rutas son relativas al directorio `public/` 