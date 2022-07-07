export type TodoItem<T = any> = {
  id: string,
  value?: T,
};

export type UpdateTodoOptions<T> = {
  value?: TodoItem<T>['value'],
};
