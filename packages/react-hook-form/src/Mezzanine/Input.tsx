import { inputClasses } from '@mezzanine-ui/core/input';
import {
  cx, FormControlContext, InputProps, TextField, useInputWithClearControlValue,
} from '@mezzanine-ui/react';
import {
  FC, MouseEventHandler, Ref, useContext, useRef,
} from 'react';

interface NotForwardInputProps extends InputProps {
  ref?: Ref<HTMLInputElement>;
  onClear?: MouseEventHandler<Element> | undefined
}

/**
 * The react component for `mezzanine` input (not forward version).
 */
const Input: FC<NotForwardInputProps> = (props) => {
  const {
    disabled: disabledFromFormControl,
    fullWidth: fullWidthFromFormControl,
    required: requiredFromFormControl,
    severity,
  } = useContext(FormControlContext) || {};
  const {
    className,
    clearable = false,
    defaultValue,
    disabled = disabledFromFormControl || false,
    error = severity === 'error' || false,
    fullWidth = fullWidthFromFormControl || false,
    ref,
    inputProps,
    onChange: onChangeProp,
    onClear: onClearProp,
    placeholder,
    prefix,
    readOnly = false,
    required = requiredFromFormControl || false,
    size = 'medium',
    suffix,
    value: valueProp,
  } = props;

  const inputRef = useRef<HTMLInputElement>(null);
  const [
    value,
    onChange,
    onClear,
  ] = useInputWithClearControlValue({
    defaultValue,
    onChange: onChangeProp,
    ref: inputRef,
    value: valueProp,
  });
  const active = !!value;

  return (
    <TextField
      active={active}
      className={cx(
        inputClasses.host,
        className,
      )}
      clearable={clearable}
      disabled={disabled}
      error={error}
      fullWidth={fullWidth}
      onClear={onClearProp || onClear}
      prefix={prefix}
      size={size}
      suffix={suffix}
    >
      <input
        ref={ref || inputRef}
        aria-disabled={disabled}
        aria-multiline={false}
        aria-readonly={readOnly}
        aria-required={required}
        disabled={disabled}
        onChange={onChange}
        placeholder={placeholder}
        readOnly={readOnly}
        required={required}
        value={value}
        // eslint-disable-next-line react/jsx-props-no-spreading
        {...inputProps}
      />
    </TextField>
  );
};

export default Input;
