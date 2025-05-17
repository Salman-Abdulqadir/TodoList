import { useMemo } from "react";
import {
  DragDropContext,
  Draggable,
  Droppable,
  type OnDragEndResponder,
} from "react-beautiful-dnd";
import { useTodos, FILTER_OPTIONS } from "../../../store/todos";

const DNDTodoList = () => {
  const {
    todos,
    selectedFilter,
    setSelectedFilter,
    saveTodos,
    updateTodoStatus,
    clearCompletedTodos,
  } = useTodos();

  const handleOnDragEnd: OnDragEndResponder = (result) => {
    if (!result.destination) return;

    const items = Array.from(todos);
    const [reorderedItem] = items.splice(result.source.index, 1);
    items.splice(result.destination.index, 0, reorderedItem);
    saveTodos(items);
  };

  const activeTodoCount = useMemo(() => {
    return todos.filter((todo) => !todo.completed)?.length;
  }, [todos]);

  let filteredTodos = Array.from(todos);
  if (selectedFilter !== FILTER_OPTIONS.All) {
    const filterCompleted = selectedFilter === FILTER_OPTIONS.Completed;
    filteredTodos = filteredTodos?.filter(
      (todo) => todo.completed === filterCompleted
    );
  }
  return (
    <div className="bg-base-100 rounded-md shadow-md flex-1 overflow-hidden flex flex-col">
      {todos?.length ? (
        <>
          <div className="flex-1 overflow-scroll">
            {filteredTodos?.length ? (
              <DragDropContext onDragEnd={handleOnDragEnd}>
                <Droppable droppableId="todos">
                  {(provided) => (
                    <ul {...provided.droppableProps} ref={provided.innerRef}>
                      {filteredTodos.map((todo, index) => {
                        const { id, title, completed } = todo;
                        return (
                          <Draggable key={id} draggableId={id} index={index}>
                            {(provided) => (
                              <li
                                className="px-8 py-4 border-b-[1px] flex gap-2 items-center"
                                ref={provided.innerRef}
                                {...provided.draggableProps}
                                {...provided.dragHandleProps}
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
                  )}
                </Droppable>
              </DragDropContext>
            ) : (
              <div className="flex flex-col items-center justify-center h-full gap-3">
                <span>No todos for the applied filter</span>
                <button
                  className="btn btn-sm btn-primary"
                  onClick={() => setSelectedFilter(FILTER_OPTIONS.All)}
                >
                  Remove filters
                </button>
              </div>
            )}
          </div>
          <div className="px-8 py-4 w-full flex items-center justify-between">
            <span>{activeTodoCount} items left</span>
            <ul className="flex items-center gap-3">
              {Object.keys(FILTER_OPTIONS).map((option, index) => (
                <li
                  onClick={() => setSelectedFilter(FILTER_OPTIONS[option])}
                  key={`filter-option-${index}-${option}`}
                  className={`font-bold cursor-pointer ${
                    selectedFilter !== FILTER_OPTIONS[option]
                      ? "text-light-dark-grayish-blue"
                      : "text-primary"
                  }`}
                >
                  {option}
                </li>
              ))}
            </ul>
            <span
              className="text-light-dark-grayish-blue cursor-pointer"
              onClick={clearCompletedTodos}
            >
              clear completed
            </span>
          </div>
        </>
      ) : (
        <div className="flex flex-col h-full items-center justify-center">
          You don't have any todos
        </div>
      )}
    </div>
  );
};

export default DNDTodoList;
