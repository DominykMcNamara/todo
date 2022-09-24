import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function TodoList({ session }) {
  const [loading, setLoading] = useState(false);
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
  return (
    <>
      <button onClick={handleLogout}>LOGOUT</button>
    </>
  );
}
