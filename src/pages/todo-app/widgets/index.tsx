import Header from "./Header";
import CreateTodo from "./CreateTodo";
import DNDTodoList from "./DNDTodoList";
import Footer from "./Footer";

const Todos = () => {
  return (
    <div className="h-full flex flex-col gap-8 px-4 pt-[100px] pb-8 w-full tablet:w-[40vw] mx-auto">
      <Header />
      <CreateTodo />
      <DNDTodoList />
      <Footer />
    </div>
  );
};

export default Todos;
