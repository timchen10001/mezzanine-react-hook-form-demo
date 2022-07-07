import { useState } from 'react';
import { Icon, Typography } from '@mezzanine-ui/react';
import { EyeIcon, EyeSlashIcon } from '@mezzanine-ui/icons';
import { FieldValues } from 'react-hook-form';
import { HookFormFieldComponent, HookFormFieldProps } from '../typings/field';

import classes from './password-field.module.scss';
import InputField, { InputFieldProps } from '../InputField/InputField';

export type PassWordFieldProps = HookFormFieldProps<FieldValues, InputFieldProps, {
  remarkText?: string;
}>;

const PasswordField: HookFormFieldComponent<PassWordFieldProps> = ({
  autoComplete,
  autoFocus,
  className,
  clearable,
  control,
  defaultValue,
  disabled,
  disabledErrMsg,
  label,
  prefix,
  register,
  registerName,
  remark,
  remarkText,
  required,
  style,
  width,
  maxLength,
  minLength,
  ...props
}) => {
  const [passwordMasking, setPasswordMasking] = useState(true);

  const renderRemark = remark ?? (
    !remarkText ? null : (
      <Typography
        color="text-secondary"
        variant="caption"
      >
        {remarkText}
      </Typography>
    )
  );

  const renderSuffix = (
    <Icon
      onClick={(prev) => setPasswordMasking(!prev)}
      className={classes.icon}
      icon={passwordMasking ? EyeSlashIcon : EyeIcon}
    />
  );

  return (
    <InputField
      {...props}
      clearable={clearable}
      autoFocus={autoFocus}
      prefix={prefix}
      disabled={disabled}
      disabledErrMsg={disabledErrMsg}
      className={className}
      autoComplete={autoComplete}
      label={label}
      width={width}
      registerName={registerName}
      register={register}
      control={control}
      required={required}
      style={style}
      type={passwordMasking ? 'password' : undefined}
      suffix={renderSuffix}
      defaultValue={defaultValue}
      remark={renderRemark}
      maxLength={maxLength}
      minLength={minLength}
    />
  );
};

export default PasswordField;
