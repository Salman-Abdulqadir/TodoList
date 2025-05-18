import Checkbox from "../../../components/checkbox";
import { useTodos } from "../../../store/todos";

const CreateTodo = () => {
  const { newTodo, setNewTodo, addTodo } = useTodos();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addTodo();
      }}
      className="flex items-center gap-2 bg-foreground px-4 md:px-6 py-2 border-none rounded-md w-full text-inherit"
    >
      <Checkbox
        checked={newTodo.completed}
        onChange={() => setNewTodo("completed", !newTodo.completed)}
      />
      <input
        className="p-2 border-none w-full text-inherit"
        type="text"
        value={newTodo.value}
        onChange={(e) => setNewTodo("value", e.target.value)}
        placeholder="Create a new todo..."
      />
    </form>
  );
};

export default CreateTodo;
