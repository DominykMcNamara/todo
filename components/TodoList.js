import { useEffect, useState } from "react";
import { supabase } from "../lib/supabaseClient";
import Layout from "./Layout";
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
    if (!currentTodo) {
      alert("Please enter a todo.");
      return;
    }
    try {
      const { data, error } = await supabase.from("todos").insert({
        name: currentTodo,
        completed: false,
        user_id: session.user.id,
      });

      setCurrentTodo("");
    } catch (err) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTodos = async () => {
    let { data: todos, error } = await supabase
      .from("todos")
      .select("name, id, user_id, completed")
      .eq("user_id", session.user.id);
    if (error) {
      console.log("error", error);
    } else {
      setTodos(todos);
      console.log(todos);
    }
  };

  const handleDeleteAll = async () => {
    const { data, error } = await supabase
      .from("todos")
      .delete()
      .match({ user_id: session.user.id });
  };

  const handleDeleteCompleted = async () => {
    const { data, error } = await supabase
      .from("todos")
      .delete()
      .match({ user_id: session.user.id, completed: true });
  };

  const todoItems = todos.map((todo) => (
    <div key={todo.id}>
      <li >
        <Todo todo={todo} />
      </li>
    </div>
  ));

  useEffect(() => {
    fetchTodos();
  });
  return (
    <>
      <div className="mx-auto mt-96">
        <div className="flex flex-col rounded w-screen text-textReg p-10 mx-auto my-auto text-textReg bg-light">
          <div className="mx-auto  ">
            <p
              className="absolute  text-3xl ml-3 opacity-75 cursor-pointer hover:opacity-100"
              onClick={handleInsert}
            >
              &#8594;
            </p>
            <input
              type="text"
              className=" rounded p-1 text-1xl mt-2 tablet:w-96   bg-veryLight font-medium focus:outline-none active:border-none pl-10 "
              placeholder="Add Todo"
              value={currentTodo}
              onChange={(e) => setCurrentTodo(e.target.value)}
            ></input>
          </div>
          {todos ? (
            <ul className="flex max-w-96 flex-col mx-auto">{todoItems}</ul>
          ) : (
            <p className="text-2xl text-center">Create a new todo to begin!</p>
          )}

          <div
            onClick={handleDeleteCompleted}
            className="flex flex-row justify-center align-center w-96 mx-auto "
          >
            <button className="  mt-10 bg-veryLight opacity-75 mx-auto w-48 hover:opacity-100 hover:font-bold">
              Delete Completed
            </button>

            <button
              onClick={handleDeleteAll}
              className="mt-10 bg-veryLight opacity-75 mx-auto w-48 hover:opacity-100 ml-5 hover:font-bold"
            >
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
