import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider } from "./store/theme/provider.tsx";
import TodoApp from "./pages/todo-app/index.tsx";
import { Toaster } from "sonner";
import "./styles/index.css";

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <ThemeProvider>
      <Toaster position="top-center" />
      <TodoApp />
    </ThemeProvider>
  </StrictMode>
);
