import React, { useState } from 'react';

const ImageWithFallback = ({ src, alt, className, ...props }) => {
  const [show, setShow] = useState(true);

  if (!src || !show) return null;

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      onError={() => setShow(false)}
      {...props}
    />
  );
};

export default ImageWithFallback;