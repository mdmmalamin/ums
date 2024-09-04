import { Form, Select } from "antd";
import { Controller } from "react-hook-form";

type TSelectProps = {
  name: string;
  label?: string;
  options: { value: string; label: string; disabled?: true }[] | undefined;
  disabled?: boolean;
  mode?: "multiple" | "tags" | undefined;
};

const UMSelect = ({ label, name, options, disabled, mode }: TSelectProps) => {
  return (
    <Controller
      name={name}
      render={({ field, fieldState: { error } }) => (
        <Form.Item label={label}>
          <Select
            {...field}
            mode={mode}
            style={{ width: "100%" }}
            options={options}
            size="large"
            disabled={disabled}
            // defaultValue={label?.toUpperCase()}
          />
          {error && <small style={{ color: "red" }}>{error?.message}</small>}
        </Form.Item>
      )}
    />
  );
};

export default UMSelect;
