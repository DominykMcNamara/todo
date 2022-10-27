import { faPersonCirclePlus } from "@fortawesome/free-solid-svg-icons";
import { useField } from "formik";

export const TextInput = ({ label, ...props }) => {
  const [field, meta] = useField(props);
  return (
    <>
      <label className="mt-5" htmlFor={props.id || props.name}>{label}</label>
      <input className="text-input rounded p-1 text-1xl  bg-veryLight font-medium focus:outline-none active:border-none " {...field} {...props} />
      {meta.touched && meta.error ? (
        <div className="error">{meta.error}</div>
      ) : null}
    </>
  );
};
