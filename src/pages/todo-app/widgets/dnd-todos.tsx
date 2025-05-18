import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  type DragEndEvent,
} from "@dnd-kit/core";
import {
  arrayMove,
  SortableContext,
  verticalListSortingStrategy,
  useSortable,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { useTodos } from "../../../store/todos";
import type { ITodo } from "../../../types/todos";
import Checkbox from "../../../components/checkbox";

const SortableTodoItem = ({
  todo,
  index,
  updateTodoStatus,
}: {
  todo: ITodo;
  index: number;
  updateTodoStatus: (id: string, completed: boolean) => void;
}) => {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: todo.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
  };

  return (
    <li
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={`px-8 py-4 flex gap-2 items-center w-full ${
        index !== undefined ? "border-b border-primary-border" : ""
      }`}
      onClick={() => {
        console.log("hello");
        updateTodoStatus(todo.id, !todo.completed);
      }}
    >
      <Checkbox
        checked={todo.completed}
        onChange={() => {
          console.log("hello");
          updateTodoStatus(todo.id, !todo.completed);
        }}
      />
      <p
        className={` ${
          todo.completed ? "line-through text-secondary" : "text-secondary"
        }`}
      >
        {todo.title}
      </p>
    </li>
  );
};

const DNDTodos = ({ todos }: { todos: ITodo[] }) => {
  const { saveTodos, updateTodoStatus } = useTodos();

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    if (!over || active.id === over.id) return;

    const oldIndex = todos.findIndex((todo) => todo.id === active.id);
    const newIndex = todos.findIndex((todo) => todo.id === over.id);

    const reordered = arrayMove(todos, oldIndex, newIndex);
    saveTodos(reordered);
  };

  return (
    <DndContext
      collisionDetection={closestCenter}
      sensors={sensors}
      onDragEnd={handleDragEnd}
    >
      <SortableContext
        items={todos.map((todo) => todo.id)}
        strategy={verticalListSortingStrategy}
      >
        <ul className="list-none m-0 p-0">
          {todos.map((todo, index) => (
            <SortableTodoItem
              key={todo.id}
              todo={todo}
              index={index}
              updateTodoStatus={updateTodoStatus}
            />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
};

export default DNDTodos;
