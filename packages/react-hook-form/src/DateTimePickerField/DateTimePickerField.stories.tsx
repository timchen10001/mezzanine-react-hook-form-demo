import { CalendarConfigProvider } from '@mezzanine-ui/react';
import CalendarMethodsMoment from '@mezzanine-ui/core/calendarMethodsMoment';
import { useForm } from 'react-hook-form';
import { FormFieldsDebug } from '../FormFieldsDebug';
import { FormFieldsWrapper } from '../FormFieldsWrapper';
import DateTimePickerField from './DateTimePickerField';

export default {
  title: 'Data Display/DateTimePickerField',
};

export const Basic = () => {
  const methods = useForm();

  return (
    <div
      style={{ width: '100%', maxWidth: '680px' }}
    >
      <CalendarConfigProvider
        methods={CalendarMethodsMoment}
      >
        <FormFieldsWrapper
          methods={methods}
        >
          <FormFieldsDebug mode="dev" />
          <DateTimePickerField
            width={300}
            label="Label Name"
            size="large"
            registerName="date-time-picker-register-name"
            placeholder="YYYY - MM - DD"
            format="YYYY - MM - DD"
            remark="YYYY - MM - DD"
          />
        </FormFieldsWrapper>
      </CalendarConfigProvider>
    </div>
  );
};
