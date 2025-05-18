import { create } from "zustand";
import type { ITodo } from "../types/todos";
import { TodosService } from "../services/todos-service";
import { toast } from "sonner";

type TodosStore = {
  todos: ITodo[];
  newTodo: { value: string; completed: boolean };
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  setNewTodo: (key: "value" | "completed", value: string | boolean) => void;
  refreshTodos: () => void;
  addTodo: () => void;
  clearCompletedTodos: () => void;
  updateTodoStatus: (id: string, completed: boolean) => void;
  deleteTodo: (id: string) => void;
  saveTodos: (todos: ITodo[]) => void;
};

export const FILTER_OPTIONS: Record<string, string> = {
  All: "all",
  Active: "active",
  Completed: "completed",
};

const TODOS_STORE_INITIAL_STATE = {
  todos: TodosService.getAllTodos(),
  selectedFilter: FILTER_OPTIONS.All,
  newTodo: {
    value: "",
    completed: false,
  },
};

export const useTodos = create<TodosStore>((set, get) => ({
  ...TODOS_STORE_INITIAL_STATE,

  setSelectedFilter: (selectedFilter: string) =>
    set(() => ({ selectedFilter })),

  setNewTodo: (key: "value" | "completed", value: string | boolean) =>
    set((state) => ({ newTodo: { ...state.newTodo, [key]: value } })),

  refreshTodos: () => set(() => ({ todos: TodosService.getAllTodos() })),

  addTodo: () => {
    const { newTodo, refreshTodos } = get();
    if (newTodo.value) {
      TodosService.addTodo(newTodo.value, newTodo.completed);
      set(() => ({ newTodo: { value: "", completed: false } }));
      refreshTodos();
      toast.success("Task added successfully!");
    }
  },

  clearCompletedTodos: () => {
    TodosService.clearCompleted();
    get().refreshTodos();
  },

  updateTodoStatus: (id: string, completed: boolean) => {
    TodosService.updateTodoStatus(id, completed);
    get().refreshTodos();
  },

  saveTodos: (todos: ITodo[]) => {
    TodosService.storeTodos(todos);
    get().refreshTodos();
  },

  deleteTodo: (id: string) => {
    TodosService.deleteTodo(id);
    get().refreshTodos();
    toast.success("Deleted successfully!");
  },
}));
