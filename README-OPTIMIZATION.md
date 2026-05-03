# 🚀 Optimización de Imagen Hero/Carrusel

## 📊 Análisis Actual
- **Imagen:** `main.jpg` (849KB) y `main.webp` (928KB)
- **Problema:** Lenta carga afectando LCP y UX
- **Resolución:** 1200x600px (aspect ratio 16:9)

## ✅ Soluciones Implementadas

### 1. Preload Crítico (HTML)
```html
<!-- Preload critical hero image -->
<link rel="preload" as="image" href="/images/carousel/main.webp" type="image/webp" fetchpriority="high" />
<link rel="preload" as="image" href="/images/carousel/main.jpg" type="image/jpeg" fetchpriority="high" />
```

### 2. Srcset Responsivo (React)
```jsx
<picture>
  <source 
    srcSet="/images/carousel/main.webp 1200w, /images/carousel/main.webp 800w, /images/carousel/main.webp 600w"
    sizes="100vw"
    type="image/webp"
  />
  <img
    src="/images/carousel/main.jpg"
    srcSet="/images/carousel/main.jpg 1200w, /images/carousel/main.jpg 800w, /images/carousel/main.jpg 600w"
    sizes="100vw"
    loading="eager"
    fetchpriority="high"
    decoding="sync"
  />
</picture>
```

### 3. Placeholder con Aspect-Ratio
```jsx
<div className="relative w-full h-full">
  <div className="absolute inset-0 bg-gradient-to-br from-brand-blue/20 to-brand-purple/20" />
  <img style={{ aspectRatio: '16/9' }} />
</div>
```

## 🎯 Recomendaciones Adicionales

### Optimización de Formatos
1. **Comprimir imagen actual:**
   ```bash
   # Usando Squoosh CLI
   npx @squoosh/cli --webp auto /images/carousel/main.jpg
   ```

2. **Generar AVIF (mejor compresión):**
   ```bash
   # Convertir a AVIF
   ffmpeg -i main.jpg -c:v libaom-av1 -crf 30 -strict experimental main.avif
   ```

3. **Crear múltiples resoluciones:**
   - 1200x600 (desktop)
   - 800x400 (tablet)
   - 600x300 (mobile)

### Herramientas Recomendadas
- **Squoosh.app** - Compresión online
- **ImageOptim CLI** - Automatización
- **Cloudinary API** - Optimización dinámica

### Métricas Objetivo
- **LCP:** < 2.5s
- **Tamaño imagen:** < 200KB
- **Formato:** WebP/AVIF
- **Layout Shift:** 0

## 📈 Impacto Esperado
- ✅ **Carga instantánea** con preload
- ✅ **Sin layout shift** con aspect-ratio
- ✅ **Mejor LCP** con fetchpriority
- ✅ **Responsive** con srcset
- ✅ **UX fluida** sin barrido

## 🔄 Próximos Pasos
1. Comprimir imagen a <200KB
2. Generar versiones AVIF
3. Crear múltiples resoluciones
4. Implementar CDN si es necesario
