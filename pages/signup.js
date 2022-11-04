import { useRouter } from "next/router";
import { Formik, Form, Field } from "formik";
import { supabase } from "../lib/supabaseClient";
import { TextInput } from '../components/TextInput'
import * as Yup from "yup";


export default function Signup() {
  const router = useRouter()
  return (
    <div className="bg-light w-96 mx-auto my-96 p-10 rounded">
      <h1 className="text-center text-4xl font-bold">Sign up</h1>
      <Formik
        initialValues={{
          firstName: "",
          lastName: "",
          username: "",
          email: "",
          password: "",
        }}
        validationSchema={Yup.object({
          firstName: Yup.string().required("Required"),
          lastName: Yup.string().required("Required"),
          username: Yup.string()
            .max(15, "Must be 20 characters or less")
            .required("Required"),
          email: Yup.string()
            .email("Invalid email address")
            .required("Required"),
          password: Yup.string().required("Required"),
        })}
        onSubmit={async (values) => {
          await supabase.auth.signUp({ email: values.email, password: values.password, options: {emailRedirectTo: "https://todo-omega-lovat.vercel.app/todolist"}})
     
         alert('We have sent you a link via email please verify your account.')
        
         
        
        }}
      >
        <Form className="flex flex-col mx-auto my-10 p-5">
          <TextInput name="firstName" label="First Name" type="text" />

          <TextInput name="lastName" label="Last Name" type="text" />

          <TextInput name="username" label="Username" type="text" />

          <TextInput name="email" label="Email" type="email" />

          <TextInput name="password" label="Password" type="password" />

          <button
            className="mt-5 bg-veryLight opacity-75 p-1 hover:opacity-100 hover:font-bold"
            type="submit"
          >
            Submit
          </button>
        </Form>
      </Formik>
    </div>
  );
}