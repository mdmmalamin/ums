import { useParams } from "react-router-dom";
import {
  useAddStudentMarkMutation,
  useGetAllFacultyCoursesQuery,
} from "../../redux/features/faculty/facultyCourses.api";
import { Button, Modal, Table } from "antd";
import { useState } from "react";
import UMForm from "../../components/form/UMForm";
import UMInput from "../../components/form/UMInput";

const MyStudents = () => {
  const { registerSemesterId, courseId } = useParams();
  const { data: facultyCoursesData } = useGetAllFacultyCoursesQuery([
    { name: "semesterRegistration", value: registerSemesterId },
    { name: "course", value: courseId },
  ]);

  const tableData = facultyCoursesData?.data?.map(
    ({ _id, student, semesterRegistration, offeredCourse }) => ({
      key: _id,
      name: student.fullName,
      id: student.id,
      semesterRegistration: semesterRegistration._id,
      student: student._id,
      offeredCourse: offeredCourse._id,
    })
  );

  const columns = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Id",
      key: "id",
      dataIndex: "id",
    },

    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Button>
            <AddMarksModal studentInfo={item} />
          </Button>
        );
      },
    },
  ];
  return (
    <div>
      <h1>data length: {facultyCoursesData?.data?.length}</h1>

      <Table
        columns={columns}
        dataSource={tableData}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </div>
  );
};

const AddMarksModal = ({ studentInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [addStudentMark] = useAddStudentMarkMutation();

  const handleSubmit = async (data) => {
    const studentMark = {
      semesterRegistration: studentInfo.semesterRegistration,
      offeredCourse: studentInfo.offeredCourse,
      student: studentInfo.student,
      courseMarks: {
        classTest1: +data.classTest1,
        midTerm: +data.midTerm,
        classTest2: +data.classTest2,
        finalTerm: +data.finalTerm,
      },
    };

    console.log(studentMark);

    const res = await addStudentMark(studentMark);
    console.log(res);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };

  return (
    <>
      <Button onClick={showModal}>Add Faculty</Button>
      <Modal
        title={`Add Faculty for ${facultyInfo?.title} course.`}
        open={isModalOpen}
        onCancel={() => setIsModalOpen(false)}
        footer={null}
      >
        <UMForm onSubmit={handleSubmit}>
          <UMInput type="text" name="classTest1" label="Class Test 1" />
          <UMInput type="text" name="classTest2" label="Class Test 2" />
          <UMInput type="text" name="midTerm" label="Mid Term" />
          <UMInput type="text" name="finalTerm" label="Final" />

          <Button htmlType="submit">Submit</Button>
        </UMForm>
      </Modal>
    </>
  );
};

export default MyStudents;
