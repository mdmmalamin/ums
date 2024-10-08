import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TInputProps = {
  type: string;
  name: string;
  placeholder?: string;
  defaultValue?: string;
  label?: string;
  disabled?: boolean;
};

const UMInput = ({
  type,
  name,
  placeholder,
  defaultValue,
  label,
  disabled,
}: TInputProps) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      {/* {label ? <label htmlFor={name}>{label}</label> : null} */}
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <Input
              {...field}
              defaultValue={defaultValue}
              placeholder={placeholder}
              type={type}
              id={name}
              size="large"
              disabled={disabled}
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default UMInput;
