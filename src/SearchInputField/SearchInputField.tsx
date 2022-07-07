/* eslint-disable react-hooks/exhaustive-deps */
import { SearchIcon } from '@mezzanine-ui/icons';
import { Icon } from '@mezzanine-ui/react';
import {
  memo,
  useEffect,
  useMemo,
} from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';
import { HookFormFieldComponent, HookFormFieldProps } from '../typings/field';
import type { InputFieldProps } from '../InputField/InputField';
import Input from '../Mezzanine/Input';
import { useClearDebouncedSearch } from './use-clear-debounced-search';
import { useDebouncedValue } from './use-debounced-value';

export type SearchInputFieldProps = HookFormFieldProps<FieldValues, InputFieldProps, {
  debounced?: boolean,
}>;

const SearchInputField: HookFormFieldComponent<SearchInputFieldProps> = ({
  autoComplete,
  autoFocus,
  className,
  clearable = true,
  debounced = true,
  defaultValue,
  disabled,
  maxLength,
  minLength,
  placeholder = '請輸入關鍵字進行搜尋...',
  prefix,
  register,
  registerName,
  required,
  size = 'medium',
  style,
  suffix,
  ...props
}) => {
  const {
    register: contextRegister,
    setValue,
  } = useFormContext();

  const registration = useMemo(() => (register || contextRegister)(
    registerName,
    {
      disabled,
      maxLength,
      minLength,
      required,
    },
  ), [
    contextRegister,
    disabled,
    maxLength,
    minLength,
    register,
    registerName,
    required,
  ]);

  const watchedDebouncedValue = useDebouncedValue({ inputId: registerName });
  const onClear = useClearDebouncedSearch({ registerName, setValue });

  useEffect(() => {
    if (debounced && typeof watchedDebouncedValue === 'string') {
      setValue(registerName, watchedDebouncedValue);
    }
  }, [registerName, watchedDebouncedValue]);

  return (
    <Input
      {...props}
      fullWidth
      clearable={clearable}
      style={style}
      className={className}
      size={size}
      defaultValue={defaultValue}
      placeholder={placeholder}
      prefix={prefix || (<Icon icon={SearchIcon} />)}
      disabled={disabled}
      required={required}
      suffix={suffix}
      onClear={onClear}
      inputProps={{
        id: registerName,
        autoComplete,
        autoFocus,
        maxLength,
        minLength,
        type: 'search',
        ...(debounced ? undefined : registration),
      }}
    />
  );
};

export default memo(SearchInputField) as typeof SearchInputField;
