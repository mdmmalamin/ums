import { FieldValues, SubmitHandler } from "react-hook-form";
import PHForm from "../../../components/form/PHForm";
import { Button, Col, Flex } from "antd";
import UMSelect from "../../../components/form/UMSelect";

const nameOptions = [
  { value: "01", label: "Autumn" },
  { value: "02", label: "Summer" },
  { value: "03", label: "Fall" },
];

const currentYear = new Date().getFullYear();
const yearOptions = Array.from(Array(5).keys()).map((_) => ({
  value: String(_ + currentYear),
  label: String(_ + currentYear),
}));
console.log(yearOptions, currentYear);

const CreateAcademicSemester = () => {
  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    const name = nameOptions[+(data?.name - 1)]?.label;

    const semesterData = {
      name: name,
      code: data?.name,
      year: data?.year,
    };

    console.log(semesterData);
  };

  return (
    <Flex justify="center" align="center">
      <Col span={6}>
        <PHForm onSubmit={onSubmit}>
          <UMSelect label="Name" name="name" options={nameOptions} />
          <UMSelect label="Year" name="year" options={yearOptions} />
          <UMSelect
            label="Start Month"
            name="startMonth"
            options={yearOptions}
          />
          <UMSelect label="End Month" name="endMonth" options={yearOptions} />
          <Button htmlType="submit">Submit</Button>
        </PHForm>
      </Col>
    </Flex>
  );
};

export default CreateAcademicSemester;
