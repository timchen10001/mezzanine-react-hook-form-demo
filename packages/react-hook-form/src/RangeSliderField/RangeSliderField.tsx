/* eslint-disable react-hooks/exhaustive-deps */
import {
  Input, InputProps, Slider, SliderProps,
} from '@mezzanine-ui/react';
import { CSSProperties, useEffect, useMemo } from 'react';
import { FieldValues, useFormContext, useFormState } from 'react-hook-form';
import { rangeSliderFieldClasses } from '@mezzanine-form/core';
import { HookFormFieldComponent, HookFormFieldProps } from '../typings/field';
import BaseField from '../BaseField/BaseField';
import { useRangeSlider } from './use-range-slider';

export type RangeSliderFieldProps = HookFormFieldProps<
FieldValues,
Omit<SliderProps, 'value'>, {
  defaultValueFrom?: number;
  defaultValueTo?: number;
  defaultValue?: number;
  width?: number;
  inputWidth?: number;
  readOnly?: boolean;
  size?: InputProps['size'];
}>;

const RangeSliderField: HookFormFieldComponent<RangeSliderFieldProps> = ({
  control,
  defaultValueFrom = 0,
  defaultValueTo = 100,
  min = 0,
  max = 100,
  defaultValue = 0,
  disabled,
  label,
  register,
  registerName,
  remark,
  required,
  readOnly,
  step = 1,
  style,
  size,
  width,
  inputWidth,
  ...props
}) => {
  const {
    control: contextControl,
    register: contextRegister,
    setValue,
  } = useFormContext();

  const {
    errors,
  } = useFormState({ control: control || contextControl });

  useMemo(() => (register || contextRegister)(
    registerName,
    {
      required,
      disabled,
    },
  ), [registerName, required, disabled]);

  const {
    from,
    to,
    value,
    onFromChange,
    onToChange,
    onValueChange,
  } = useRangeSlider({
    defaultValueFrom,
    defaultValueTo,
    defaultValue,
  });

  useEffect(() => {
    setValue(registerName, [from, value]);
  }, [from, value]);

  return (
    <BaseField
      disabled={disabled}
      style={{
        ...style,
        '--width': '100%',
      } as CSSProperties}
      label={label}
      name={registerName}
      remark={remark}
      errors={errors}
      required={required}
      width={width}
    >
      <div
        className={rangeSliderFieldClasses.host}
        style={{
          '--inputWidth': inputWidth
            ? `${inputWidth}px`
            : undefined,
        } as CSSProperties}
      >
        <div className={rangeSliderFieldClasses.from}>
          <Input
            readOnly={readOnly}
            inputProps={{ type: 'number', autoComplete: 'off' }}
            defaultValue={defaultValueFrom.toString()}
            size={size}
            value={from.toString()}
            onChange={onFromChange}
          />
        </div>
        <Slider
          {...props}
          min={Math.max(from, min)}
          max={Math.max(to, max)}
          step={step}
          value={value}
          onChange={onValueChange}
        />
        <div className={rangeSliderFieldClasses.to}>
          <Input
            readOnly={readOnly}
            size={size}
            inputProps={{ type: 'number', autoComplete: 'off' }}
            defaultValue={defaultValueTo.toString()}
            value={value.toString()}
            onChange={onToChange}
          />
        </div>
      </div>
    </BaseField>
  );
};

export default RangeSliderField;
