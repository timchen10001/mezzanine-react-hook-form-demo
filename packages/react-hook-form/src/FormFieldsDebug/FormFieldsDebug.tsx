import { formFieldsDebugClasses } from '@mezzanine-form/core';
import { TimesIcon } from '@mezzanine-ui/icons';
import { cx, Icon, Typography } from '@mezzanine-ui/react';
import { FC, memo, useState } from 'react';
import { useWatch } from 'react-hook-form';

const HookformContextConsumer: FC = () => {
  const watchAllFields = useWatch();

  return (
    <pre
      className={formFieldsDebugClasses.code}
    >
      {JSON.stringify(watchAllFields, null, 2)}
    </pre>
  );
};

interface FormFieldsDebugProps {
  mode: 'dev' | 'prod';
  title?: string;
}

const FormFieldsDebug: FC<FormFieldsDebugProps> = ({
  mode,
  title = 'Hook Form State',
}) => {
  const [hovered, setHovered] = useState(false);
  const [unMount, setMount] = useState(false);
  const [show, setShow] = useState(true);

  return mode === 'dev' && !unMount ? (
    <div
      className={cx(
        formFieldsDebugClasses.host,
        hovered && formFieldsDebugClasses.hostHovered,
      )}
    >
      <div
        aria-hidden
        role="button"
        className={formFieldsDebugClasses.close}
        onClick={() => setMount(true)}
      >
        <Icon
          icon={TimesIcon}
        />
      </div>
      <div
        className={formFieldsDebugClasses.title}
        onMouseOver={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
        onFocus={() => {}}
      >
        <Typography
          variant="h4"
          color="primary"
          onClick={() => setShow(!show)}
        >
          {title}
        </Typography>
      </div>
      {show && (
        <HookformContextConsumer />
      )}
    </div>
  ) : null;
};

export default memo(FormFieldsDebug);
