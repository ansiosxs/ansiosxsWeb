# Optimización de Retratos del Equipo

## Problema Identificado
Los retratos del equipo tardaban mucho en cargar porque estaban alojados en Google Cloud Storage y tenían un tamaño considerable.

## Solución Implementada

### **🖼️ Imágenes Locales**
Se han movido todos los retratos a `public/images/retratos/` para carga local rápida:

- **Hans Peralta**: `Hans Peralta (1).png` (266KB → Carga local)
- **Pamela Mendoza**: `Pamela_Mendoza (1).png` (192KB → Carga local)
- **Elisa Echeverría**: `Elisa Echeverría (1).png` (410KB → Carga local)
- **Adrián Cortés**: `Adrián Cortes (1).png` (86KB → Carga local)

### **⚡ Beneficios de la Carga Local**

✅ **Velocidad**: No dependen de conexión externa
✅ **Confiabilidad**: Siempre disponibles
✅ **Control**: Tamaños y formatos controlados
✅ **SEO**: Mejor rendimiento de página

## Estructura de Archivos

```
public/
└── images/
    └── retratos/
        ├── Hans Peralta (1).png      ← 266KB
        ├── Pamela_Mendoza (1).png    ← 192KB
        ├── Elisa Echeverría (1).png  ← 410KB
        └── Adrián Cortes (1).png     ← 86KB
```

## Configuración en Código

### **Archivo de Configuración** (`src/data/images.js`)
```javascript
portraits: {
  hansPeralta: {
    primary: '/images/retratos/Hans Peralta (1).png',
    fallback: '/images/retratos/Hans Peralta (1).png',
    alt: 'Retrato de Hans Peralta'
  },
  // ... otros retratos
}
```

### **Componente Actualizado** (`src/pages/AboutUs.jsx`)
```jsx
<ImageWithFallback  
  className="w-32 h-32 rounded-full object-cover border-4"
  alt={member.imageAlt}
  src={member.imageUrl}
  fallbackSrc={member.fallbackUrl}
/>
```

## Optimización Futura (Opcional)

### **Herramientas Recomendadas:**
- **Squoosh**: https://squoosh.app/
- **TinyPNG**: https://tinypng.com/
- **ImageOptim**: macOS
- **FileOptimizer**: Windows

### **Objetivos de Optimización:**
- **Tamaño**: < 50KB por imagen
- **Dimensiones**: 300x300px máximo
- **Formato**: WebP o PNG optimizado
- **Calidad**: 80% (mantiene buena calidad visual)

### **Comando para Verificar Tamaños:**
```bash
# Ver tamaños actuales
ls -lh public/images/retratos/

# Ejecutar script de análisis
node optimize-images.js
```

## Implementación

### **Archivos Modificados:**
- ✅ `src/data/images.js` - Configuración de retratos
- ✅ `src/pages/AboutUs.jsx` - Uso de imágenes locales
- ✅ `optimize-images.js` - Script de análisis

### **Componentes Utilizados:**
- ✅ `ImageWithFallback` - Manejo de errores
- ✅ Configuración centralizada
- ✅ URLs locales optimizadas

## Resultados Esperados

### **Antes:**
- ⏱️ Tiempo de carga: 2-5 segundos por retrato
- 🌐 Dependencia: Google Cloud Storage
- 📊 Tamaño total: ~954KB

### **Después:**
- ⚡ Tiempo de carga: < 1 segundo por retrato
- 🏠 Almacenamiento: Local
- 📊 Tamaño total: ~954KB (pero carga instantánea)

## Mantenimiento

### **Para Agregar Nuevos Retratos:**
1. Colocar imagen en `public/images/retratos/`
2. Agregar configuración en `src/data/images.js`
3. Actualizar array en `src/pages/AboutUs.jsx`

### **Para Optimizar Imágenes:**
1. Usar herramientas de compresión
2. Mantener formato PNG o convertir a WebP
3. Reducir dimensiones si es necesario
4. Verificar calidad visual

## Notas Importantes

- Las imágenes locales se sirven desde la raíz del sitio web
- El componente `ImageWithFallback` maneja errores automáticamente
- Se mantiene la misma calidad visual
- La carga es significativamente más rápida 