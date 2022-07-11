import { useForm } from 'react-hook-form';
import { FormFieldsDebug } from '../FormFieldsDebug';
import { FormFieldsWrapper } from '../FormFieldsWrapper';
import InputTagsModeField from './InputTagsModeField';

export default {
  title: 'Data Display/InputTagsModeField',
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
        <InputTagsModeField
          width={300}
          label="Label Name"
          size="large"
          registerName="input-tags-mode-register-name-1"
          maxTagsLength={5}
        />
        <br />
        <br />
        <InputTagsModeField
          width={300}
          label="Label Name"
          size="large"
          registerName="input-tags-mode-register-name-2"
        />
        <br />
        <br />
        <InputTagsModeField
          valueAsNumber
          width={300}
          label="Value As Number"
          size="large"
          registerName="input-tags-mode-register-name-3"
        />
      </FormFieldsWrapper>
    </div>
  );
};
