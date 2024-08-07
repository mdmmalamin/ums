import { DatePicker, Form } from "antd";
import { Controller } from "react-hook-form";

type TDatePickerProps = {
  name: string;
  defaultValue?: string;
  label?: string;
};

const UMDatePicker = ({ name, defaultValue, label }: TDatePickerProps) => {
  return (
    <div style={{ marginBottom: "1rem" }}>
      {/* {label ? <label htmlFor={name}>{label}</label> : null} */}
      <Controller
        name={name}
        render={({ field }) => (
          <Form.Item label={label}>
            <DatePicker
              {...field}
              size="large"
              defaultValue={defaultValue}
              style={{ width: "100%" }}
            />
          </Form.Item>
        )}
      />
    </div>
  );
};

export default UMDatePicker;
