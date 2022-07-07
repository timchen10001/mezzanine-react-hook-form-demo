import {
  Checkbox,
  CheckboxGroupOption,
  CheckboxProps,
} from '@mezzanine-ui/react';
import { useEffect } from 'react';
import { FieldValues, useFormContext, useWatch } from 'react-hook-form';
import { HookFormFieldComponent, HookFormFieldProps } from '../typings/field';

import BaseField from '../BaseField/BaseField';
import classes from './checkboxes-pick-one-field.module.scss';

export type CheckboxesPickOneFieldProps = HookFormFieldProps<FieldValues, CheckboxProps, {
  options: CheckboxGroupOption[];
}>;

const CheckboxesPickOneField: HookFormFieldComponent<CheckboxesPickOneFieldProps> = ({
  className,
  control,
  defaultValue,
  disabled,
  label,
  name,
  options,
  registerName,
  remark,
  size,
  ...props
}) => {
  const {
    control: contextControl,
    setValue,
  } = useFormContext();

  const value = useWatch({
    name: registerName,
    control: control || contextControl,
  });

  useEffect(() => {
    if (!value && defaultValue) {
      setValue(registerName, defaultValue as any);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [value]);

  return (
    <BaseField
      disabled={disabled}
      name={registerName}
      label={label || name}
      fieldClassName={className}
      remark={remark}
    >
      <div role="group" className={classes.checkboxes}>
        {options?.map((option) => (
          <Checkbox
            {...props}
            key={option.value}
            defaultChecked={value === option.value}
            checked={value === option.value}
            size={size}
            onChange={() => {
              if (value !== option.value) {
                setValue(registerName, option.value);
              }
            }}
            value={option.value}
          >
            {option.label}
          </Checkbox>
        ))}
      </div>
    </BaseField>
  );
};

export default CheckboxesPickOneField;
