import { useMemo } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  type OnDragEndResponder,
} from "react-beautiful-dnd";
import { useTodos, FILTER_OPTIONS } from "../../../store/todos";
import type { ITodo } from "../../../types/todos";

const DNDTodos = ({ todos }: { todos: ITodo[] }) => {
  const { saveTodos, updateTodoStatus } = useTodos();

  const handleOnDragEnd: OnDragEndResponder = (result) => {
    if (!result.destination) return;

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    saveTodos(items);
  };
  return (
    <DragDropContext onDragEnd={handleOnDragEnd}>
      <Droppable droppableId="todos">
        {(provided) => (
          <div
            ref={provided.innerRef}
            {...provided.droppableProps}
            className="flex-1 overflow-y-auto"
          >
            <ul>
              {todos.map((todo, index) => {
                const { id, title, completed } = todo;
                return (
                  <Draggable key={id} draggableId={id} index={index}>
                    {(provided) => (
                      <li
                        ref={provided.innerRef}
                        {...provided.draggableProps}
                        {...provided.dragHandleProps}
                        className={`px-8 py-4 flex gap-2 items-center ${
                          index !== todos?.length - 1 &&
                          "border-b border-primary-border"
                        }`}
                      >
                        <input
                          type="checkbox"
                          className="checkbox checkbox-primary"
                          checked={completed}
                          onChange={() =>
                            updateTodoStatus(todo.id, !todo.completed)
                          }
                        />
                        <p
                          className={`text-xl font-semibold ${
                            completed
                              ? "line-through text-light-light-grayish-blue"
                              : "text-light-very-dark-grayish-blue"
                          }`}
                        >
                          {title}
                        </p>
                      </li>
                    )}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </ul>
          </div>
        )}
      </Droppable>
    </DragDropContext>
  );
};

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
          ? "text-primary-text"
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
        <button className="cursor-pointer" onClick={clearCompletedTodos}>
          clear completed
        </button>
      </div>
      <ul className="bg-foreground py-4 rounded-lg items-center justify-center gap-3 flex md:hidden">
        {filterOptions}
      </ul>
    </div>
  );
};

const EmptyTodos = ({ isFilterApplied }: { isFilterApplied: boolean }) => {
  const { setSelectedFilter } = useTodos();
  return (
    <div className="bg-foreground flex-1 flex flex-col space-y-4 justify-center items-center">
      You don't have any todos
      {isFilterApplied && (
        <button onClick={() => setSelectedFilter(FILTER_OPTIONS.All)}>
          Remove filters
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
        <EmptyTodos isFilterApplied={!!todos?.length} />
      )}
    </div>
  );
};

export default TodoList;
