import { passwordFieldClasses } from '@mezzanine-form/core';
import { EyeIcon, EyeSlashIcon } from '@mezzanine-ui/icons';
import { Icon, Typography } from '@mezzanine-ui/react';
import { useState } from 'react';
import { FieldValues } from 'react-hook-form';

import InputField, { InputFieldProps } from '../InputField/InputField';
import { HookFormFieldComponent, HookFormFieldProps } from '../typings/field';

export type PassWordFieldProps = HookFormFieldProps<FieldValues, Omit<InputFieldProps, 'clearable'>, {
  remarkText?: string;
}>;

const PasswordField: HookFormFieldComponent<PassWordFieldProps> = ({
  register,
  remark,
  remarkText,
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
      onClick={() => setPasswordMasking((prev) => !prev)}
      className={passwordFieldClasses.icon}
      icon={passwordMasking ? EyeSlashIcon : EyeIcon}
    />
  );

  return (
    <InputField
      {...props}
      clearable={false}
      register={register}
      type={passwordMasking ? 'password' : undefined}
      suffix={renderSuffix}
      remark={renderRemark}
    />
  );
};

export default PasswordField;
