/* eslint-disable react-hooks/exhaustive-deps */
import { isNumber } from 'lodash';
import { inputFieldClasses } from '@mezzanine-form/core';
import { cx, Input, InputProps } from '@mezzanine-ui/react';
import { TagsType } from '@mezzanine-ui/react/Form/useInputWithTagsModeValue';
import { useCallback, useMemo } from 'react';
import {
  FieldValues, useFormContext, useFormState, useWatch,
} from 'react-hook-form';
import { HookFormFieldComponent, HookFormFieldProps } from '../typings/field';
import BaseField from '../BaseField/BaseField';

type OmittedInputProps = Omit<InputProps, 'mode' | 'tagsProps'> & InputProps['tagsProps'];

export type InputTagsModeFieldProps<
  T extends FieldValues = FieldValues> = HookFormFieldProps<T, OmittedInputProps, {
    maxLength?: number;
    minLength?: number;
    width?: number;
    inputClassName?: string;
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
  valueAsDate,
  valueAsNumber,
  role,
  size,
  style,
  suffix,
  initialTagsValue,
  maxTagsLength,
  inputClassName,
  inputPosition,
  type,
  ...props
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
    setValue(
      registerName,
      valueAsNumber
        ? newTags.map((t) => Number(t)).filter(isNumber)
        : newTags,
    );
  }, []);

  return (
    <BaseField
      className={cx(
        inputFieldClasses.host,
        width && inputFieldClasses.specifiedWidth,
        className,
      )}
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
        {...props}
        fullWidth
        role={role}
        className={inputClassName}
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
