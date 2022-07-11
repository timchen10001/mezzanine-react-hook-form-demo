import { useCallback, useRef } from 'react';

interface UseClearDebouncedSearch {
  registerName: string;
  setValue: (name: any, value: any) => void;
}

export function useClearDebouncedSearch({
  registerName,
  setValue,
}: UseClearDebouncedSearch) {
  const inputRef = useRef<HTMLInputElement | null>(null);

  const onClear = useCallback(() => {
    if (!inputRef.current) {
      inputRef.current = document.getElementById(registerName) as HTMLInputElement || null;
    }

    const target = inputRef.current;

    if (!target) return;

    target.value = '';
    setValue(registerName, undefined);
  }, []);

  return onClear;
}
