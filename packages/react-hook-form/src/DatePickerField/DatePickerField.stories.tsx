import { CalendarConfigProvider } from '@mezzanine-ui/react';
import CalendarMethodsMoment from '@mezzanine-ui/core/calendarMethodsMoment';
import { useForm } from 'react-hook-form';
import { DatePickerField } from '..';
import { FormFieldsDebug } from '../FormFieldsDebug';
import { FormFieldsWrapper } from '../FormFieldsWrapper';

export default {
  title: 'Data Display/DatePickerField',
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
          <DatePickerField
            width={240}
            label="Label Name"
            size="large"
            registerName="date-picker-register-name"
            placeholder="YYYY - MM - DD"
            format="YYYY - MM - DD"
            remark="YYYY - MM - DD"
          />
        </FormFieldsWrapper>
      </CalendarConfigProvider>
    </div>
  );
};
