import { Button, Table, TableColumnsType } from "antd";
import { useGetAllAcademicDepartmentQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicDepartment } from "../../../types";
import { FormOutlined } from "@ant-design/icons";

export type TTableData = Pick<
  TAcademicDepartment,
  "_id" | "name" | "academicFaculty"
>;

const AcademicDepartment = () => {
  const {
    data: departmentData,
    isFetching,
    isLoading,
  } = useGetAllAcademicDepartmentQuery(undefined);

  const tableData = departmentData?.data?.map(
    ({ _id, name, academicFaculty }) => ({
      key: _id,
      name,
      academicFaculty: academicFaculty?.name,
    })
  );
  console.log(tableData);

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Academic Faculty",
      key: "academicFaculty",
      dataIndex: "academicFaculty",
    },

    {
      title: "Action",
      key: "x",
      render: () => {
        return (
          <Button>
            <FormOutlined />
          </Button>
        );
      },
    },
  ];

  return (
    <div>
      <h1>data length: {departmentData?.data?.length}</h1>

      <Table
        // loading={<Spin spinning />}
        loading={isFetching || isLoading}
        columns={columns}
        dataSource={tableData}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </div>
  );
};

export default AcademicDepartment;
