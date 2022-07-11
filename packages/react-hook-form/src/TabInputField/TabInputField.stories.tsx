import { useForm } from 'react-hook-form';
import { FormFieldsDebug } from '../FormFieldsDebug';
import { FormFieldsWrapper } from '../FormFieldsWrapper';
import TabInputField from './TabInputField';

export default {
  title: 'Data Display/TabInputField',
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
        <TabInputField
          label="Label Name"
          registerName="tab-input-register-name"
          options={[
            {
              id: '1',
              name: '1-name',
            },
            {
              id: '2',
              name: '2-name',
            },
            {
              id: '3',
              name: '3-name',
            },
          ]}
        />
      </FormFieldsWrapper>
    </div>
  );
};
