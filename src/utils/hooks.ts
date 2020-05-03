import { useRef, useEffect, useCallback } from 'rax';

export const useEventCallback = (fn, dependencies) => {
  const ref = useRef<(...args: any[]) => any>(() => {
    throw new Error('Cannot call an event handler while rendering.');
  });

  useEffect(() => {
    ref.current = fn;
  }, [fn, ...dependencies]);

  return useCallback(
    (...args) => {
      const fn = ref.current;
      return fn(...args);
    },
    [ref]
  );
};
