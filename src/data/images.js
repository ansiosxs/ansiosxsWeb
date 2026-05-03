// Configuración de imágenes con URLs de respaldo
export const images = {
  // Imágenes de proyectos
  projects: {
    bibliomovil: {
      primary: '/images/bibliomovil.jpeg',
      fallback: '/images/bibliomovil.jpeg',
      alt: 'Un bibliomóvil colorido estacionado en una caleta costera, con gente leyendo libros al aire libre'
    },
    teLeoTeDibujo: {
      primary: '/images/tltd4_mini.jpg',
      fallback: '/images/tltd4_mini.jpg',
      alt: 'Club de lectura de narrativa gráfica con gente dibujando y leyendo cómics juntos'
    },
    insectaria: {
      primary: '/images/librero.jpg',
      fallback: '/images/librero.webp',
      alt: 'Una acogedora biblioteca comunitaria llena de libros ilustrados, con niños y adultos explorando los estantes'
    },
    talleres: {
      primary: '/images/taller.jpg',
      fallback: '/images/taller.jpg',
      alt: 'Un collage de fotos de talleres de arte: creación de cómics, kamishibai, dibujo de flora y fauna'
    }
  },
  
  // Logos de colaboradores
  logos: {
    laFuente: {
      primary: '/images/logos/la-fuente.png',
      fallback: '/images/logos/la-fuente.png',
      alt: 'Logo La Fuente'
    },
    vivaLeerCopec: {
      primary: '/images/logos/viva-leer-copec.png',
      fallback: '/images/logos/viva-leer-copec.png',
      alt: 'Logo Viva Leer Copec'
    },
    planNacionalLectura: {
      primary: '/images/logos/plan-nacional-lectura.png',
      fallback: '/images/logos/plan-nacional-lectura.png',
      alt: 'Logo Plan Nacional de la Lectura'
    },
    injuv: {
      primary: '/images/logos/injuv.png',
      fallback: '/images/logos/injuv.png',
      alt: 'Logo INJUV'
    },
    udec: {
      primary: '/images/logos/udec.png',
      fallback: '/images/logos/udec.png',
      alt: 'Logo Universidad de Concepción'
    },
    oficinaDiversidad: {
      primary: '/images/logos/oficina-diversidad.png',
      fallback: '/images/logos/oficina-diversidad.png',
      alt: 'Logo Oficina de Diversidad Sexual de Concepción'
    },
    liceoBalmaceda: {
      primary: '/images/logos/liceo-balmaceda.jpg',
      fallback: '/images/logos/liceo-balmaceda.jpg',
      alt: 'Logo Liceo de Adultos José Manuel Balmaceda'
    },
    servicioPatrimonio: {
      primary: '/images/logos/servicio-patrimonio.png',
      fallback: '/images/logos/servicio-patrimonio.png',
      alt: 'Logo Servicio Nacional del Patrimonio Cultural'
    },
    fanzineichon: {
      primary: '/images/logos/fanzineichon.png',
      fallback: '/images/logos/fanzineichon.png',
      alt: 'Logo Fanzineichon'
    },
    superacionPobreza: {
      primary: '/images/logos/superacion-pobreza.png',
      fallback: '/images/logos/superacion-pobreza.png',
      alt: 'Logo Fundación Superación de la Pobreza'
    },
    ubb: {
      primary: '/images/logos/ubb.webp',
      fallback: '/images/logos/ubb.webp',
      alt: 'Logo Universidad del Bío-Bío'
    },
    uss: {
      primary: '/images/images (2).png',
      fallback: '/images/images (2).png',
      alt: 'Logo Universidad San Sebastián'
    }
  },
  
  // Mascotas decorativas
  mascots: {
    bird1: {
      primary: '/images/mascotas/ave.png',
      fallback: '/images/mascotas/ave.png',
      alt: 'Mascota decorativa'
    },
    bird2: {
      primary: '/images/mascotas/bicho.png',
      fallback: '/images/mascotas/bicho.png',
      alt: 'Mascota decorativa'
    },
    bird3: {
      primary: '/images/mascotas/lobo.png',
      fallback: '/images/mascotas/lobo.png',
      alt: 'Mascota decorativa'
    },
    bird4: {
      primary: '/images/mascotas/serpi.png',
      fallback: '/images/mascotas/serpi.png',
      alt: 'Mascota decorativa'
    }
  },
  
  // Retratos del equipo (optimizados para carga rápida)
  portraits: {
    hansPeralta: {
      primary: '/images/Retratos/hans-peralta-optimized.webp',
      fallback: '/images/Retratos/Hans Peralta.png',
      alt: 'Retrato de Hans Peralta'
    },
    angelaRabanal: {
      primary: '/images/Retratos/angela-rabanal-optimized.webp',
      fallback: '/images/Retratos/Angela Rabanal.png',
      alt: 'Retrato de Angela Rabanal'
    },
    elisaEcheverria: {
      primary: '/images/Retratos/elisa-echeverria-optimized.webp',
      fallback: '/images/Retratos/Elisa Echeverría.png',
      alt: 'Retrato de Elisa Echeverría'
    },
    adrianCortes: {
      primary: '/images/Retratos/adrian-cortes-optimized.webp',
      fallback: '/images/Retratos/Adrián Cortes.png',
      alt: 'Retrato de Adrián Cortés'
    }
  },
  
  carousel: {
    main: {
      primary: '/images/carousel/main.jpg',
      fallback: '/images/carousel/main.webp',
      alt: 'Imagen principal del carrusel - Biblioteca comunitaria',
      width: 1200,
      height: 600
    }
  },
  

  about: {
    librero: {
      primary: '/images/librero.webp',
      fallback: '/images/librero.jpg',
      alt: 'Un librero de madera lleno de libros infantiles y novelas gráficas coloridas'
    }
  }
};

// Función para obtener URL de imagen con fallback
export const getImageUrl = (imageKey, category = 'projects') => {
  const image = images[category]?.[imageKey];
  if (!image) {
    console.warn(`Image not found: ${category}.${imageKey}`);
    return '/images/logo.png';
  }
  return image.primary;
};

// Función para obtener alt text de imagen
export const getImageAlt = (imageKey, category = 'projects') => {
  const image = images[category]?.[imageKey];
  return image?.alt || 'Imagen';
}; 