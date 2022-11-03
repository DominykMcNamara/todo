import { useRouter } from "next/router";
import { Formik, Form, Field } from "formik";
import { supabase } from "../lib/supabaseClient";
import { TextInput } from "./TextInput";
import * as Yup from "yup";
import Link from "next/link";

export default function Login() {
     const router = useRouter()
  return (
    <div className="bg-light w-96 mx-auto my-96 p-10 rounded">
      <h1 className="text-center text-4xl font-bold">Login</h1>
      <Formik
        initialValues={{
        
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string().required("Required"),
        })}
        onSubmit={async (values) => {
         const { data, error } = await supabase.auth.signInWithPassword({ email: values.email, password: values.password })
         router.push('/todolist')
         
        
        }}
      >
        <Form className="flex flex-col mx-auto my-10 p-5">
          

          <TextInput name="email" label="Email" type="email" />

          <TextInput name="password" label="Password" type="password" />

          <button
            className="mt-5 bg-veryLight opacity-75 p-1 hover:opacity-100 hover:font-bold"
            type="submit"
          >
            Submit
          </button>
          <Link href='/signup'>Dont have an account? Sign up here</Link>
        </Form>
        
      </Formik>
    </div>
  );
}