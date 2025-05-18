import { create } from "zustand";
import type { ITodo } from "../types/todos";
import { TodosService } from "../services/todos-service";
import { toast } from "sonner";

type TodosStore = {
  todos: ITodo[];
  inputValue: string;
  selectedFilter: string;
  setSelectedFilter: (filter: string) => void;
  setInputValue: (value: string) => void;
  refreshTodos: () => void;
  addTodo: () => void;
  clearCompletedTodos: () => void;
  updateTodoStatus: (id: string, completed: boolean) => void;
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
  inputValue: "",
};

export const useTodos = create<TodosStore>((set, get) => ({
  ...TODOS_STORE_INITIAL_STATE,

  setSelectedFilter: (selectedFilter: string) =>
    set(() => ({ selectedFilter })),

  setInputValue: (inputValue: string) => set(() => ({ inputValue })),

  refreshTodos: () => set(() => ({ todos: TodosService.getAllTodos() })),

  addTodo: () => {
    const { inputValue, setInputValue, refreshTodos } = get();
    if (inputValue) {
      TodosService.addTodo(inputValue);
      setInputValue("");
      refreshTodos();
      toast.success("Task added successfully!");
    }
  },

  clearCompletedTodos: () => {
    TodosService.clearCompleted();
    get().refreshTodos();
  },

  updateTodoStatus: (id: string, completed: boolean) => {
    console.log("I am here", id, completed);
    TodosService.updateTodoStatus(id, completed);
    get().refreshTodos();
  },

  saveTodos: (todos: ITodo[]) => {
    TodosService.storeTodos(todos);
    get().refreshTodos();
  },
}));
