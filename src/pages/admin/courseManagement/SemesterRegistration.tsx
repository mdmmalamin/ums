import { FieldValues, SubmitHandler } from "react-hook-form";
import UMForm from "../../../components/form/UMForm";
import { Button, Col, Flex } from "antd";
import UMSelect from "../../../components/form/UMSelect";
import { semesterStatusOptions } from "../../../constants/semester";
import { toast } from "sonner";
import { useGetAllAcademicSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import UMDatePicker from "../../../components/form/UMDatePicker";
import UMInput from "../../../components/form/UMInput";
import { useCreateSemesterRegistrationMutation } from "../../../redux/features/admin/courseManagement.api";
import { TResponse } from "../../../types";

const SemesterRegistration = () => {
  const [createSemesterRegistration] = useCreateSemesterRegistrationMutation();

  const { data: academicSemester } = useGetAllAcademicSemestersQuery([
    { name: "sort", value: "year" },
  ]);

  const academicSemesterOptions = academicSemester?.data?.map((item) => ({
    value: item._id,
    label: `${item.name} ${item.year}`,
  }));

  console.log(academicSemesterOptions);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const academicSemesterData = {
      ...data,
      minCredit: +data?.minCredit,
      maxCredit: +data?.maxCredit,
    };

    console.log(academicSemesterData);

    try {
      const res = (await createSemesterRegistration(
        academicSemesterData
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
      toast.error(
        "Something went wrong in when you Create Semester Registration!",
        {
          id: toastId,
          duration: 2000,
        }
      );
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <UMForm
          onSubmit={onSubmit}
          // resolver={zodResolver(academicSemesterSchema)}
        >
          <UMSelect
            label="Academic Semester"
            name="academicSemester"
            options={academicSemesterOptions}
          />

          <UMSelect
            label="Status"
            name="status"
            options={semesterStatusOptions}
          />

          <UMDatePicker name="startDate" label="Start Date" />
          <UMDatePicker name="endDate" label="End Date" />
          <UMInput type="text" name="minCredit" label="Min Credit" />
          <UMInput type="text" name="maxCredit" label="Max Credit" />

          <Button htmlType="submit">Submit</Button>
        </UMForm>
      </Col>
    </Flex>
  );
};

export default SemesterRegistration;
