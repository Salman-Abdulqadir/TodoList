import Background from "../../components/background";
import ThemeChanger from "../../components/theme-changer";
import CreateTodo from "./widgets/create-todo";
import TodoList from "./widgets/todo-list";

const TodoApp = () => {
  return (
    <main className="w-full flex flex-col space-y-4 items-center justify-center relative">
      <Background />
      <section className="w-full max-w-[700px] h-screen flex flex-col px-4 pt-16 pb-8">
        <header className="flex items-center justify-between mb-[32px]">
          <h1 className="text-4xl tracking-[16px] font-bold text-title-text">
            TODO
          </h1>
          <ThemeChanger />
        </header>
        <div className="space-y-4 mb-8 flex-1 flex flex-col max-h-[500px] md:max-h-full overflow-hidden">
          <CreateTodo />
          <TodoList />
        </div>
        <footer className="text-center text-sm">
          Drag and drop to reorder list
        </footer>
      </section>
    </main>
  );
};

export default TodoApp;
