/* eslint-disable react-hooks/exhaustive-deps */
import { cx, InputProps } from '@mezzanine-ui/react';
import { useCallback, useEffect, useMemo } from 'react';
import {
  FieldValues, useFormContext, useFormState, useWatch,
} from 'react-hook-form';
import { HookFormFieldComponent, HookFormFieldProps } from '../typings/field';
import Input from '../Mezzanine/input';
import BaseField from '../BaseField/BaseField';
import classes from './input-field.module.scss';

export type InputFieldProps<
  T extends FieldValues = FieldValues> = HookFormFieldProps<T, InputProps, {
    maxLength?: number;
    minLength?: number;
    width?: number;
    inputClassName?: string;
  }>;

const InputField: HookFormFieldComponent<InputFieldProps> = ({
  autoComplete = 'off',
  autoFocus,
  className,
  inputClassName,
  clearable = true,
  control,
  defaultValue,
  disabled,
  disabledErrMsg,
  width,
  label,
  maxLength,
  min,
  minLength,
  name,
  placeholder = '請輸入',
  prefix,
  register,
  registerName,
  remark,
  required,
  role,
  size,
  style,
  suffix,
  tagsProps,
  type,
  ...prop
}) => {
  const {
    control: contextControl,
    register: contextRegister,
    resetField,
    setValue,
  } = useFormContext();

  const watchValue = useWatch({
    control: control || contextControl,
    name: registerName as string,
    defaultValue,
  }) || '';

  const {
    errors,
  } = useFormState({ control: control || contextControl });

  const registration = useMemo(() => (register || contextRegister)(
    registerName,
    {
      required,
      disabled,
      maxLength,
      min,
      minLength,
      valueAsDate: prop.valueAsDate,
      valueAsNumber: prop.valueAsNumber,
    },
  ), [registerName, required, disabled, maxLength, minLength]);

  const onClear = useCallback(() => {
    resetField(registerName);
  }, []);

  useEffect(() => {
    if (defaultValue) {
      setValue(registerName, defaultValue);
    }
  }, []);

  return (
    <BaseField
      className={cx(
        classes.root,
        width && classes['root--width'],
        className,
      )}
      name={registerName}
      disabledErrMsg={disabledErrMsg}
      errors={errors}
      style={style}
      required={required}
      remark={remark}
      disabled={disabled}
      label={name || label}
      width={width}
    >
      <Input
        {...prop}
        fullWidth
        role={role}
        className={cx(classes.input, inputClassName)}
        size={size}
        clearable={clearable}
        defaultValue={defaultValue}
        placeholder={placeholder}
        prefix={prefix}
        disabled={disabled}
        value={watchValue}
        required={required}
        suffix={suffix}
        onClear={onClear}
        tagsProps={tagsProps}
        inputProps={{
          autoComplete,
          autoFocus,
          maxLength,
          minLength,
          type,
          ...registration,
        }}
      />
    </BaseField>
  );
};

export default InputField;
