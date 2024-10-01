import { createRoot } from "react-dom/client";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import Login from "./login";
import TodoView from "./TodoView";
import TodoEdit from "./TodoEdit";

const Router = () => {
    return (
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/todo-view" element={<TodoView />} />
          <Route path="/todo-edit/:index" element={<TodoEdit />} />
        </Routes>
      </BrowserRouter>
    );
  }

  export default Router;  