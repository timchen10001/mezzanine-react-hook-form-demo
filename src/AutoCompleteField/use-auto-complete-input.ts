import { useCallback, useEffect, useState, ChangeEvent } from 'react';
import { debounceTime, fromEvent, map } from 'rxjs';

type UseAutoCompleteInputPrams = {
  debounce?: number;
};

export function useAutoCompleteInput(props?: UseAutoCompleteInputPrams) {
  const { debounce = 900 } = props || {};
  const [input, setInput] = useState<string>('');
  const [inputEle, setInputEle] = useState<HTMLInputElement | EventTarget | null>(null);

  useEffect(() => {
    if (!debounce || !inputEle) return () => {};

    const subscription = fromEvent<InputEvent>(inputEle, 'input')
      .pipe(
        debounceTime(debounce),
        map((e) => (e as any).target.value),
      ).subscribe((val) => setInput(val));

    return () => {
      subscription.unsubscribe();
    };
  }, [inputEle]);

  const onInput = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    if (!inputEle || e.nativeEvent.srcElement !== inputEle) {
      setInputEle(e.nativeEvent.srcElement);
      setInput(e.target.value);
    }
  }, [inputEle, setInputEle, setInput]);

  return {
    input,
    onInput,
  };
}
