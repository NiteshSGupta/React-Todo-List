import React, { useCallback, useEffect, useState } from "react";
import icon from "./images/icon.png";
import "./css/todo.css";
import * as yup from "yup";
import { useForm, register, handleSubmit } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { Link, useNavigate } from "react-router-dom";

const TodoView = () => {
  const navigation = useNavigate();
  const [tasks, setTasks] = useState([]); //array
  const schema = yup.object().shape({
    task_name: yup.string().required("Enter task"),
  });

  const {
    register,
    handleSubmit,
    reset,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });

  useEffect(() => {
    const storedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    setTasks(storedTasks);
  }, []);

  const submit = (data) => {
    const newTask = data.task_name;

    const updatedTasks = [...tasks, newTask];
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
    reset();
  };

  const handleEdit = useCallback(
    (index) => {
      navigation(`/todo-edit/${index}`);
    },
    [navigation]
  );

  const handleDelete = useCallback((index) => {
    const updatedTasks = [...tasks];
    updatedTasks.splice(index, 1);
    setTasks(updatedTasks);
    localStorage.setItem("tasks", JSON.stringify(updatedTasks));
  });

  return (
    <div className="bg-body">
      <div className="container_todo">
        <div className="todo-app">
          <h2>
            To-Do List <img src={icon} alt="Icon" />
          </h2>
          <div className="row">
            <form onSubmit={handleSubmit(submit)} className="form-inline">
              <input
                className="input"
                type="text"
                name="task_name"
                placeholder="Add your task"
                {...register("task_name")}
              />
              <button className="addButton" type="submit">
                Add
              </button>
            </form>
          </div>
          {errors.task_name && <p>{errors.task_name.message}</p>}
          <div>
            {tasks.map((task, index) => (
              <div key={index} id="list-container">
                <div>
                  <h3>
                    <span className="indexclass">{index + 1}</span>
                    <span>{task}</span>
                  </h3>
                </div>
                <span>
                  <button
                    className="editButton"
                    type="button"
                    onClick={() => handleEdit(index)}
                  >
                    Edit
                  </button>
                  <button
                    className="editButton"
                    type="button"
                    onClick={() => handleDelete(index)}
                  >
                    Delete
                  </button>
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TodoView;
