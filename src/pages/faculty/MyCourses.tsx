import { FieldValues, SubmitHandler } from "react-hook-form";
import UMForm from "../../components/form/UMForm";
import { useGetAllFacultyCoursesQuery } from "../../redux/features/faculty/facultyCourses.api";
import UMSelect from "../../components/form/UMSelect";
import { Col, Flex } from "antd";
import { useNavigate } from "react-router-dom";

const MyCourses = () => {
  const { data: facultyCoursesData } = useGetAllFacultyCoursesQuery(undefined);

  const navigate = useNavigate();

  const semesterOptions = facultyCoursesData?.data?.map((item) => ({
    lable: `${item.academicSemester.name} ${item.academicSemester.year}`,
    value: item.semesterRegistration._id,
  }));

  const courseOptions = facultyCoursesData?.data?.map((item) => ({
    lable: item.course.title,
    value: item.course._id,
  }));

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    navigate(`/faculty/courses/${data.semesterRegistration}/${data.course}`);
  };
  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <UMForm onSubmit={onSubmit}>
          <UMSelect
            options={semesterOptions}
            name="semesterRegistration"
            label="Semester"
          />

          <UMSelect options={courseOptions} name="course" label="Course" />
        </UMForm>
      </Col>
    </Flex>
  );
};

export default MyCourses;
