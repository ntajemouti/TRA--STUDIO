import React, { useEffect, useRef, useState } from 'react';

interface ScrollRevealProps {
  children: React.ReactNode;
  animation?: 'fade-up' | 'fade-down' | 'fade-left' | 'fade-right' | 'zoom-in' | 'fade-in';
  delay?: number;
  duration?: number;
  className?: string;
  threshold?: number;
  once?: boolean;
}

export const ScrollReveal: React.FC<ScrollRevealProps> = ({
  children,
  animation = 'fade-up',
  delay = 0,
  duration = 700,
  className = '',
  threshold = 0.1,
  once = true,
}) => {
  const [isVisible, setIsVisible] = useState(false);
  const elementRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = elementRef.current;
    if (!el) return;

    if (!('IntersectionObserver' in window)) {
      setIsVisible(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (once) observer.unobserve(el);
        } else if (!once) {
          setIsVisible(false);
        }
      },
      {
        threshold,
        rootMargin: '0px 0px -40px 0px',
      }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, [threshold, once]);

  const getInitialStyle = () => {
    switch (animation) {
      case 'fade-up':
        return 'opacity-0 translate-y-10 sm:translate-y-14 scale-[0.98]';
      case 'fade-down':
        return 'opacity-0 -translate-y-10 sm:-translate-y-14 scale-[0.98]';
      case 'fade-left':
        return 'opacity-0 translate-x-10 sm:translate-x-14';
      case 'fade-right':
        return 'opacity-0 -translate-x-10 sm:-translate-x-14';
      case 'zoom-in':
        return 'opacity-0 scale-90';
      case 'fade-in':
      default:
        return 'opacity-0';
    }
  };

  return (
    <div
      ref={elementRef}
      style={{
        transitionDuration: `${duration}ms`,
        transitionDelay: `${delay}ms`,
      }}
      className={`transition-all ease-[cubic-bezier(0.16,1,0.3,1)] transform-gpu will-change-transform ${
        isVisible
          ? 'opacity-100 translate-y-0 translate-x-0 scale-100 filter-none'
          : `${getInitialStyle()} filter blur-[1px]`
      } ${className}`}
    >
      {children}
    </div>
  );
};
