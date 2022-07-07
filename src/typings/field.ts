import {
  Control,
  FieldValues,
  Path,
  RegisterOptions,
  UseFormRegister,
} from 'react-hook-form';
import {
  CSSProperties,
  HTMLInputTypeAttribute,
  ReactNode,
} from 'react';

export interface FieldProps<Type extends  FieldValues> extends Omit<RegisterOptions<Type>, 'render'> {
  disabled?: boolean;
  disabledErrMsg?: boolean;
  label?: string;
  placeholder?: string;
  required?: boolean;
  autoComplete?: 'on' | 'off';
  autoFocus?: boolean;
  remark?: ReactNode;
  remarkIcon?: ReactNode;
  style?: CSSProperties;
  className?: string;
  type?: HTMLInputTypeAttribute;
}

export interface RegisteredFieldProps<Type extends FieldValues> extends FieldProps<Type> {
  register?: UseFormRegister<Type>;
  control?: Control<any>;
  registerName: Path<Type>;
  name?: string;
}

export type HookFormFieldProps<
  T extends FieldValues,
  OriginProps extends Record<string, any>,
  OptionalProps extends Record<string, any> | unknown = unknown> =
  OriginProps & RegisteredFieldProps<T> & OptionalProps;

export type HookFormFieldComponent<Props extends FieldValues> = React.FunctionComponent<Props>;
