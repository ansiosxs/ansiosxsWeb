import React, { useState, useRef, useEffect } from 'react';
import { Skeleton } from './skeleton';

const OptimizedImage = ({ 
  src, 
  alt, 
  className = '', 
  width, 
  height, 
  priority = false,
  sizes = '(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw'
}) => {
  const [isLoaded, setIsLoaded] = useState(false);
  const [isInView, setIsInView] = useState(priority);
  const imgRef = useRef();

  useEffect(() => {
    if (priority) {
      setIsInView(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsInView(true);
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );

    if (imgRef.current) {
      observer.observe(imgRef.current);
    }

    return () => observer.disconnect();
  }, [priority]);

  const handleLoad = () => {
    setIsLoaded(true);
  };

  const generateSrcSet = (baseSrc) => {
    if (!baseSrc || typeof baseSrc !== 'string') return '';
    
    // Si es WebP, mantener como está
    if (baseSrc.includes('.webp')) return baseSrc;
    
    // Generar diferentes tamaños para imágenes JPEG/PNG
    const ext = baseSrc.match(/\.(jpg|jpeg|png)$/i);
    if (!ext) return '';
    
    const baseWithoutExt = baseSrc.replace(/\.(jpg|jpeg|png)$/i, '');
    const webpSrc = `${baseWithoutExt}.webp`;
    
    // Verificar si la imagen WebP existe antes de incluirla
    // Por ahora, deshabilitamos srcset para evitar errores
    return '';
  };

  return (
    <div 
      ref={imgRef} 
      className={`relative overflow-hidden ${className}`}
      style={{ aspectRatio: width && height ? `${width}/${height}` : undefined }}
    >
      {!isLoaded && (
        <Skeleton className="absolute inset-0 w-full h-full" />
      )}
      
      {isInView && (
        <img
          src={src}
          alt={alt}
          className={`transition-opacity duration-300 ${
            isLoaded ? 'opacity-100' : 'opacity-0'
          } w-full h-full object-cover`}
          onLoad={handleLoad}
          loading={priority ? 'eager' : 'lazy'}
          decoding="async"
          sizes={sizes}
        />
      )}
    </div>
  );
};

export default OptimizedImage;
