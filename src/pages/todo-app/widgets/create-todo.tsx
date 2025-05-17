import { useTodos } from "../../../store/todos";

const CreateTodo = () => {
  const { inputValue, setInputValue, addTodo } = useTodos();

  return (
    <form
      onSubmit={(e) => {
        e.preventDefault();
        addTodo();
      }}
    >
      <input
        className="p-4 border-none rounded-md w-full text-inherit bg-foreground"
        type="text"
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        placeholder="Create a new todo..."
      />
    </form>
  );
};

export default CreateTodo;
