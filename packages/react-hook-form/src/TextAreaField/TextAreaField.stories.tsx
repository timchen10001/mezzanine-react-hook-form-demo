import { useForm } from 'react-hook-form';
import { FormFieldsDebug } from '../FormFieldsDebug';
import { FormFieldsWrapper } from '../FormFieldsWrapper';
import TextAreaField from './TextAreaField';

export default {
  title: 'Data Display/TextAreaField',
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
        <TextAreaField
          width={300}
          label="Label Name"
          size="large"
          registerName="input-register-name-1"
        />
        <br />
        <br />
        <TextAreaField
          width={300}
          label="Label Name"
          size="large"
          registerName="input-register-name-2"
        />
        <br />
        <br />
        <TextAreaField
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
