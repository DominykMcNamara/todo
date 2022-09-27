import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";

import Todo from "./Todo";
export default function TodoList({ session }) {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState("");

  const handleLogout = async (e) => {
    e.preventDefault();
    if (session) {
      try {
        setLoading(true);
        await supabase.auth.signOut();
        alert("Signed out!");
      } catch (error) {
        alert(error.error_description || error.message);
      } finally {
        setLoading(false);
      }
    }
  };

  const handleInsert = async (e) => {
    e.preventDefault();
    try {
      const { data, error } = await supabase.from("todos").insert({
        name: currentTodo,
        completed: false,
        user_id: session.user.id,
      });
      alert("Todo added!");
    } catch (err) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTodos = async () => {
    let { data: todos, error } = await supabase
      .from("todos")
      .select("name")
      .eq("user_id", session.user.id);
    if (error) {
      console.log("error", error);
    } else {
      setTodos(todos);
      console.log(todos);
    }
  };

  const todoItems = todos.map((todo) => (
    <>
      <li className="flex w-96">
        <Todo key={todo.id} todo={todo.name} completed={todo.completed} />
      </li>
    </>
  ));

  useEffect(() => {
    fetchTodos();
  });
  return (
    <>
      <div className="w-96 mx-auto mt-10">
        <div className="flex flex-col rounded text-textReg p-10 mx-auto my-auto text-textReg bg-light">
          <div className="mx-auto  ">
            <i
              className="fa-solid fa-plus   absolute mt-4 ml-3 opacity-75 cursor-pointer hover:opacity-100"
              onClick={handleInsert}
            ></i>
            <input
              type="text"
              className=" rounded p-1 text-1xl mt-2  bg-veryLight font-medium focus:outline-none active:border-none pl-10 "
              placeholder="Add Todo"
              value={currentTodo}
              onChange={(e) => setCurrentTodo(e.target.value)}
            ></input>
          </div>
          {todos ? (
            <ul className="flex flex-col mx-auto">{todoItems}</ul>
          ) : (
            <p className="text-2xl text-center">Create a new todo to begin!</p>
          )}

          <div className="flex flex-row justify-center align-center ">
            <button className="  mt-10 bg-veryLight opacity-75 mx-auto w-48 hover:opacity-100 hover:font-bold">
              Delete Completed
            </button>
            <button className="  ml-2 mt-10 bg-veryLight opacity-75 mx-auto w-48 hover:opacity-100 hover:font-bold">
              Delete All
            </button>
          </div>

          <button
            className="  mt-10 bg-veryLight opacity-75 mx-auto w-48 hover:opacity-100 hover:font-bold"
            type="submit"
            onClick={handleLogout}
          >
            LOGOUT
          </button>
        </div>
      </div>
    </>
  );
}
