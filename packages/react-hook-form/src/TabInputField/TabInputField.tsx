import { Key, useMemo, useState } from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';
import {
  SelectProps,
  SelectValue,
  Tab,
  TabPane,
  Tabs,
} from '@mezzanine-ui/react';
import { tabInputFieldClasses } from '@mezzanine-form/core';
import { HookFormFieldComponent, HookFormFieldProps } from '../typings/field';
import { OptionItemsType } from '../typings/option';

export type TabInputFieldProps = HookFormFieldProps<FieldValues, Pick<SelectProps, 'required' | 'disabled' | 'style' | 'className'>, {
  options?: OptionItemsType;
  defaultValue?: SelectValue;
}>;

const TabInputField: HookFormFieldComponent<TabInputFieldProps> = ({
  className,
  defaultValue,
  disabled,
  options = [],
  registerName,
  required,
  style,
}) => {
  const [tabKey, setTabKey] = useState<Key>(defaultValue?.id || '');

  const {
    register,
    setValue,
  } = useFormContext();

  const onChangeHandler = (key: Key) => {
    setTabKey(key);
    setValue(registerName, key);
  };

  useMemo(() => register(
    registerName,
    {
      required,
      disabled,
      value: tabKey,
    },
  // eslint-disable-next-line react-hooks/exhaustive-deps
  ), [registerName, required, disabled]);

  return (
    <Tabs
      activeKey={tabKey}
      className={className}
      onChange={onChangeHandler}
      style={style}
    >
      {options?.map((option) => (
        <TabPane
          key={option.id}
          tab={(
            <Tab
              className={tabInputFieldClasses.tab}
            >
              {option?.name}
            </Tab>
          )}
        />
      ))}
    </Tabs>
  );
};

export default TabInputField;
