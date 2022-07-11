import { useForm } from 'react-hook-form';
import { FormFieldsDebug } from '../FormFieldsDebug';
import { FormFieldsWrapper } from '../FormFieldsWrapper';
import SelectField from './SelectField';

export default {
  title: 'Data Display/SelectField',
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
        <SelectField
          label="Label Name"
          registerName="select-register-name"
          options={[
            {
              id: '1',
              name: '1',
            },
            {
              id: '2',
              name: '2',
            },
            {
              id: '3',
              name: '3',
            },
          ]}
        />
      </FormFieldsWrapper>
    </div>
  );
};
