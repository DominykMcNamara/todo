import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const error = await supabase.auth.signInWithOtp({ email: email });
      if (error) throw error;
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {loading ? (
        "Sending magic link..."
      ) : (
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <button type="submit" onClick={handleLogin}>SUBMIT</button>
        </div>
      )}
    </>
  );
}
