/* eslint-disable react/jsx-one-expression-per-line */
import {
  cx,
  Icon,
  Input,
  InputProps,
  Typography,
} from '@mezzanine-ui/react';
import { useEffect } from 'react';
import { TimesIcon } from '@mezzanine-ui/icons';
import { FieldValues } from 'react-hook-form';
import { HookFormFieldComponent, HookFormFieldProps } from '../../typings/field';
import TodoListController from '../data/todo-list-controller';
import type { TodoItem } from '../data/typings';
import { useTodoItem } from '../hooks/use-todo-item';
import classes from './todo-item-field.module.scss';

export type TodoItemFieldProps = HookFormFieldProps<FieldValues, InputProps, {
  width?: number;
  maxLength?: number;
  minLength?: number;
  controller: TodoListController;
  listType?: string;
  onUpdateContext: (todo: TodoItem) => void;
  onRemove: (name: string) => void;
}>;

const TodoItemField: HookFormFieldComponent<TodoItemFieldProps> = ({
  autoComplete,
  autoFocus,
  controller,
  className,
  clearable,
  disabled,
  size,
  onUpdateContext,
  onRemove,
  placeholder,
  prefix,
  maxLength,
  minLength,
  listType,
  defaultValue,
  registerName,
  required,
  suffix,
  style,
}) => {
  const todo = useTodoItem(controller, registerName);

  useEffect(() => {
    if (todo) {
      onUpdateContext(todo);
    }
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [todo]);

  return (
    <div className={classes.root}>
      {listType && (
        <Typography
          variant="input1"
          color="text-primary"
          className={classes.list}
        >
          {listType}
        </Typography>
      )}

      <div className={classes.input}>
        <Input
          fullWidth
          style={style}
          className={cx(classes.input, className)}
          size={size}
          clearable={clearable}
          defaultValue={defaultValue}
          placeholder={placeholder}
          disabled={disabled}
          prefix={prefix}
          suffix={suffix}
          required={required}
          onChange={(e) => controller.update(registerName, { value: e.target.value })}
          inputProps={{
            autoComplete,
            autoFocus,
            maxLength,
            minLength,
            type: 'text',
          }}
        />

        <button
          className={classes.close}
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            e.preventDefault();
            onRemove(registerName);
          }}
        >
          <Icon
            icon={TimesIcon}
          />
        </button>
      </div>

      {suffix}
    </div>
  );
};

export default TodoItemField;
