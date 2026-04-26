# Despliegue en GitHub Pages

## Configuración Realizada

El proyecto ha sido configurado específicamente para funcionar correctamente en GitHub Pages:

### 1. Cambio a HashRouter
- Se cambió de `BrowserRouter` a `HashRouter` en `src/App.jsx`
- Esto evita problemas con rutas en GitHub Pages

### 2. Configuración de Base Path
- Se configuró `base: '/ansiosxsWeb/'` en `vite.config.js`
- Solo se aplica en producción (`NODE_ENV === 'production'`)

### 3. Archivo 404.html
- Se creó `public/404.html` para manejar redirecciones

## Pasos para Desplegar

1. **Hacer build del proyecto:**
   ```bash
   npm run build
   ```

2. **Subir a GitHub:**
   ```bash
   git add .
   git commit -m "Configuración para GitHub Pages"
   git push origin main
   ```

3. **Configurar GitHub Pages:**
   - Ve a Settings > Pages en tu repositorio
   - Selecciona "Deploy from a branch"
   - Elige `main` branch y `/` folder
   - Haz clic en Save

4. **Acceder al sitio:**
   - El sitio estará disponible en: `https://[tu-usuario].github.io/ansiosxsWeb/`
   - Las URLs tendrán formato: `https://[tu-usuario].github.io/ansiosxsWeb/#/quienes-somos`

## Verificación Local

Para probar localmente cómo funcionará en GitHub Pages:

```bash
# Build con configuración de producción
npm run build

# Servir los archivos estáticos
npm install -g serve
serve -s dist -l 3000
```

Luego accede a `http://localhost:3000` y verifica que todas las rutas funcionen.

## Notas Importantes

- Las URLs en producción usarán `#` (hash routing)
- Ejemplo: `/quienes-somos` se convierte en `/#/quienes-somos`
- Las imágenes y assets funcionarán correctamente gracias a la configuración del base path
- El sitio es 100% client-side, no requiere backend
