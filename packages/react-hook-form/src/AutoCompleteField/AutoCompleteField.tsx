import {
  AutoComplete, AutoCompleteProps, cx, SelectValue,
} from '@mezzanine-ui/react';
import { FormEventHandler } from 'react';
import { FieldValues, useFormContext, useFormState } from 'react-hook-form';
import { autoCompleteClasses } from '@mezzanine-form/core';
import { HookFormFieldComponent, HookFormFieldProps } from '../typings/field';
import BaseField from '../BaseField/BaseField';
import { useAutoCompleteDebounce } from './use-auto-complete-debounce';

export type AutoCompleteFieldProps = HookFormFieldProps<
Omit<FieldValues, 'defaultValue' | 'onInput'>,
Omit<AutoCompleteProps, 'mode'>, {
  defaultValue?: SelectValue;
  debounceMs?: number;
  width?: number;
  onInput?: FormEventHandler<HTMLInputElement>;
}>;

const AutoCompleteField: HookFormFieldComponent<AutoCompleteFieldProps> = ({
  control,
  debounceMs,
  defaultValue,
  disabled,
  fullWidth = true,
  label,
  options,
  placeholder = '請輸入',
  onInput,
  registerName,
  remark,
  required,
  size,
  style,
  className,
  value,
  width,
  ...props
}) => {
  const { control: contextControl } = useFormContext();

  const {
    errors,
  } = useFormState({ control: control || contextControl });

  const onChange = useAutoCompleteDebounce({
    registerName,
    debounceMs,
    skip: !debounceMs,
  }, 'single');

  return (
    <BaseField
      disabled={disabled}
      style={style}
      label={label}
      name={registerName}
      remark={remark}
      errors={errors}
      required={required}
      width={width}
      className={cx(
        autoCompleteClasses.host,
        className,
      )}
    >
      <AutoComplete
        {...props}
        mode="single"
        aria-autocomplete="none"
        menuSize="large"
        itemsInView={10}
        size={size}
        fullWidth={width ? false : fullWidth}
        onChange={onChange}
        inputProps={{ onInput }}
        placeholder={placeholder}
        defaultValue={defaultValue}
        options={options}
        value={value}
      />
    </BaseField>
  );
};

export default AutoCompleteField;
