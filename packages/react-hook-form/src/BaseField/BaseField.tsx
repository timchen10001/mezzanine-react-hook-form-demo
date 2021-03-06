import { ErrorMessage } from '@hookform/error-message';
import { baseFieldClasses } from '@mezzanine-form/core';
import {
  FormField,
  FormLabel,
  FormMessage,
  cx,
} from '@mezzanine-ui/react';
import {
  CSSProperties, FC, memo,
  ReactNode,
} from 'react';
import { DeepRequired, FieldErrorsImpl, MultipleFieldErrors } from 'react-hook-form';

export interface BaseFieldProps {
  children: ReactNode;
  className?: string;
  disabled?: boolean;
  disabledErrMsg?: boolean;
  errors?: FieldErrorsImpl<DeepRequired<any>>;
  fieldClassName?: string;
  label?: ReactNode;
  labelClassName?: string;
  name: string;
  remark?: ReactNode;
  remarkIcon?: ReactNode;
  required?: boolean;
  style?: CSSProperties;
  width?: number;
  errorMsgRender?: (data: {
    message: string;
    messages?: MultipleFieldErrors | undefined;
  }) => ReactNode
}

const BaseField: FC<BaseFieldProps> = ({
  children,
  className,
  disabled,
  disabledErrMsg = false,
  errors,
  fieldClassName,
  label,
  labelClassName,
  name,
  remark,
  remarkIcon,
  required,
  style,
  width,
  errorMsgRender,
}) => (
  <FormField
    className={cx(
      baseFieldClasses.host,
      className,
    )}
    style={{
      '--width': width ? `${width}px` : undefined,
      ...style,
    } as CSSProperties}
    disabled={disabled}
    required={required}
    severity={errors?.[name] ? 'error' : undefined}
  >
    {(typeof label !== 'undefined') && (
      <FormLabel
        className={cx(
          baseFieldClasses.label,
          label === '' && baseFieldClasses.labelWithMinWidth,
          labelClassName,
        )}
        htmlFor={name}
        remark={remark}
        remarkIcon={remarkIcon}
      >
        {label}
      </FormLabel>
    )}
    <div
      className={cx(
        baseFieldClasses.field,
        fieldClassName,
      )}
    >
      {children}
    </div>
    {!disabledErrMsg && (
      <ErrorMessage
        errors={errors}
        name={name}
        render={errorMsgRender || (({ message }) => <FormMessage>{message}</FormMessage>)}
      />
    )}
  </FormField>
);

export default memo(BaseField) as FC<BaseFieldProps>;
