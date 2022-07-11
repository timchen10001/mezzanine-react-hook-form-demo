import { useForm } from 'react-hook-form';
import { FormFieldsDebug } from '../FormFieldsDebug';
import { FormFieldsWrapper } from '../FormFieldsWrapper';
import CheckboxField from './CheckboxField';

export default {
  title: 'Data Display/CheckBoxField',
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
        <CheckboxField
          label="Label Name"
          registerName="checkbox-register-name"
          color="text-secondary"
        />
      </FormFieldsWrapper>
    </div>
  );
};
