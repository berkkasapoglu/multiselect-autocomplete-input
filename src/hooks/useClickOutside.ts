import { useEffect, useRef } from 'react';

function useClickOutside<T extends HTMLElement>(cb: (event: Event) => void) {
  const domRef = useRef<T | null>(null);

  useEffect(() => {
    const closeMenu: EventListener = (e) => {
      if (domRef.current && !domRef.current.contains(e.target as Node)) {
        cb(e);
      }
    };
    document.addEventListener('click', closeMenu, true);

    return () => {
      document.removeEventListener('click', closeMenu, true);
    };
  });

  return domRef;
}

export default useClickOutside;
