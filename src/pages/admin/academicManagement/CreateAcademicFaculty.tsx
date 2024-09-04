import { FieldValues, SubmitHandler } from "react-hook-form";
import UMForm from "../../../components/form/UMForm";
import { Button, Col, Flex } from "antd";
import { useCreateAcademicFacultyMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global.type";
import UMInput from "../../../components/form/UMInput";

const CreateAcademicFaculty = () => {
  const [createAcademicFaculty] = useCreateAcademicFacultyMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    try {
      const res = (await createAcademicFaculty({
        name: data?.name,
      })) as TResponse<any>;

      (res?.error &&
        toast.error(res?.error?.data?.message, {
          id: toastId,
          duration: 2000,
        })) ||
        toast.success(res?.data?.message, {
          id: toastId,
          duration: 2000,
        });
    } catch (error) {
      toast.error("Something went wrong in when you Create Academic Faculty!", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <UMForm
          onSubmit={onSubmit}
          // resolver={zodResolver(academicSemesterSchema)}
        >
          <UMInput type="text" label="Name" name="name" />

          <Button htmlType="submit">Submit</Button>
        </UMForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicFaculty;
