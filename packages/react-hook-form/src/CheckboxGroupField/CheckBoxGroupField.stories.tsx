import { useForm } from 'react-hook-form';
import { FormFieldsDebug } from '../FormFieldsDebug';
import { FormFieldsWrapper } from '../FormFieldsWrapper';
import CheckboxGroupField from './CheckboxGroupField';

export default {
  title: 'Data Display/CheckBoxGroupField',
};

export const Basic = () => {
  const methods = useForm();

  return (
    <div
      style={{ width: '100%', maxWidth: '680px' }}
    >
      <FormFieldsWrapper
        methods={methods}
      >
        <FormFieldsDebug
          title="Form State Monitor"
          mode="dev"
        />
        <CheckboxGroupField
          label="Label Name"
          orientation="horizontal"
          registerName="checkbox-group-register-name"
          options={[
            {
              label: '1',
              value: '1',
              disabled: false,
            },
            {
              label: '2',
              value: '2',
              disabled: false,
            },
            {
              label: '3',
              value: '3',
              disabled: false,
            },
          ]}
        />
      </FormFieldsWrapper>
    </div>
  );
};
