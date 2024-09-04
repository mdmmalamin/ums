import { Button, Modal, Table, TableColumnsType } from "antd";
import {
  useAddFacultiesForCourseMutation,
  useGetAllCourseQuery,
} from "../../../redux/features/admin/courseManagement.api";
import { useState } from "react";
import { TCourse } from "../../../types";
import UMForm from "../../../components/form/UMForm";
import UMSelect from "../../../components/form/UMSelect";
import { useGetAllFacultiesQuery } from "../../../redux/features/admin/userManagement.api";

export type TTableData = Pick<
  TCourse,
  "_id" | "title" | "prefix" | "code" | "preRequisiteCourses" | "credits"
>;

const Courses = () => {
  const {
    data: coursesData,
    isLoading,
    isFetching,
  } = useGetAllCourseQuery(undefined);

  const tableData = coursesData?.data?.map(
    ({ _id, title, prefix, code, credits, preRequisiteCourses }) => ({
      key: _id,
      title,
      prefix,
      code,
      credits,
      preRequisiteCourses,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Title",
      key: "title",
      dataIndex: "title",
    },
    {
      title: "Prefix",
      key: "prefix",
      dataIndex: "prefix",
    },

    {
      title: "Code",
      key: "code",
      dataIndex: "code",
    },

    {
      title: "Credits",
      key: "credits",
      dataIndex: "credits",
    },

    {
      title: "Action",
      key: "x",
      render: (items) => {
        return <AddFacultyModal facultyInfo={items} />;
      },
    },
  ];

  return (
    <div>
      <h1>Courses Length: {coursesData?.data?.length}</h1>

      <Table
        // loading={<Spin spinning />}
        loading={isFetching || isLoading}
        columns={columns}
        dataSource={tableData}
      />
    </div>
  );
};

const AddFacultyModal = ({ facultyInfo }) => {
  const [isModalOpen, setIsModalOpen] = useState(false);
  const { data: faculties } = useGetAllFacultiesQuery(undefined);
  const [addFacultiesForCourse] = useAddFacultiesForCourseMutation(undefined);

  const facultiesOptions = faculties?.data?.map((item) => ({
    value: item._id,
    label: `${item.fullName}`,
  }));

  const handleSubmit = async (data) => {
    const facultyData = {
      courseId: facultyInfo.key,
      data,
    };

    console.log(facultyData);

    await addFacultiesForCourse(facultyData);
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
          <UMSelect
            mode="multiple"
            name="faculties"
            options={facultiesOptions}
            label="Faculties"
          />

          <Button htmlType="submit">Submit</Button>
        </UMForm>
      </Modal>
    </>
  );
};

export default Courses;
