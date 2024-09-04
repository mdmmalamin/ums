import { Form, Input } from "antd";
import { Controller } from "react-hook-form";

type TFileProps = {
  name: string;
  value?: string;
  label?: string;
};

const UMFile = ({
  name,
  // value=value?.fileName,
  label,
}: TFileProps) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      {/* {label ? <label htmlFor={name}>{label}</label> : null} */}
      <Controller
        name={name}
        render={({ field: { onChange, value, ...field } }) => (
          <Form.Item label={label}>
            <Input
              type="file"
              value={value?.fileName}
              {...field}
              onChange={(e) => onChange(e.target.files?.[0])}
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default UMFile;

{/* <Controller
  name="image"
  render={({ field: { onChange, value, ...field } }) => (
    <Form.Item label="Picture">
      <Input
        type="file"
        value={value?.fileName}
        {...field}
        onChange={(e) => onChange(e.target.files?.[0])}
      />
    </Form.Item>
  )}
/>; */}
