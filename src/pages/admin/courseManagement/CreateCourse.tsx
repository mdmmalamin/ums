import { FieldValues, SubmitHandler } from "react-hook-form";
import UMForm from "../../../components/form/UMForm";
import { Button, Col, Flex } from "antd";
import UMSelect from "../../../components/form/UMSelect";
import { toast } from "sonner";
import UMInput from "../../../components/form/UMInput";
import {
  useCreateCourseMutation,
  useGetAllCourseQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { TResponse } from "../../../types";

const CreateCourse = () => {
  const [createCourse] = useCreateCourseMutation();
  const { data: courses } = useGetAllCourseQuery(undefined);

  const preRequisiteCoursesOptions = courses?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  console.log(preRequisiteCoursesOptions);

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const toastId = toast.loading("Creating...");

    const courseData = {
      ...data,
      code: +data?.code,
      credits: +data?.credits,
      isDeleted: false,
      preRequisiteCourses: data?.preRequisiteCourses?.map((item) => ({
        course: item,
        isDeleted: false,
      })),
    };

    console.log(courseData);

    try {
      const res = (await createCourse(courseData)) as TResponse<any>;

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
          <UMInput type="text" name="title" label="Title" />
          <UMInput type="text" name="prefix" label="Prefix" />
          <UMInput type="text" name="code" label="Code" />
          <UMInput type="text" name="credits" label="Credits" />

          <UMSelect
            mode="multiple"
            options={preRequisiteCoursesOptions}
            name="preRequisiteCourses"
            label="Pre-requisite Courses"
          />

          <Button htmlType="submit">Submit</Button>
        </UMForm>
      </Col>
    </Flex>
  );
};

export default CreateCourse;
