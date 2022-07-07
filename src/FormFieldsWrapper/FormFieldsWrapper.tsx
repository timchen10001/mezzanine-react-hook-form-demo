import { HTMLAttributes } from 'react';
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  UseFormReturn,
} from 'react-hook-form';

export interface FormFieldsWrapperProps<T extends FieldValues = FieldValues>
  extends Omit<HTMLAttributes<HTMLFormElement>, 'onSubmit'> {
  methods: UseFormReturn<T>;
  onSubmit?: SubmitHandler<T>;
}

const FormFieldsWrapper = <T extends FieldValues>({
  methods,
  children,
  onSubmit = () => {},
  ...props
}: FormFieldsWrapperProps<T>): JSX.Element => (
  <FormProvider
    {...methods}
  >
    <form
      {...props}
      onSubmit={methods.handleSubmit(onSubmit)}
    >
      {children}
    </form>
  </FormProvider>
);

export default FormFieldsWrapper;
