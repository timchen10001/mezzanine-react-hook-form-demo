import { useMemo } from 'react';
import {
  Textarea,
  TextareaProps,
} from '@mezzanine-ui/react';
import {
  FieldValues,
  useFormContext,
  useFormState,
  useWatch,
} from 'react-hook-form';
import { HookFormFieldComponent, HookFormFieldProps } from '../typings/field';
import BaseField from '../BaseField/BaseField';

export type TextAreaFieldProps = HookFormFieldProps<FieldValues, TextareaProps, {
  width?: number;
}>;

const TextAreaField: HookFormFieldComponent<TextAreaFieldProps> = ({
  autoComplete,
  className,
  clearable,
  control,
  defaultValue,
  disabled,
  width,
  label,
  maxLength,
  minLength,
  name,
  placeholder = '請輸入',
  register,
  registerName,
  required,
  remark,
  style,
  ...props
}) => {
  const {
    control: contextControl,
    register: contextRegister,
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
      minLength,
    },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ), [registerName, required, disabled, maxLength, minLength]);

  return (
    <BaseField
      disabled={disabled}
      style={style}
      label={label || name}
      name={registerName}
      errors={errors}
      remark={remark}
      required={required}
      width={width}
    >
      <Textarea
        {...props}
        fullWidth
        clearable={clearable}
        maxLength={maxLength}
        textareaProps={{
          autoComplete,
          id: registerName,
          name: registerName,
          onBlur: registration.onBlur,
        }}
        {...registration}
        className={className}
        onChange={registration.onChange}
        placeholder={placeholder}
        value={watchValue}
      />
    </BaseField>
  );
};

export default TextAreaField;
