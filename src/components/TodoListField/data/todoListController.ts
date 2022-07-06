import { Observable } from 'rxjs';
import EventEmitter from 'eventemitter3';
import { TodoItem, UpdateTodoOptions } from './types.interface';

class TodoListController<T = any> extends EventEmitter {
  static Events = {
    UPDATE: 'E/UPDATE',
  };

  /**
   * error
   */
  private _todoItemsStore: Map<string, TodoItem<T>> = new Map();

  private _todoObservableMap: Map<string, Observable<TodoItem<T>>> = new Map();

  private _todoItemIdSet: Set<TodoItem<T>['id']> = new Set();

  private _uniqueKey = 0;

  watch(id: TodoItem<T>['id']) {
    const storedObservable = this._todoObservableMap.get(id);

    const observable = storedObservable || new Observable<TodoItem<T>>((subscriber) => {
      function onUpdate(nextDate: TodoItem<T>) {
        subscriber.next(nextDate);
      }

      this.on(`${TodoListController.Events.UPDATE}:${id}`, onUpdate);
    });

    if (!storedObservable) {
      this._todoObservableMap.set(id, observable);
    }

    return observable;
  }

  add(item: TodoItem<T>): TodoItem<T> {
    const storedTodo = this.get(item.id);

    const updateItem = item;

    if (storedTodo) {
      updateItem.value = item.value !== undefined ? item.value : storedTodo.value;
    }

    if (!storedTodo) {
      this._uniqueKey += 1;
      updateItem.value = item?.value;

      this.emit(`${TodoListController.Events.UPDATE}:${item.id}`, updateItem);
    }

    this._todoItemIdSet.add(item.id);
    this._todoItemsStore.set(item.id, updateItem);

    return updateItem;
  }

  update(
    id: TodoItem<T>['id'],
    updateOptions: UpdateTodoOptions<T>,
  ): TodoItem<T> | null {
    const storedTodo = this.get(id);

    if (storedTodo) {
      const updateTodo = {
        id,
        value: updateOptions?.value === undefined ? storedTodo.value : updateOptions?.value,
      };

      this.add(updateTodo);

      this.emit(`${TodoListController.Events.UPDATE}:${id}`, updateTodo);

      return updateTodo;
    }

    return null;
  }

  get(id: TodoItem<T>['id']) {
    return this._todoItemsStore.get(id);
  }

  delete(id: TodoItem<T>['id']) {
    const storedTodo = this._todoItemsStore.get(id);

    if (!storedTodo) return;

    this._todoItemIdSet.delete(id);
    this._todoItemsStore.delete(id);

    this.emit(`${TodoListController.Events.UPDATE}:${id}`, null);
  }

  clear() {
    this.todoItems.forEach((todo) => this.delete(todo.id));

    return this._todoItemIdSet.size === 0;
  }

  get todoItems(): TodoItem<T>[] {
    return Array
      .from(this._todoItemIdSet.values())
      .map((id) => this._todoItemsStore.get(id))
      .filter((todo) => todo) as TodoItem<T>[];
  }

  get uniqueId() {
    return this._uniqueKey + 1;
  }
}

export default TodoListController;
