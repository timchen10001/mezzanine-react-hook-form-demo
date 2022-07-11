/* eslint-disable react/no-unstable-nested-components */
import { PlusIcon, TimesIcon } from '@mezzanine-ui/icons';
import {
  Button, Icon, Input,
} from '@mezzanine-ui/react';
import { useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';
import { FormFieldsDebug } from '../FormFieldsDebug';
import { FormFieldsWrapper } from '../FormFieldsWrapper';
import { HookFormFieldComponent } from '../typings/field';
import { useTodoItem } from './hooks/use-todo-item';
import TodoListField, { TodoItemFieldProps } from './TodoListField';

export default {
  title: 'Data Display/TodoListField',
};

export const Basic = () => {
  const methods = useForm();

  /**
   * In order to demonstrate in storybook, so I wrote react-component here.
   * You need to D.I.Y your custom-todo-item-field in your project.
  */
  const CustomTodoItemField = useMemo(() => {
    const DIY: HookFormFieldComponent<TodoItemFieldProps> = ({
      controller,
      onUpdateContext,
      onRemove,
      registerName,
      ...props
    }) => {
      const todo = useTodoItem(controller, registerName);

      useEffect(() => {
        if (todo) {
          onUpdateContext(todo);
        }
      // eslint-disable-next-line react-hooks/exhaustive-deps
      }, [todo]);

      return (
        <div
          style={{
            width: '100%',
            display: 'flex',
            alignItems: 'center',
            columnGap: '8px',
          }}
        >
          <div style={{
            width: '100%',
            paddingInlineEnd: '25px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'flex-start',
          }}
          >
            <Input
              {...props}
              fullWidth
              onChange={(e) => controller.update(registerName, { value: e.target.value })}
              inputProps={{
                type: 'text',
              }}
            />

            <Button
              style={{ marginLeft: '20px' }}
              type="button"
              onClick={(e: any) => {
                e.stopPropagation();
                e.preventDefault();
                onRemove(registerName);
              }}
            >
              <Icon
                icon={TimesIcon}
              />
            </Button>
          </div>
        </div>
      );
    };

    return DIY;
  }, []);

  return (
    <div
      style={{ width: '100%', maxWidth: '680px' }}
    >
      <FormFieldsWrapper
        methods={methods}
      >
        <FormFieldsDebug mode="dev" />
        <TodoListField
          registerName="todo-custom-register-name"
          component={CustomTodoItemField}
          addButton={(add) => (
            <Button
              style={{ width: '150px' }}
              size="large"
              prefix={<Icon icon={PlusIcon} />}
              type="button"
              variant="text"
              onClick={add}
            >
              ADD
            </Button>
          )}
        />
      </FormFieldsWrapper>
    </div>
  );
};
