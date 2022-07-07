import {
  cx,
  RadioGroup,
  RadioGroupProps,
} from '@mezzanine-ui/react';
import { ChangeEvent, useEffect, useState } from 'react';
import { FieldValues, useFormContext, useWatch } from 'react-hook-form';
import { HookFormFieldComponent, HookFormFieldProps } from '../typings/field';
import BaseField from '../BaseField/BaseField';
import classes from './radio-group-field.module.scss';

export type RadioGroupFieldProps = HookFormFieldProps<FieldValues, RadioGroupProps>;

const RadioGroupField: HookFormFieldComponent<RadioGroupFieldProps> = ({
  defaultValue,
  disabled,
  label,
  options,
  orientation,
  registerName,
  size,
  ...props
}) => {
  const [defaultChecked, setDefaultChecked] = useState<string>();
  const value = useWatch({ name: registerName });
  const { setValue } = useFormContext();
  const onChange = (e: ChangeEvent<HTMLInputElement>) => setValue(registerName, e.target.value);

  useEffect(() => {
    if (value) {
      setDefaultChecked(value);
    }

    if (defaultValue) {
      setValue(registerName, defaultValue);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BaseField
      key={defaultChecked}
      disabled={disabled}
      name={registerName}
      label={label}
      className={cx(label && classes.label)}
    >
      <RadioGroup
        {...props}
        defaultValue={defaultValue || defaultChecked}
        disabled={disabled}
        onChange={onChange}
        options={options}
        orientation={orientation}
        size={size}
      />
    </BaseField>
  );
};

export default RadioGroupField;
