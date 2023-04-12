import { useField, FieldHookConfig, ErrorMessage } from "formik";
import { TextFieldProps } from "./text-field.props";

const TextFields = ({ ...props }: TextFieldProps & FieldHookConfig<string>) => {
  const [field, meta] = useField(props);

  return (
    <div className="inline-block w-full ">
      <label
        className={`${meta.touched && meta.error && "border-red-600 border-2"}`}
      >
        <input className="input" {...props} {...field} />
      </label>
      <p className="text-red-500">
        <ErrorMessage name={field.name} />
      </p>
    </div>
  );
};

export default TextFields;
