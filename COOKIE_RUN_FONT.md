# Fuente Cookie Run - Implementación

## Descripción
La fuente Cookie Run ha sido implementada en el proyecto Ansiosxs Nuevas Lecturas para dar un toque más amigable y lúdico a los títulos principales.

## Archivos de Fuente
Las fuentes Cookie Run se encuentran en:
```
src/cookierun/
├── CookieRun Regular.otf
├── CookieRun Bold.otf
└── CookieRun Black.otf
```

## Implementación

### 1. Declaración de Fuentes (CSS)
En `src/index.css` se han agregado las declaraciones `@font-face`:

```css
@font-face {
  font-family: 'CookieRun';
  src: url('./cookierun/CookieRun Regular.otf') format('opentype');
  font-weight: 400;
  font-style: normal;
}

@font-face {
  font-family: 'CookieRun';
  src: url('./cookierun/CookieRun Bold.otf') format('opentype');
  font-weight: 700;
  font-style: normal;
}

@font-face {
  font-family: 'CookieRun';
  src: url('./cookierun/CookieRun Black.otf') format('opentype');
  font-weight: 900;
  font-style: normal;
}
```

### 2. Clase CSS
Se ha creado una clase CSS para facilitar el uso:

```css
.font-cookie {
  font-family: 'CookieRun', cursive;
}
```

### 3. Configuración de Tailwind
En `tailwind.config.js` se ha agregado la fuente a las opciones de Tailwind:

```javascript
fontFamily: {
  'cookie': ['CookieRun', 'cursive'],
},
```

## Uso

### Con CSS
```html
<h1 class="font-cookie">Título con Cookie Run</h1>
```

### Con Tailwind
```html
<h1 class="font-cookie text-4xl font-bold">Título con Cookie Run</h1>
```

## Páginas donde se ha aplicado

### Home.jsx
- Títulos del carrusel principal
- "Nuestra propuesta"
- "Últimas Noticias"
- "Únete a Nuestra Comunidad Creativa"

### About.jsx
- "Nuestra Historia"
- "Nuestra Misión"
- "Nuestros Valores"
- "Para Quién Trabajamos"

### Projects.jsx
- "Nuestros Proyectos"
- Títulos de secciones de proyectos
- "Colaboraciones"
- "Nuestra Red de Colaboradores"

### Contact.jsx
- "Conectemos"
- "Envíanos un Mensaje"
- "Encuéntranos"

## Pesos de Fuente Disponibles
- **400 (Regular)**: `font-normal`
- **700 (Bold)**: `font-bold`
- **900 (Black)**: `font-black`

## Ejemplo de Uso Completo
```html
<h1 class="font-cookie text-4xl md:text-5xl font-bold text-brand-purple mb-6">
  Título Principal
</h1>
```

## Notas
- La fuente se carga localmente desde los archivos .otf
- Se incluye `cursive` como fallback en caso de que la fuente no cargue
- La fuente es compatible con todos los navegadores modernos que soporten OpenType 