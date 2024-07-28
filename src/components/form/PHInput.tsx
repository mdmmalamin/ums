import { Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  placeholder?: string;
  defaultValue?: string;
  label?: string;
};

const PHInput = ({
  type,
  name,
  placeholder,
  defaultValue,
  label,
}: TInputProps) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      {label ? <label htmlFor={name}>{label}</label> : null}
      <Controller
        name={name}
        render={({ field }) => (
          <Input
            {...field}
            defaultValue={defaultValue}
            placeholder={placeholder}
            type={type}
            id={name}
          />
        )}
      />
    </div>
  );
};

export default PHInput;