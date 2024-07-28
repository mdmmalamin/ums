import { Form } from "antd";
import { ReactNode } from "react";
import {
  FieldValues,
  FormProvider,
  SubmitHandler,
  useForm,
} from "react-hook-form";

type TFormProps = {
  onSubmit: SubmitHandler<FieldValues>;
  children: ReactNode;
  defaultValues?: { id: string; password: string };
};

const PHForm = ({ onSubmit, children, defaultValues }: TFormProps) => {
  const methods = useForm({ defaultValues });
  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(onSubmit)}>{children}</Form>
    </FormProvider>
  );
};

export default PHForm;
