import { Button, Col, Flex } from "antd";
import UMForm from "../../../components/form/UMForm";
import UMSelectWithWatch from "../../../components/form/UMSelectWithWatch";
import UMInput from "../../../components/form/UMInput";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";
import UMSelect from "../../../components/form/UMSelect";
import UMTimePicker from "../../../components/form/UMTimePicker";
import {
  useCreateOfferedCourseMutation,
  useGetAllCourseQuery,
  useGetAllSemesterRegistrationsQuery,
  useGetCourseFacultiesQuery,
} from "../../../redux/features/admin/courseManagement.api";
import {
  useGetAllAcademicDepartmentQuery,
  useGetAllAcademicFacultiesQuery,
} from "../../../redux/features/admin/academicManagement.api";
import { weekDaysOptions } from "../../../constants/global";
import { timeFormat } from "../../../utils/dateFormat";

const OfferCourse = () => {
  const [courseId, setCourseId] = useState("");

  const [addOfferedCourse] = useCreateOfferedCourseMutation();

  const { data: semesterRegistrationData } =
    useGetAllSemesterRegistrationsQuery([
      { name: "sort", value: "year" },
      { name: "status", value: "UPCOMING" },
    ]);

  const { data: academicFacultyData } =
    useGetAllAcademicFacultiesQuery(undefined);

  const { data: academicDepartmentData } =
    useGetAllAcademicDepartmentQuery(undefined);

  const { data: coursesData } = useGetAllCourseQuery(undefined);

  const { data: facultiesData, isFetching: fetchingFaculties } =
    useGetCourseFacultiesQuery(courseId, { skip: !courseId });

  const semesterRegistrationOptions = semesterRegistrationData?.data?.map(
    (item) => ({
      value: item._id,
      label: `${item.academicSemester.name} ${item.academicSemester.year}`,
    })
  );

  const academicFacultyOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  const academicDepartmentOptions = academicDepartmentData?.data?.map(
    (item) => ({
      value: item._id,
      label: item.name,
    })
  );

  const courseOptions = coursesData?.data?.map((item) => ({
    value: item._id,
    label: item.title,
  }));

  const facultiesOptions = facultiesData?.data?.faculties?.map((item) => ({
    value: item._id,
    label: item.fullName,
  }));

  const onSubmit: SubmitHandler<FieldValues> = async (data) => {
    const offeredCourseData = {
      ...data,
      maxCapacity: Number(data.maxCapacity),
      section: Number(data.section),
      startTime: timeFormat(data?.startTime),
      endTime: timeFormat(data?.endTime),
    };

    console.log(data)

    // const res = await addOfferedCourse(offeredCourseData);
    // console.log(res);

    console.log(offeredCourseData);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <UMForm onSubmit={onSubmit}>
          <UMSelect
            name="semesterRegistration"
            label="Semester Registrations"
            options={semesterRegistrationOptions}
          />

          <UMSelect
            name="academicFaculty"
            label="Academic Faculty"
            options={academicFacultyOptions}
          />

          <UMSelect
            name="academicDepartment"
            label="Academic Department"
            options={academicDepartmentOptions}
          />

          <UMSelectWithWatch
            onValueChange={setCourseId}
            options={courseOptions}
            name="course"
            label="Course"
          />

          <UMSelect
            disabled={!courseId || fetchingFaculties}
            name="faculty"
            label="Faculty"
            options={facultiesOptions}
          />

          <UMInput type="text" name="section" label="Section" />

          <UMInput type="text" name="maxCapacity" label="Max Capacity" />

          <UMSelect
            mode="multiple"
            options={weekDaysOptions}
            name="days"
            label="Days"
          />

          <UMTimePicker name="startTime" label="Start Time" />

          <UMTimePicker name="endTime" label="End Time" />

          <Button htmlType="submit">Submit</Button>
        </UMForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
