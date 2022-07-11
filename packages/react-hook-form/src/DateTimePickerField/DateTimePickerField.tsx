import { DateTimePicker, DateTimePickerProps } from '@mezzanine-ui/react';
import { useMemo } from 'react';
import { FieldValues, useFormContext, useFormState } from 'react-hook-form';
import { HookFormFieldComponent, HookFormFieldProps } from '../typings/field';
import BaseField from '../BaseField/BaseField';

export type DateTimePickerFieldProps = HookFormFieldProps<FieldValues, DateTimePickerProps> & {
  width?: number;
};

const DateTimePickerField: HookFormFieldComponent<DateTimePickerFieldProps> = ({
  clearable = true,
  control,
  defaultValue,
  disabled,
  format,
  hideHour,
  hideMinute,
  hideSecond,
  hourStep,
  isDateDisabled,
  label,
  width,
  minuteStep,
  placeholder = '選擇日期',
  readOnly,
  referenceDate,
  register,
  registerName,
  remark,
  required,
  secondStep,
  style,
  size,
  hourPrefix,
  minutePrefix,
  secondPrefix,
  ...props
}) => {
  const {
    control: contextControl,
    register: contextRegister,
    setValue: contextSetValue,
    clearErrors,
  } = useFormContext();

  const {
    errors,
  } = useFormState({ control: control || contextControl });

  const registration = useMemo(() => (register || contextRegister)(
    registerName,
    {
      required,
      disabled,
    },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ), [registerName, required]);

  const inputProps = {
    autoComplete: 'off',
    ...registration,
  };

  const onChange = (newDate: string | undefined) => {
    if (errors?.[registerName]) clearErrors(registerName);

    contextSetValue(
      registerName,
      newDate,
    );
  };

  return (
    <BaseField
      disabled={disabled}
      errors={errors}
      style={style}
      label={label}
      name={registerName}
      remark={remark}
      required={required}
      width={width}
    >
      <DateTimePicker
        {...props}
        fullWidth
        hideHour={hideHour}
        hideMinute={hideMinute}
        hideSecond={hideSecond}
        hourStep={hourStep}
        minuteStep={minuteStep}
        secondStep={secondStep}
        hourPrefix={hourPrefix}
        minutePrefix={minutePrefix}
        secondPrefix={secondPrefix}
        clearable={clearable}
        format={format}
        isDateDisabled={isDateDisabled}
        inputProps={inputProps}
        size={size}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        referenceDate={referenceDate}
        value={defaultValue}
      />
    </BaseField>
  );
};

export default DateTimePickerField;
