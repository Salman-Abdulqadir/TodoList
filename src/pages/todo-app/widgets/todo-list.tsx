import { useMemo } from "react";

import { useTodos, FILTER_OPTIONS } from "../../../store/todos";
import DNDTodos from "./dnd-todos";

const Filters = () => {
  const { todos, selectedFilter, setSelectedFilter, clearCompletedTodos } =
    useTodos();
  const activeTodoCount = useMemo(() => {
    return todos.filter((todo) => !todo.completed)?.length;
  }, [todos]);
  const filterOptions = Object.keys(FILTER_OPTIONS).map((option, index) => (
    <li
      onClick={() => setSelectedFilter(FILTER_OPTIONS[option])}
      key={`filter-option-${index}-${option}`}
      className={`font-bold cursor-pointer ${
        selectedFilter !== FILTER_OPTIONS[option]
          ? "text-secondary-text hover:text-primary-text"
          : "text-primary"
      }`}
    >
      {option}
    </li>
  ));
  return (
    <div className="space-y-6">
      <div className=" bg-foreground px-8 py-4 w-full flex items-center justify-between text-sm border-t border-primary-border">
        <span>{activeTodoCount} items left</span>
        <ul className="items-center gap-3 hidden md:flex">{filterOptions}</ul>
        <button
          className="cursor-pointer text-secondary-text hover:text-primary-text"
          onClick={clearCompletedTodos}
        >
          clear completed
        </button>
      </div>
      <ul className="bg-foreground py-4 rounded-lg items-center justify-center gap-3 flex md:hidden text-sm">
        {filterOptions}
      </ul>
    </div>
  );
};

const EmptyTodos = ({ isFilterApplied }: { isFilterApplied: boolean }) => {
  const { setSelectedFilter } = useTodos();
  return (
    <div className="bg-foreground flex-1 flex flex-col space-y-4 justify-center items-center">
      <p>You don't have any todos</p>
      {isFilterApplied && (
        <button
          onClick={() => setSelectedFilter(FILTER_OPTIONS.All)}
          className="text-sm cursor-pointer text-title-text px-2 py-1 rounded-lg"
          style={{ background: "var(--primary-gradient)" }}
        >
          Remove Filters
        </button>
      )}
    </div>
  );
};

const TodoList = () => {
  const { todos, selectedFilter } = useTodos();

  const filteredTodos = useMemo(() => {
    let tempTodos = Array.from(todos);
    if (selectedFilter !== FILTER_OPTIONS.All) {
      const filterCompleted = selectedFilter === FILTER_OPTIONS.Completed;
      tempTodos = tempTodos?.filter(
        (todo) => todo.completed === filterCompleted
      );
    }
    return tempTodos;
  }, [selectedFilter, todos]);

  return (
    <div className="rounded-md drop-shadow-lg md:drop-shadow-2xl flex flex-col flex-1 overflow-hidden">
      {filteredTodos?.length ? (
        <div className="flex flex-col flex-1 overflow-hidden">
          <div className="flex-1 overflow-scroll bg-foreground ">
            <DNDTodos todos={filteredTodos} />
          </div>
          <Filters />
        </div>
      ) : (
        <>
          <EmptyTodos isFilterApplied={!!todos?.length} />
          <Filters />
        </>
      )}
    </div>
  );
};

export default TodoList;
