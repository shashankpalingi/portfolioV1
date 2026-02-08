import { forwardRef, type ImgHTMLAttributes } from 'react'
import { cn } from '@/lib/utils';

const FALLBACK_IMAGE_URL = "https://static.wixstatic.com/media/12d367_4f26ccd17f8f4e3a8958306ea08c2332~mv2.png";

export type ImageProps = ImgHTMLAttributes<HTMLImageElement> & {
  fittingType?: 'fill' | 'fit';
}

export const Image = forwardRef<HTMLImageElement, ImageProps>(
  ({ src, fittingType = 'fill', className, onError, ...props }, ref) => {
    const handleError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
      const target = e.currentTarget;
      if (target.src !== FALLBACK_IMAGE_URL) {
        target.src = FALLBACK_IMAGE_URL;
      }
      onError?.(e);
    };

    if (!src) {
      return <div data-empty-image ref={ref as any} {...props} />;
    }

    return (
      <img
        ref={ref}
        src={src}
        className={cn(
          'w-full h-full',
          fittingType === 'fit' ? 'object-contain' : 'object-cover',
          className
        )}
        onError={handleError}
        {...props}
      />
    );
  }
);

Image.displayName = 'Image';
