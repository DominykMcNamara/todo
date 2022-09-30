import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Todo({ todo }) {

    const handleUpdateComplete = async () => {
    const { data, error } = await supabase.from("todos").update({completed: !todo.completed}).match({id: todo.id})
  } 
  return (
    <>
    <div className=" w-96 flex justify-between flex-row ">
      <p className="text-2xl font-bold">{todo.completed ? <s className="opacity-75">{todo.name}</s> : todo.name}</p>
      <div className="flex justify-between flex-row">
        <button onClick={handleUpdateComplete}>{todo.completed ? 'UNDO' : 'COMPLETE' }</button>
      </div>
    </div>
    </>
  );
}
