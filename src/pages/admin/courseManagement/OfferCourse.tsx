import { Button, Col, Flex } from "antd";
import UMForm from "../../../components/form/UMForm";
import UMSelectWithWatch from "../../../components/form/UMSelectWithWatch";
import UMInput from "../../../components/form/UMInput";
import { useGetAllAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";
import { useState } from "react";
import { FieldValues, SubmitHandler } from "react-hook-form";

const OfferCourse = () => {
  const [facultyId, setFacultyId] = useState("");
  console.log(facultyId);

  const { data: academicFacultyData } =
    useGetAllAcademicFacultiesQuery(undefined);

  const academicSemesterOptions = academicFacultyData?.data?.map((item) => ({
    value: item._id,
    label: item.name,
  }));

  console.log(academicFacultyData);

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <UMForm onSubmit={onSubmit}>
          <UMSelectWithWatch
            label="Academic Semester"
            name="academicSemester"
            onValueChange={setFacultyId}
            options={academicSemesterOptions}
          />

          <UMInput disabled={!facultyId} type="text" name="test" label="Test" />

          <Button htmlType="submit">Submit</Button>
        </UMForm>
      </Col>
    </Flex>
  );
};

export default OfferCourse;
