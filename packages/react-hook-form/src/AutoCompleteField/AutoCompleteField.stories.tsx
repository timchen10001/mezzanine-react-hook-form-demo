import { useEffect, useRef, useState } from 'react';
import { useForm } from 'react-hook-form';
import { FormFieldsDebug } from '../FormFieldsDebug';
import { FormFieldsWrapper } from '../FormFieldsWrapper';
import AutoCompleteField from './AutoCompleteField';
import AutoCompleteMultiField from './AutoCompleteMultiField';
import { useAutoCompleteInput } from './use-auto-complete-input';

export default {
  title: 'Data Display/AutoCompleteField',
};

interface QueryConfig {
  variables: { [key: string]: any },
}

function useQuery({ variables }: QueryConfig) {
  const mock = useRef<string[]>(['13', '2', '12', '3', '31', '23', '11']);
  const [data, setData] = useState<string[] | null>(null);
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);

    const timer = setTimeout(() => {
      const response = variables.keyword
        ? mock.current.filter((c) => c.includes(variables.keyword))
        : mock.current;

      setData(response);
      setLoading(false);
    }, 500);

    return () => {
      clearTimeout(timer);
      setLoading(false);
    };
  }, [variables.keyword]);

  return {
    data,
    loading,
  } as const;
}

export const Single = () => {
  const methods = useForm();
  const { input, onInput } = useAutoCompleteInput({ debounceMs: 900 }); // debouncing on keyword input.

  const { data, loading } = useQuery({
    variables: {
      keyword: input,
    },
  });

  return (
    <div
      style={{ width: '100%', maxWidth: '680px' }}
    >
      <h1>
        Try Search Keys: Combinations of
        {' '}
        {'{ 1, 2, 3 }'}
      </h1>
      <p>
        Keyword debouncing = 900ms
        <br />
        Select-Value debouncing = 0ms
      </p>
      {loading && 'fetching data....'}
      <FormFieldsWrapper
        methods={methods}
      >
        <FormFieldsDebug mode="dev" />
        <AutoCompleteField
          width={400}
          debounceMs={0}
          label="Label Name"
          registerName="single-auto-complete-register-name"
          onInput={onInput}
          options={data?.map((value) => ({
            id: value,
            name: value,
          })) || []}
        />
      </FormFieldsWrapper>
    </div>
  );
};

export const Multi = () => {
  const methods = useForm();
  const { input, onInput } = useAutoCompleteInput({ debounceMs: 200 });

  const { data, loading } = useQuery({
    variables: {
      keyword: input,
    },
  });

  return (
    <div
      style={{ width: '100%', maxWidth: '680px' }}
    >
      <h1>
        Try Search Keys:  of
        {' '}
        {'{ 1, 2, 3 }'}
      </h1>
      <p>
        Keyword debouncing = 200ms
        <br />
        Select-Value debouncing = 1400ms
        <br />
        Popper auto-click-away debouncing = 1000ms
        <br />
        Size = large
      </p>
      {loading && 'fetching data....'}
      <FormFieldsWrapper
        methods={methods}
      >
        <FormFieldsDebug mode="dev" />
        <AutoCompleteMultiField
          debounceMs={1400}
          autoClickAwayDebounceMs={1000}
          label="Label Name"
          onInput={onInput}
          registerName="multi-auto-complete-register-name"
          size="large"
          width={400}
          options={data?.map((value) => ({
            id: value,
            name: value,
          })) || []}
        />
      </FormFieldsWrapper>
    </div>
  );
};
