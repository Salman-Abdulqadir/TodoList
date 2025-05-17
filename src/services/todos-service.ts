import type { ITodo } from "../types/todos";

const TODOS_STORAGE_KEY = "TODO_APP_TODOS";

export class TodosService {
  static storeTodos(todos: ITodo[]) {
    localStorage.setItem(TODOS_STORAGE_KEY, JSON.stringify(todos));
  }

  static getAllTodos(): ITodo[] {
    const storedTodos = localStorage.getItem(TODOS_STORAGE_KEY);
    try {
      const parsedTodos = JSON.parse(storedTodos || "[]");
      return parsedTodos;
    } catch {
      return [];
    }
  }

  static addTodo(title: string) {
    const allTodos = this.getAllTodos();
    const newTodo = {
      title,
      id: crypto.randomUUID(),
      completed: false,
      createdAt: new Date().toISOString(),
      updatedAt: new Date().toISOString(),
    };
    this.storeTodos([newTodo, ...allTodos]);
    return [newTodo, ...allTodos];
  }

  static deleteTodo(id: string) {
    const allTodos = this.getAllTodos();
    this.storeTodos(allTodos?.filter((todo) => todo.id !== id));
  }

  static updateTodoStatus(id: string, completed: boolean) {
    const allTodos = this.getAllTodos();
    this.storeTodos(
      allTodos?.map((todo) => {
        if (todo.id !== id) return todo;
        return { ...todo, completed };
      })
    );
  }

  static clearCompleted() {
    const allTodos = this.getAllTodos();
    this.storeTodos(allTodos?.filter((todo) => !todo.completed));
  }
}
