import { FieldValues, SubmitHandler } from "react-hook-form";
import UMForm from "../../../components/form/UMForm";
import { Button, Col, Flex } from "antd";
import {
  useCreateAcademicDepartmentMutation,
  useGetAllAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global.type";
import UMInput from "../../../components/form/UMInput";
import UMSelect from "../../../components/form/UMSelect";

const CreateAcademicDepartment = () => {
  const [createAcademicDepartment] = useCreateAcademicDepartmentMutation();
  const {
    data: academicFacultyData,
    isFetching,
    isLoading,
  } = useGetAllAcademicFacultiesQuery(undefined);

  const academicFacultiesOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const departmentData = {
      name: data?.name,
      academicFaculty: data?.academicFaculty,
    };

    try {
      const res = (await createAcademicDepartment(
        departmentData
      )) as TResponse<any>;

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

          <UMSelect
            name="academicFaculty"
            label="Academic Faculty"
            options={academicFacultiesOptions}
            disabled={isFetching || isLoading}
          />

          <Button htmlType="submit">Submit</Button>
        </UMForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicDepartment;
