import { FieldValues, SubmitHandler } from "react-hook-form";
import UMForm from "../../../components/form/UMForm";
import UMInput from "../../../components/form/UMInput";
import { Button, Col, Divider, Row } from "antd";
import UMSelect from "../../../components/form/UMSelect";
import { bloodOptions, genderOptions } from "../../../constants/global";
import UMDatePicker from "../../../components/form/UMDatePicker";
import UMFile from "../../../components/form/UMFile";
import { useAddAdminMutation } from "../../../redux/features/admin/userManagement.api";

//! This is only for development, should be remove
const facultyDefaultValue = {
  // password: "admin123",

  designation: "Admin",
  name: {
    firstName: "Mr. Mezbaul",
    middleName: "Abedin",
    lastName: "Forhan",
  },
  gender: "male",
  // dateOfBirth: "1998-04-24",
  email: "mezbaul2@ph.com",
  contactNo: "12356789",
  emergencyContactNo: "12356789",
  bloodGroup: "O+",
  presentAddress: "123 Main St, Cityville",
  permanentAddress: "456 Oak St, Townsville",
};

const CreateAdmin = () => {
  const [addAdmin, { data, error }] = useAddAdminMutation();
  console.log("addAdmin: ", { data, error });

  const onSubmit: SubmitHandler<FieldValues> = (data) => {
    console.log(data);

    const adminData = {
      password: data.contactNo,
      admin: data,
    };

    const formData = new FormData();
    formData.append("data", JSON.stringify(adminData));
    formData.append("file", data.image);

    addAdmin(formData);

    console.log(Object.fromEntries(formData)); //! This is form development, Just for checking
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
              <UMInput type="text" name="designation" label="Designation" />
            </Col>
          </Row>

          <Button htmlType="submit">Submit</Button>
        </UMForm>
      </Col>
    </Row>
  );
};

export default CreateAdmin;
