import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./store/theme/provider.tsx";
import TodoApp from "./pages/todo-app/index.tsx";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  // <StrictMode>
  <ThemeProvider>
    <TodoApp />
  </ThemeProvider>
  // </StrictMode>
);
