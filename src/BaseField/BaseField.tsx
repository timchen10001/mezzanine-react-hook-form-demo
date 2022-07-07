import { ErrorMessage } from '@hookform/error-message';
import {
  cx,
  FormField,
  FormLabel,
  FormMessage,
} from '@mezzanine-ui/react';
import {
  CSSProperties, FC, memo,
  ReactNode,
} from 'react';
import { DeepRequired, FieldErrorsImpl, MultipleFieldErrors } from 'react-hook-form';
import classes from './base-field.module.scss';

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
      classes.form,
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
    {(!!label || typeof label === 'string') && (
      <FormLabel
        className={cx(
          classes.label,
          labelClassName,
          disabledErrMsg && classes.disabledErrMsg,
          label === '' && classes['label--min-height'],
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
        classes.field,
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
