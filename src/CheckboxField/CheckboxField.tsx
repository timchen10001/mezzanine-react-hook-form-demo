import {
  Checkbox,
  CheckboxProps,
  Typography,
  TypographyProps,
} from '@mezzanine-ui/react';
import { FieldValues, useFormContext, useWatch } from 'react-hook-form';
import { HookFormFieldComponent, HookFormFieldProps } from '../typings/field';
import BaseField from '../BaseField/BaseField';

export type CheckboxFieldProps = HookFormFieldProps<
FieldValues,
CheckboxProps,
Pick<TypographyProps, 'color' | 'variant'>>;

const CheckboxField: HookFormFieldComponent<CheckboxFieldProps> = ({
  control,
  color,
  disabled,
  label,
  variant,
  registerName,
  ...props
}) => {
  const {
    control: contextControl,
    register,
    setValue,
  } = useFormContext();

  const checked = useWatch({
    name: registerName,
    control: control || contextControl,
  });

  const onChange = () => {
    setValue(
      registerName,
      !checked,
    );
  };

  return (
    <BaseField
      disabled={disabled}
      name={registerName}
      label={label ? '' : undefined}
    >
      <Checkbox
        {...props}
        ref={register(registerName).ref}
        value="true"
        checked={checked}
        onChange={onChange}
      >
        <Typography
          color={color}
          variant={variant}
        >
          {label}
        </Typography>
      </Checkbox>
    </BaseField>
  );
};

export default CheckboxField;
