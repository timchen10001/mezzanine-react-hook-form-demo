import { useForm } from 'react-hook-form';
import { FormFieldsDebug } from '../FormFieldsDebug';
import { FormFieldsWrapper } from '../FormFieldsWrapper';
import RadioGroupField from './RadioGroupField';

export default {
  title: 'Data Display/RadioGroupField',
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
        <FormFieldsDebug mode="dev" />
        <RadioGroupField
          label="Label Name"
          size="large"
          registerName="radio-group-register-name"
          options={[
            {
              value: 'value 1',
              label: 'label 1',
            },
            {
              value: 'value 2',
              label: 'label 2',
            },
            {
              value: 'value 3',
              label: 'label 3',
            },
          ]}
        />
      </FormFieldsWrapper>
    </div>
  );
};
