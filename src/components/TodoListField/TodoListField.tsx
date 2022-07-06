/* eslint-disable react-hooks/exhaustive-deps */
import { cx, Message } from '@mezzanine-ui/react';
import {
  FC,
  ReactNode,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from 'react';
import {
  FieldValues, useFormContext, useFormState,
} from 'react-hook-form';

import BaseField from '../BaseField/BaseField';
import TodoListController from './data/todoListController';
import { TodoItem } from './data/types.interface';
import classes from './todo-list-field.module.scss';
import { HookFormFieldComponent, HookFormFieldProps } from '../../typings/field';

interface TodoItemFieldProps<T = any> {
  registerName: string;
  width?: number;
  maxLength?: number;
  minLength?: number;
  value: T;
  defaultValue: T;
  controller: TodoListController;
  listType?: string;
  onUpdateContext: (todo: TodoItem) => void;
  onRemove: (name: string) => void;
}

export type TodoListFieldProps<
  T extends Omit<TodoItemFieldProps, 'controller' | 'onUpdateContext' | 'onRemove'
  > = Omit<TodoItemFieldProps, 'controller' | 'onUpdateContext' | 'onRemove'>> = HookFormFieldProps<
  FieldValues, T, {
    width?: number;
    component: FC<TodoItemFieldProps & { controller?: TodoListController<T> }>;
    defaultSize?: number;
    defaultTodos?: TodoItem[];
    maxItemSize?: number;
    listClassName?: string;
    addButton?: (add: VoidFunction, currentItemSize?: number) => ReactNode;
    onRemove?: (toDeleteItem: TodoItem, cb: VoidFunction) => void;
  }>;

const TodoListField: HookFormFieldComponent<TodoListFieldProps> = ({
  autoComplete,
  autoFocus,
  className,
  listClassName,
  disabled,
  control,
  placeholder,
  defaultTodos,
  remark,
  label,
  maxLength,
  width,
  minLength,
  component: Component,
  maxItemSize,
  registerName,
  required,
  defaultSize = 1,
  addButton,
  onRemove: removeItem,
  style,
  ...props
}) => {
  const oListRef = useRef<HTMLOListElement | null>(null);
  const {
    control: contextControl,
    setValue,
    clearErrors,
    getValues,
  } = useFormContext();

  const defaultWatchingValue = useMemo(() => (
    getValues(registerName) || defaultTodos
  ), []);

  const {
    errors,
  } = useFormState({ control: control || contextControl });

  const errorTemp = useRef<Record<string, any>>({});
  const [itemSize, setItemSize] = useState<number>(1);
  const [controller] = useState((() => {
    const temp = new TodoListController();

    const initialValue = defaultWatchingValue || defaultTodos;

    if (Array.isArray(initialValue) && initialValue.length) {
      initialValue.forEach((todo) => {
        temp.add(todo);
      });

      return temp;
    }

    /**  at least 1 item on default */
    Array.from(Array(Math.max(defaultSize, 0))).forEach(() => {
      temp.add({ id: `${temp.uniqueId}` });
    });

    return temp;
  })());

  const todoItems: TodoItem[] = useMemo(() => (
    controller.todoItems
  ), [itemSize]);

  /** update hook form value */
  useEffect(() => {
    setValue(registerName, todoItems as any);
  }, [todoItems]);

  /** sync error */
  useEffect(() => { errorTemp.current = errors; });

  const addTodo = useCallback(() => {
    setItemSize((prev) => {
      if (prev !== maxItemSize) {
        controller.add({ id: `${controller.uniqueId}` });

        return prev + 1;
      }

      return prev;
    });
    setTimeout(() => {
      oListRef?.current?.scrollBy({
        top: 1000,
        behavior: 'smooth',
      });
    }, 10);
  }, [setItemSize]);

  const onUpdateContext = useCallback(() => {
    setValue(registerName, controller.todoItems as any);

    if (errorTemp.current?.[registerName]) {
      clearErrors(registerName);
    }
  }, []);

  const onRemove = useCallback((todoName: string) => {
    if (controller.todoItems.length === 1) {
      Message.error?.('項目數量不得低於一個');

      return;
    }

    function removeTodoItemByAndEmit() {
      controller.delete(todoName);
      setItemSize((prev) => prev - 1);
      setValue(registerName, controller.todoItems as any);
    }

    const toDelete = controller.get(todoName);

    if (removeItem && toDelete) {
      removeItem?.(toDelete, removeTodoItemByAndEmit);
    } else {
      removeTodoItemByAndEmit();
    }
  }, [setItemSize]);

  const TodoComponent = useMemo(() => (
    <ol
      ref={oListRef}
      className={cx(classes.ol, listClassName)}
    >
      {todoItems.map((todo) => (
        <BaseField
          key={todo.id}
          labelClassName={classes.label}
          name={todo.id}
          errors={errors}
          style={style}
          required={required}
          width={width}
          remark={remark}
          disabled={disabled}
          label={todoItems.length ? label : undefined}
        >
          <li>
            <Component
              {...props}
              registerName={todo.id}
              controller={controller}
              onUpdateContext={onUpdateContext}
              onRemove={onRemove}
              value={todo.value}
              defaultValue={todo.value}
              minLength={minLength}
              maxLength={maxLength}
            />
          </li>
        </BaseField>
      ))}
    </ol>
  ), [todoItems]);

  return (
    <div className={cx(
      classes.wrapper,
      className,
    )}
    >
      {!!todoItems.length && TodoComponent}
      {addButton && addButton(addTodo, controller.todoItems.length)}
    </div>
  );
};

export default TodoListField;
