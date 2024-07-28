import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TSelectProps = {
  name: string;
  label?: string;
  options: { value: string; label: string; disabled?: true }[];
};

const UMSelect = ({ label, name, options }: TSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            {...field}
            style={{ width: "100%" }}
            options={options}
            size="large"
            // defaultValue={label?.toUpperCase()}
          />
          {error && <small style={{color: "red"}}>{error?.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default UMSelect;
