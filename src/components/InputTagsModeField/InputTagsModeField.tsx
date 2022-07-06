/* eslint-disable react-hooks/exhaustive-deps */
import { cx, Input, InputProps } from '@mezzanine-ui/react';
import { TagsType } from '@mezzanine-ui/react/Form/useInputWithTagsModeValue';
import { useCallback, useMemo } from 'react';
import {
  FieldValues, useFormContext, useFormState, useWatch,
} from 'react-hook-form';
import { HookFormFieldComponent, HookFormFieldProps } from '../../typings/field';

import BaseField from '../BaseField/BaseField';
import classes from './input-tags-mode-field.module.scss';

type OmittedInputProps = Omit<InputProps, 'mode' | 'tagsProps'> & InputProps['tagsProps'];

export type InputTagsModeFieldProps<
  T extends FieldValues = FieldValues> = HookFormFieldProps<T, OmittedInputProps, {
    maxLength?: number;
    minLength?: number;
    width?: number;
  }>;

const InputTagsModeField: HookFormFieldComponent<InputTagsModeFieldProps> = ({
  autoComplete = 'off',
  autoFocus,
  className,
  clearable = true,
  control,
  defaultValue,
  disabled,
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
  initialTagsValue,
  maxTagsLength,
  inputPosition,
  type,
}) => {
  const {
    control: contextControl,
    register: contextRegister,
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
    },
  ), [registerName, required, disabled, maxLength, minLength]);

  const onTagsChange = useCallback((newTags: TagsType) => {
    setValue(registerName, newTags);
  }, []);

  return (
    <BaseField
      className={classes.root}
      name={registerName}
      errors={errors}
      style={style}
      required={required}
      remark={remark}
      disabled={disabled}
      label={name || label}
      width={width}
    >
      <Input
        fullWidth
        role={role}
        className={cx(classes.input, className)}
        size={size}
        clearable={clearable}
        defaultValue={defaultValue}
        placeholder={placeholder}
        prefix={prefix}
        disabled={disabled}
        value={watchValue}
        mode="tags"
        required={required}
        suffix={suffix}
        tagsProps={{
          initialTagsValue,
          maxTagsLength,
          inputPosition,
          onTagsChange,
        }}
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

export default InputTagsModeField;
