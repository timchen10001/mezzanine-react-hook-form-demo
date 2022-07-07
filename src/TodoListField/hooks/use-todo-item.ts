import { useEffect, useState } from 'react';
import TodoListController from '../data/todo-list-controller';
import { TodoItem } from '../data/typings';

export function useTodoItem<T = any>(
  controller: TodoListController<T>,
  id: TodoItem<T>['id'],
) {
  const [data, setData] = useState<TodoItem<T> | null>(controller.get(id) || null);

  useEffect(() => {
    const subscription = controller
      .watch(id)
      .subscribe({
        next(nextData: TodoItem<T> | null) {
          setData(nextData ?? null);
        },
      });

    return () => {
      controller.delete(id);
      subscription?.unsubscribe();
    };
  }, [id]);

  return data;
}
