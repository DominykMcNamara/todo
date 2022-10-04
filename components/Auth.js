import { useState } from "react";
import { supabase } from "../lib/supabaseClient";

export default function Auth() {
  const [loading, setLoading] = useState(false);
  const [email, setEmail] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      if(!email) {
        alert("Please enter a valid email.")
        return
      }
      const { error } = await supabase.auth.signInWithOtp({
        email: email,
      });
      if (error) throw error;
      alert("Check your email for the login link!");
    } catch (error) {
      alert(error.error_description || error.message);
    } finally {
      setLoading(false);
      setEmail("")
    }
  };

  return (
    <div>
      {loading ? (
        <>
          <h2 className="text-center mt-4 font-bold text-3xl">
            Sending magic link...
          </h2>
        </>
      ) : (
        <div className="p-96">
          <div className="flex flex-col w-96 rounded text-textReg p-10 mx-auto  text-textReg bg-light">
            <h2 className="text-center text-4xl font-bold">Sign In</h2>
            <p className="text-center text-2xl opacity-95 font-medium">
              No signup necessary{" "}
            </p>
            <label className="text-2xl mt-5 font-semibold" htmlFor="email">
              Email:{" "}
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className=" rounded p-1 text-1xl mt-2 bg-veryLight font-medium focus:outline-none active:border-none "
            />

            <button
              className="mt-10 bg-veryLight opacity-75 p-1 hover:opacity-100 hover:font-bold"
              type="submit"
              onClick={handleLogin}
            >
              SEND MAGIC LINK
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
