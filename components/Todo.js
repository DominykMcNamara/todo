import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Todo({ todo }) {
  const handleUpdateComplete = async () => {
    const { data, error } = await supabase
      .from("todos")
      .update({ completed: !todo.completed })
      .match({ id: todo.id });
  };
  return (
    <div className=" flex justify-between flex-row hover:bg-veryLight mt-10 rounded p-3">
    
      <p className=" text-2xl font-bold ">
        {todo.completed ? (
          <s className="opacity-50 hover:opacity-100">{todo.name}</s>
        ) : (
          todo.name
        )}
      </p>

      <div className="flex justify-between ml-5 flex-row">
        <button
          className="opacity-75 hover:opacity-100"
          onClick={handleUpdateComplete}
        >
          {todo.completed ? "UNDO" : "COMPLETE"}
        </button>
      </div>
    </div>
  );
}
