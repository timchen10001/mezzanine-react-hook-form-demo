import { useCallback, useEffect, useState, ChangeEvent } from 'react';
import { debounceTime, fromEvent, map } from 'rxjs';

type UseAutoCompleteInputPrams = {
  debounceMs?: number;
};

export function useAutoCompleteInput(props?: UseAutoCompleteInputPrams) {
  const { debounceMs = 900 } = props || {};
  const [input, setInput] = useState<string>('');
  const [inputEle, setInputEle] = useState<HTMLInputElement | null>(null);

  useEffect(() => {
    if (!debounceMs || !inputEle) return () => {};

    const subscription = fromEvent<ChangeEvent<HTMLInputElement>>(inputEle, 'input')
      .pipe(
        debounceTime(debounceMs),
        map((e) => e.target.value),
      ).subscribe((val) => setInput(val));

    return () => {
      subscription.unsubscribe();
    };
  }, [inputEle]);

  const onInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (!inputEle || e.nativeEvent.srcElement !== inputEle) {
      setInputEle(e.nativeEvent.srcElement as HTMLInputElement);
      setInput(e.target.value);
    }
  }, [inputEle, setInputEle, setInput]);

  return {
    input,
    onInput,
  };
}
