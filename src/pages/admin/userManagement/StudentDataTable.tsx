import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { TQueryParams, TStudent } from "../../../types";
import { useState } from "react";
import { useGetAllStudentsQuery } from "../../../redux/features/admin/userManagement.api";
import { FormOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export type TTableData = Pick<
  TStudent,
  "id" | "fullName" | "email" | "contactNo"
>;

const StudentDataTable = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState(1);
  const {
    data: studentsData,
    isFetching,
    isLoading,
  } = useGetAllStudentsQuery([
    // { name: "limit", value: 3 },
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);
  console.log(studentsData);
  const metaData = studentsData?.meta;

  const tableData = studentsData?.data?.map(
    ({ _id, fullName, id, email, contactNo }) => ({
      key: _id,
      fullName,
      id,
      email,
      contactNo,
    })
  );

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "fullName",
      dataIndex: "fullName",
    },

    {
      title: "Student ID",
      key: "id",
      dataIndex: "id",
    },

    {
      title: "Email",
      key: "email",
      dataIndex: "email",
    },

    {
      title: "Contact No.",
      key: "contactNo",
      dataIndex: "contactNo",
    },

    {
      title: "Action",
      key: "x",
      render: (item) => {
        console.log(item);
        return (
          <Space>
            <Link to={`/admin/students-data/${item?.key}`}>
              <Button>Details</Button>
            </Link>
            <Button>
              <FormOutlined />
            </Button>
            <Button>Block</Button>
          </Space>
        );
      },
      width: "1%",
    },
  ];

  const onChange: TableProps<TTableData>["onChange"] = (
    _pagination,
    filters,
    _sorter,
    extra
  ) => {
    console.log("params", filters);
    if (extra.action === "filter") {
      const queryParams: TQueryParams[] = [];

      filters.name?.forEach((item) =>
        queryParams.push({ name: "name", value: item })
      );

      filters.year?.forEach((item) =>
        queryParams.push({ name: "year", value: item })
      );

      filters.startMonth?.forEach((item) =>
        queryParams.push({ name: "startMonth", value: item })
      );

      filters.endMonth?.forEach((item) =>
        queryParams.push({ name: "endMonth", value: item })
      );

      setParams(queryParams);
    }
  };

  return (
    <div>
      <h1>data length: {studentsData?.data?.length}</h1>

      <Table
        loading={isFetching || isLoading}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        pagination={false}
      />
      <Pagination
        total={metaData?.total}
        pageSize={metaData?.limit}
        current={page}
        onChange={(value) => setPage(value)}
      />
    </div>
  );
};

export default StudentDataTable;
