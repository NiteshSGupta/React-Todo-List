import React, { useEffect, useState } from "react";
import icon from "./images/icon.png";
import "./css/todo.css";
import * as yup from "yup";
import { useForm, register, handleSubmit } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import { useParams, useNavigate } from "react-router-dom";

const TodoEdit = () => {
 const { index } = useParams(); 
 const navigation = useNavigate();

  const [tasks, setTasks] = useState([]);
  const schema = yup.object().shape({
    task_name: yup.string().required("Enter task"),
  });

  const {
    register,
    handleSubmit,
    setValue,
    formState: { errors },
  } = useForm({ resolver: yupResolver(schema) });



  useEffect(() => {
    const storedData = JSON.parse(localStorage.getItem("tasks")) || [];
    const dataToEdit = storedData[index];
    
    if (dataToEdit) {
      setValue("task_name", dataToEdit);
    }
  }, [index, setValue]);

  const onSubmit = (data) => {
    const storedData = JSON.parse(localStorage.getItem("tasks")) || [];
    storedData[index] = data.task_name;
    localStorage.setItem("tasks", JSON.stringify(storedData));
    alert("Data updated successfully!");
    navigation("/todo-view");
  };

  return (
    <div className="bg-body">
      <div className="container_todo">
        <div className="todo-app">
          <h2>
            To-Do List <img src={icon} alt="Icon" />
          </h2>
          <div className="row">
            <form  className="form-inline" onSubmit={handleSubmit(onSubmit)}>
              <input
                className="input"
                type="text"
                name="task_name"
                id="task_name"
                placeholder="Add your task"
                {...register("task_name")}
              />
              <button className="addButton" type="submit">
                Update
              </button>
            </form>
          </div>
          {errors.task_name && <p>{errors.task_name.message}</p>}

        </div>
      </div>
    </div>
  );
};

export default TodoEdit;
