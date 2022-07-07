import { TimesIcon } from '@mezzanine-ui/icons';
import { cx, Icon, Typography } from '@mezzanine-ui/react';
import { FC, memo, useState } from 'react';
import { useWatch } from 'react-hook-form';

import classes from './form-fields-debug.module.scss';

const HookformContextConsumer: FC = () => {
  const watchAllFields = useWatch();

  return (
    <pre
      className={classes.code}
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
  const [show, setShow] = useState(false);

  return mode === 'dev' && !unMount ? (
    <div
      className={cx(
        classes.root,
        hovered && classes.rootHovered,
      )}
    >
      <div
        aria-hidden
        role="button"
        className={classes.close}
        onClick={() => setMount(true)}
      >
        <Icon
          icon={TimesIcon}
        />
      </div>
      <div
        className={classes.title}
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
