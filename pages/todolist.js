import { useEffect, useState, useContext } from "react";
import { supabase } from "../lib/supabaseClient";
import { useUser } from "@supabase/auth-helpers-react";
import Layout from "../components/Layout";
import Todo from "../components/Todo";
import { useRouter } from "next/router";
import Link from "next/link";
export default function TodoList() {
  const [loading, setLoading] = useState(false);
  const [todos, setTodos] = useState([]);
  const [currentTodo, setCurrentTodo] = useState("");
  const user = useUser();

  const router = useRouter();
  const handleLogout = async (e) => {
    e.preventDefault();

    try {
      const { error } = await supabase.auth.signOut();

      alert("Signed out!");
    } catch (error) {
      alert(error.error_description || error.message);
    }
    router.push("/");
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
        user_id: user.id,
      });

      setCurrentTodo("");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  const fetchTodos = async () => {
    setLoading(true);
    let { data: todos, error } = await supabase
      .from("todos")
      .select("name, id, user_id, completed")
      .match({ user_id: user.id });
    if (error) {
      console.log("error", error);
    } else {
      setTodos(todos);
    }
    setLoading(false);
  };

  const handleDeleteAll = async () => {
    const { data, error } = await supabase
      .from("todos")
      .delete()
      .match({ user_id: user.id });
  };

  const handleDeleteCompleted = async () => {
    const { data, error } = await supabase
      .from("todos")
      .delete()
      .match({ user_id: user.id, completed: true });
  };

  const todoItems = todos.map((todo) => (
    <div key={todo.id}>
      <li>
        <Todo todo={todo} />
      </li>
    </div>
  ));

  useEffect(() => {
    if (user) {
      fetchTodos();
    }
  });

  if (!user) {
    return <Link href={"/"}>Please sign in</Link>;
  }
  return (
    <Layout>
      <>
        <div className="mx-auto mt-96">
          <div className="flex flex-col rounded w-screen text-textReg p-10 mx-auto my-auto text-textReg bg-light">
            <h1 className="text-center font-bold text-2xl">
              Welcome {user.email}
            </h1>
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
              <p className="text-2xl text-center">
                Create a new todo to begin!
              </p>
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
    </Layout>
  );
}
