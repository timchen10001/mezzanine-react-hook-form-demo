import { Key, useMemo, useState } from 'react';
import { FieldValues, useFormContext } from 'react-hook-form';
import {
  SelectProps,
  SelectValue,
  Tab,
  TabPane,
  Tabs,
} from '@mezzanine-ui/react';
import { HookFormFieldComponent, HookFormFieldProps } from '../typings/field';
import { OptionItemsType } from '../typings/option';

import classes from './tab-input-field.module.scss';

export type TabInputFieldProps = HookFormFieldProps<FieldValues, SelectProps, {
  options?: OptionItemsType;
  defaultValue?: SelectValue;
}>;

const TabInputField: HookFormFieldComponent<TabInputFieldProps> = ({
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
      onChange={onChangeHandler}
      style={style}
    >
      {options?.map((option) => (
        <TabPane
          key={option.value}
          tab={(
            <Tab
              className={classes.tab}
            >
              {option?.text}
            </Tab>
          )}
        />
      ))}
    </Tabs>
  );
};

export default TabInputField;
