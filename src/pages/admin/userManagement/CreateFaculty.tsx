import { FieldValues, SubmitHandler } from "react-hook-form";
import UMForm from "../../../components/form/UMForm";
import UMInput from "../../../components/form/UMInput";
import { Button, Col, Divider, Row } from "antd";
import UMSelect from "../../../components/form/UMSelect";
import { bloodOptions, genderOptions } from "../../../constants/global";
import UMDatePicker from "../../../components/form/UMDatePicker";
import UMFile from "../../../components/form/UMFile";
import { useAddFacultyMutation } from "../../../redux/features/admin/userManagement.api";

//! This is only for development, should be remove
const facultyDefaultValue = {
  // password: "faculty123",

  name: {
    firstName: "Mridul",
    middleName: "Das",
    lastName: "Rahman",
  },
  gender: "male",
  // dateOfBirth: "1990-01-01",
  bloodGroup: "A+",

  email: "faculty3@gmail.com",
  contactNo: "123",
  emergencyContactNo: "123",
  presentAddress: "123 Main St, Cityville",
  permanentAddress: "456 Oak St, Townsville",

  academicDepartment: "65b00fb010b74fcbd7a25d8e",
  designation: "Lecturer",
};

const CreateFaculty = () => {
  const [addFaculty, { data, error }] = useAddFacultyMutation();
  console.log("addFaculty: ", { data, error });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);

    const facultyData = {
      password: data.contactNo,
      faculty: data,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(facultyData));
    formData.append("file", data.image);

    addFaculty(formData);

    // console.log(Object.fromEntries(formData)); //! This is form development, Just for checking
  };

  return (
    <Row>
      <Col span={24}>
        <UMForm onSubmit={onSubmit} defaultValues={facultyDefaultValue}>
          <Divider>Personal Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMInput type="text" name="name.firstName" label="First Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMInput type="text" name="name.middleName" label="Middle Name" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMInput type="text" name="name.lastName" label="Last Name" />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMSelect name="gender" options={genderOptions} label="Gender" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMDatePicker name="dateOfBirth" label="Date of Birth" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMSelect
                name="bloodGroup"
                options={bloodOptions}
                label="Blood Group"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMFile name="image" label="Picture" />
            </Col>
          </Row>

          <Divider>Contact Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMInput type="text" name="email" label="Email" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMInput type="tel" name="contactNo" label="Contact No" />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMInput
                type="tel"
                name="emergencyContactNo"
                label="Emergency ContactNo"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMInput
                type="text"
                name="presentAddress"
                label="Present Address"
              />
            </Col>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMInput
                type="text"
                name="permanentAddress"
                label="Permanent Address"
              />
            </Col>
          </Row>

          <Divider>Academic Info.</Divider>
          <Row gutter={8}>
            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMSelect
                name="academicDepartment"
                // disabled={sIsLoading}
                options={[{ value: "test", label: "test" }]}
                label="Academic Department"
              />
            </Col>

            <Col span={24} md={{ span: 12 }} lg={{ span: 8 }}>
              <UMInput type="text" name="designation" label="Designation" />
            </Col>
          </Row>

          <Button htmlType="submit">Submit</Button>
        </UMForm>
      </Col>
    </Row>
  );
};

export default CreateFaculty;
