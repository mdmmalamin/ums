import { List, Typography } from "antd";
import { useGetAllAcademicFacultiesQuery } from "../../../redux/features/admin/academicManagement.api";

const AcademicFaculty = () => {
  const {
    data: academicFacultyData,
    isFetching,
    isLoading,
  } = useGetAllAcademicFacultiesQuery(undefined);

  console.log(academicFacultyData?.data);

  const listData = academicFacultyData?.data?.map((item) => item?.name);

  return (
    <div>
      <h1>Academic Faculty Length: {listData?.length}</h1>

      <List
        loading={isFetching || isLoading}
        header={<div>Name</div>}
        bordered
        dataSource={listData}
        renderItem={(item, idx) => (
          <List.Item>
            <Typography.Title level={4}>
              {idx + 1}. {item}
            </Typography.Title>
          </List.Item>
        )}
      />
    </div>
  );
};

export default AcademicFaculty;
