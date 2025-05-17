import Header from "./widgets/Header";
import CreateTodo from "./widgets/CreateTodo";
import DNDTodoList from "./widgets/DNDTodoList";
import Footer from "./widgets/Footer";

const TodoApp = () => {
  return (
    <main className="h-full flex flex-col gap-8 px-4 pt-[100px] pb-8 w-full tablet:w-[40vw] mx-auto">
      <Header />
      <CreateTodo />
      <DNDTodoList />
      <Footer />
    </main>
  );
};

export default TodoApp;
