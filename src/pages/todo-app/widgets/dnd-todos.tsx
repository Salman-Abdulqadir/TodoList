import { useState } from "react";
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
import CrossIcon from "../../../assets/images/icon-cross.svg";
import GripIcon from "../../../components/grip-icon";
import useBreakpoint from "../../../lib/hooks/use-breakpoints";

const SortableTodoItem = ({ todo, index }: { todo: ITodo; index: number }) => {
  const [hovered, setHovered] = useState(false);
  const { updateTodoStatus, deleteTodo } = useTodos();
  const breakpoint = useBreakpoint();
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
      className={`relative cursor-pointer px-4 md:px-6 py-4 flex gap-2 items-center justify-between w-full ${
        index !== undefined ? "border-b border-primary-border" : ""
      }`}
      onMouseEnter={() => setHovered(true)}
      onMouseLeave={() => setHovered(false)}
    >
      <div className="flex items-start gap-2">
        <Checkbox
          checked={todo.completed}
          onChange={() => {
            updateTodoStatus(todo.id, !todo.completed);
          }}
        />
        <p
          className={`max-w-[500px] whitespace-normal break-words ${
            todo.completed ? "line-through text-secondary" : "text-secondary"
          }`}
        >
          {todo.title}
        </p>
      </div>
      <div className="flex items-center gap-2">
        {(["base", "sm"]?.includes(breakpoint) || hovered) && (
          <button
            className="cursor-pointer"
            onClick={() => deleteTodo(todo.id)}
          >
            <img src={CrossIcon} alt="Cross" />
          </button>
        )}
        <button {...attributes} {...listeners} className="cursor-grabbing">
          <GripIcon />
        </button>
      </div>
    </li>
  );
};

const DNDTodos = ({ todos }: { todos: ITodo[] }) => {
  const { saveTodos } = useTodos();

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
            <SortableTodoItem key={todo.id} todo={todo} index={index} />
          ))}
        </ul>
      </SortableContext>
    </DndContext>
  );
};

export default DNDTodos;
