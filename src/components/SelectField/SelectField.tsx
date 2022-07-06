import {
  Option,
  OptionGroup,
  Select,
  SelectProps,
  SelectValue,
} from '@mezzanine-ui/react';
import { useEffect } from 'react';
import {
  FieldValues,
  useFormContext,
  useWatch,
} from 'react-hook-form';
import { HookFormFieldComponent, HookFormFieldProps } from '../../typings/field';
import { OptionItemGroupsType, OptionItemsType } from '../../typings/option';

import BaseField from '../BaseField/BaseField';
import classes from './select-field.module.scss';

export type SelectFieldProps = HookFormFieldProps<FieldValues, SelectProps, {
  defaultValue?: SelectValue;
  mode?: 'single';
  optionGroups?: OptionItemGroupsType;
  width?: number;
  options?: OptionItemsType;
}>;

const SelectField: HookFormFieldComponent<SelectFieldProps> = ({
  className,
  clearable = true,
  defaultValue,
  disabled,
  fullWidth = false,
  width,
  inputMode,
  itemScope = false,
  label,
  mode = 'single',
  itemsInView,
  optionGroups,
  options,
  placeholder = '請選擇',
  popperOptions,
  registerName,
  remark,
  renderValue,
  required,
  role,
  size,
  style,
  ...props
}) => {
  const {
    clearErrors,
    formState: { errors },
    control,
    resetField,
    setValue,
  } = useFormContext();

  const watchValue = useWatch({
    control,
    name: registerName as string,
    defaultValue,
  }) || defaultValue;

  const onClear = () => resetField(registerName);

  const onChange = (newValue: SelectValue) => {
    if (errors?.[registerName]) clearErrors(registerName);

    setValue(
      registerName,
      newValue,
    );
  };

  useEffect(() => {
    if (defaultValue) {
      setValue(registerName, defaultValue);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <BaseField
      disabled={disabled}
      name={registerName}
      style={style}
      label={label}
      remark={remark}
      required={required}
      className={className}
      width={width}
      errors={errors}
    >
      <Select
        {...props}
        role={role}
        inputMode={inputMode}
        itemScope={itemScope}
        fullWidth={fullWidth}
        clearable={clearable}
        itemsInView={itemsInView}
        mode={mode}
        onClear={onClear}
        onChange={onChange}
        placeholder={placeholder}
        popperOptions={popperOptions}
        renderValue={renderValue}
        required={required}
        size={size}
        value={watchValue}
        className={classes.fill}
      >
        {optionGroups?.map((optionGroup) => (
          <OptionGroup
            key={optionGroup.label}
            label={optionGroup.label}
          >
            {optionGroup.options.map((option) => (
              <Option
                key={option.value}
                value={option.value}
              >
                {option.text}
              </Option>
            ))}
          </OptionGroup>
        ))}
        {options?.map((option) => (
          <Option
            key={option.value}
            value={option.value}
          >
            {option.text}
          </Option>
        ))}
      </Select>
    </BaseField>
  );
};

export default SelectField;
