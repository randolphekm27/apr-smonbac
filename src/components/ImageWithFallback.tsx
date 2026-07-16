import React, { useState } from 'react';
import { GraduationCap } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallbackIcon?: React.ReactNode;
}

// <img> qui bascule sur un joli dégradé + icône si l'image manque ou ne charge pas,
// plutôt que de laisser l'icône d'image cassée du navigateur.
export default function ImageWithFallback({ fallbackIcon, className, src, alt, ...props }: ImageWithFallbackProps) {
  const [errored, setErrored] = useState(false);

  if (errored || !src) {
    return (
      <div className={`flex items-center justify-center bg-gradient-to-br from-accent/25 via-accent/10 to-neutral-100 text-accent/60 ${className || ''}`}>
        {fallbackIcon || <GraduationCap className="h-10 w-10" strokeWidth={1.5} />}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      className={className}
      referrerPolicy="no-referrer"
      onError={() => setErrored(true)}
      {...props}
    />
  );
}
