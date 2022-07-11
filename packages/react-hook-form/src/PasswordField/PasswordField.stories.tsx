import { useForm } from 'react-hook-form';
import { FormFieldsDebug } from '../FormFieldsDebug';
import { FormFieldsWrapper } from '../FormFieldsWrapper';
import PasswordField from './PasswordField';

export default {
  title: 'Data Display/PasswordField',
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
        <PasswordField
          width={300}
          label="Label Name"
          size="large"
          registerName="password-register-name-1"
        />
        <br />
        <br />
        <PasswordField
          width={300}
          label="Label Name"
          size="large"
          registerName="password-register-name-2"
        />
        <br />
        <br />
        <PasswordField
          valueAsNumber
          width={300}
          label="Value As Number"
          size="large"
          registerName="password-register-name-3"
        />
      </FormFieldsWrapper>
    </div>
  );
};
