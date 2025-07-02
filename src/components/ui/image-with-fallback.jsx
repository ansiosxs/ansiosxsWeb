import React, { useState } from 'react';

const ImageWithFallback = ({ 
  src, // WebP
  fallbackSrc, // JPEG/PNG
  alt, 
  className = "", 
  ...props 
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  const handleError = () => {
    if (!hasError && fallbackSrc) {
      setImgSrc(fallbackSrc);
      setHasError(true);
    }
  };

  // Si hay fallback, usar <picture> para WebP + fallback
  if (fallbackSrc) {
    return (
      <picture>
        <source srcSet={src} type="image/webp" />
        <img
          src={hasError ? fallbackSrc : src}
          alt={alt}
          className={className}
          onError={handleError}
          {...props}
        />
      </picture>
    );
  }

  // Si no hay fallback, solo <img>
  return (
    <img
      src={imgSrc}
      alt={alt}
      className={className}
      onError={handleError}
      {...props}
    />
  );
};

export default ImageWithFallback; 