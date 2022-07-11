import { useForm } from 'react-hook-form';
import { FormFieldsDebug } from '../FormFieldsDebug';
import { FormFieldsWrapper } from '../FormFieldsWrapper';
import InputField from './InputField';

export default {
  title: 'Data Display/InputField',
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
        <InputField
          width={300}
          label="Label Name"
          size="large"
          registerName="input-register-name-1"
        />
        <br />
        <br />
        <InputField
          width={300}
          label="Label Name"
          size="large"
          registerName="input-register-name-2"
        />
        <br />
        <br />
        <InputField
          valueAsNumber
          width={300}
          label="Value As Number"
          size="large"
          registerName="input-register-name-3"
        />
      </FormFieldsWrapper>
    </div>
  );
};
