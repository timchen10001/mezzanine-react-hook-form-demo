import { ChangeEvent, useCallback, useState } from 'react';

export type UseRangeSliderParams = {
  defaultValueFrom: number;
  defaultValueTo: number;
  defaultValue: number;
};

export function useRangeSlider({
  defaultValueFrom,
  defaultValueTo,
  defaultValue,
}: UseRangeSliderParams) {
  const [from, setFrom] = useState<number>(defaultValueFrom);
  const [to, setTo] = useState<number>(Math.max(defaultValueFrom, defaultValueTo));
  const [value, setCurrent] = useState<number>(defaultValue || defaultValueTo);

  const onFromChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    const newFrom = Math.min(Number(e.target.value || defaultValueFrom), to);

    setFrom(newFrom);
    setTo((prevTo) => Math.max(newFrom, prevTo));
  }, [to]);

  const onToChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setTo((prevTo) => Math.max(Number(e.target.value || defaultValueTo), prevTo, from));
    setCurrent((prevValue) => Number(e.target.value || prevValue));
  }, [from]);

  const onValueChange = useCallback((newValue: number) => {
    setCurrent(newValue);
  }, []);

  return {
    from,
    to,
    value,
    onFromChange,
    onToChange,
    onValueChange,
  };
}
