import {
  AutoComplete,
  AutoCompleteProps,
  SelectValue,
} from '@mezzanine-ui/react';
import { FormEventHandler } from 'react';
import {
  FieldValues,
  useFormContext,
  useFormState,
  useWatch,
} from 'react-hook-form';
import { HookFormFieldComponent, HookFormFieldProps } from '../../typings/field';
import BaseField from '../BaseField/BaseField';
import './auto-complete-field.scss';
import { useAutoCompleteDebounce } from './use-auto-complete-debounce';

export type AutoCompleteMultiFieldProps = HookFormFieldProps<
Omit<FieldValues, 'defaultValues'>,
Omit<AutoCompleteProps, 'mode'>, {
  defaultValues?: SelectValue[];
  debounce?: boolean;
  debounceMs?: number;
  autoClickAwayDebounceMs?: number;
  width?: number;
  onInput?: FormEventHandler<HTMLInputElement>;
}>;

const AutoCompleteMultiField: HookFormFieldComponent<AutoCompleteMultiFieldProps> = ({
  control,
  debounce = true,
  debounceMs,
  defaultValues,
  autoClickAwayDebounceMs,
  disabled,
  fullWidth = true,
  label,
  options,
  placeholder = '請輸入',
  registerName,
  remark,
  required,
  size,
  style,
  value,
  width,
  onInput,
  ...props
}) => {
  const { control: contextControl } = useFormContext();

  const {
    errors,
  } = useFormState({ control: control || contextControl });

  const onChange = useAutoCompleteDebounce({
    registerName,
    debounceMs,
    autoClickAwayDebounceMs,
    skip: !debounce,
  }, 'multiple');

  const watchingValue = useWatch({ name: registerName });

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
    >
      <AutoComplete
        {...props}
        mode="multiple"
        aria-autocomplete="none"
        menuSize="large"
        itemsInView={10}
        size={size}
        fullWidth={width ? false : fullWidth}
        onChange={onChange}
        options={options}
        placeholder={placeholder}
        defaultValue={defaultValues || watchingValue}
        inputProps={{ onInput }}
        value={value}
      />
    </BaseField>
  );
};

export default AutoCompleteMultiField;
