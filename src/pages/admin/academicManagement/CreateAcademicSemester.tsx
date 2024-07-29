import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import UMSelect from "../../../components/form/UMSelect";
import { semesterOptions } from "../../../constants/semester";
import { monthOptions } from "../../../constants/global";
import { zodResolver } from "@hookform/resolvers/zod";
import { academicSemesterSchema } from "../../../schemas/academicManagement.schema";
import { useCreateAcademicSemesterMutation } from "../../../redux/features/admin/academicManagement.api";
import { toast } from "sonner";
import { TResponse } from "../../../types/global.type";
import { yearOptions } from "../../../utils/yearOptions";

// const currentYear = new Date().getFullYear();
// const yearOptions = Array.from(Array(5).keys()).map((_) => ({
//   value: String(_ + currentYear),
//   label: String(_ + currentYear),
// }));
// // console.log(yearOptions, currentYear);

const CreateAcademicSemester = () => {
  const [CreateAcademicSemester] = useCreateAcademicSemesterMutation();

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const name = semesterOptions[+(data?.name - 1)]?.label;

    const semesterData = {
      name: name,
      code: data?.name,
      year: data?.year,
      startMonth: data?.startMonth,
      endMonth: data?.endMonth,
    };

    try {
      const res = (await CreateAcademicSemester(
        semesterData
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
      toast.error("Something went wrong in when you Create Semester!", {
        id: toastId,
        duration: 2000,
      });
    }
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm
          onSubmit={onSubmit}
          resolver={zodResolver(academicSemesterSchema)}
        >
          <UMSelect label="Name" name="name" options={semesterOptions} />
          <UMSelect label="Year" name="year" options={yearOptions} />
          <UMSelect
            label="Start Month"
            name="startMonth"
            options={monthOptions}
          />
          <UMSelect label="End Month" name="endMonth" options={monthOptions} />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
