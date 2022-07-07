import { RangePickerValue } from '@mezzanine-ui/core/picker';
import { DateRangePicker, DateRangePickerProps } from '@mezzanine-ui/react';
import { useMemo } from 'react';
import {
  FieldValues,
  useFormContext,
  useFormState,
  useWatch,
} from 'react-hook-form';
import { HookFormFieldComponent, HookFormFieldProps } from '../typings/field';
import BaseField from '../BaseField/BaseField';

export type DateRangePickerFieldProps = HookFormFieldProps<FieldValues, DateRangePickerProps>;

const DateRangePickerField: HookFormFieldComponent<DateRangePickerFieldProps> = ({
  clearable = true,
  control,
  defaultValue,
  disabled,
  format,
  inputFromPlaceholder = '起始日',
  inputToPlaceholder = '結束日',
  isDateDisabled,
  label,
  mode,
  size,
  onCalendarToggle,
  readOnly,
  referenceDate,
  register,
  registerName,
  remark,
  required,
  style,
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
  });

  const {
    errors,
  } = useFormState({ control: control || contextControl });

  const registration = useMemo(() => (register || contextRegister)(
    registerName,
    {
      required,
      disabled,
    },
  ), [register, contextRegister, registerName, required, disabled]);

  const inputProps = {
    autoComplete: 'off',
    ...registration,
  };

  const onChange = (newDate?: RangePickerValue) => setValue(
    registerName,
    newDate,
  );

  return (
    <BaseField
      disabled={disabled}
      errors={errors}
      style={style}
      label={label}
      name={registerName}
      remark={remark}
      required={required}
    >
      <DateRangePicker
        {...props}
        fullWidth
        size={size}
        clearable={clearable}
        format={format}
        isDateDisabled={isDateDisabled}
        inputToProps={inputProps}
        mode={mode}
        onChange={onChange}
        onCalendarToggle={onCalendarToggle}
        inputFromPlaceholder={inputFromPlaceholder}
        inputToPlaceholder={inputToPlaceholder}
        readOnly={readOnly}
        referenceDate={referenceDate}
        value={watchValue}
      />
    </BaseField>
  );
};

export default DateRangePickerField;
