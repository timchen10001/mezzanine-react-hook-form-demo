import {
  CheckboxGroup,
  CheckboxGroupOption,
  CheckboxGroupProps,
  cx,
} from '@mezzanine-ui/react';
import { Orientation } from '@mezzanine-ui/system/orientation';
import {
  FieldValues,
  useFormContext,
  useFormState,
  useWatch,
} from 'react-hook-form';
import { checkboxGroupClasses } from '@mezzanine-form/core';
import { HookFormFieldComponent, HookFormFieldProps } from '../typings/field';
import BaseField from '../BaseField/BaseField';

export type CheckboxGroupFieldProps = HookFormFieldProps<FieldValues, Omit<CheckboxGroupProps, 'defaultValue'>, {
  options: CheckboxGroupOption[];
  orientation: Orientation;
  defaultValue?: string[];
  fieldClassName?: string;
  width?: number;
}>;

const CheckboxGroupField: HookFormFieldComponent<CheckboxGroupFieldProps> = ({
  className,
  fieldClassName,
  control,
  defaultValue,
  disabled,
  label,
  options,
  width,
  orientation,
  registerName,
  remark,
  style,
  ...props
}) => {
  const {
    control: contextControl,
    setValue,
    clearErrors,
  } = useFormContext();

  const watchValue = useWatch({ name: registerName });

  const {
    errors,
  } = useFormState({ control: control || contextControl });

  const onChange = (newValue: string[]) => {
    if (errors?.[registerName]) clearErrors(registerName);
    setValue(registerName, newValue);
  };

  return (
    <BaseField
      disabled={disabled}
      errors={errors}
      label={label}
      remark={remark}
      name={registerName}
      style={style}
      className={className}
      width={width}
    >
      <CheckboxGroup
        {...props}
        orientation={orientation}
        options={options}
        defaultValue={defaultValue}
        className={cx(checkboxGroupClasses.host, fieldClassName)}
        value={watchValue}
        onChange={onChange}
      />
    </BaseField>
  );
};

export default CheckboxGroupField;
