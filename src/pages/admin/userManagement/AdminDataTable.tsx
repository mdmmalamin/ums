import {
  Button,
  Pagination,
  Space,
  Table,
  TableColumnsType,
  TableProps,
} from "antd";
import { TAdmin, TQueryParams } from "../../../types";
import { useState } from "react";
import { useGetAllAdminsQuery } from "../../../redux/features/admin/userManagement.api";
import { FormOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

export type TTableData = Pick<
  TAdmin,
  "id" | "fullName" | "email" | "contactNo" | "designation"
>;

const AdminDataTable = () => {
  const [params, setParams] = useState<TQueryParams[]>([]);
  const [page, setPage] = useState(1);
  const {
    data: adminsData,
    isFetching,
    isLoading,
  } = useGetAllAdminsQuery([
    // { name: "limit", value: 3 },
    { name: "page", value: page },
    { name: "sort", value: "id" },
    ...params,
  ]);
  console.log(adminsData);
  const metaData = adminsData?.meta;

  const tableData = adminsData?.data?.map(
    ({ _id, fullName, id, designation, email, contactNo }) => ({
      key: _id,
      fullName,
      id,
      designation,
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
      title: "Admin ID",
      key: "id",
      dataIndex: "id",
    },

    {
      title: "Designation",
      key: "designation",
      dataIndex: "designation",
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
            <Link to={`/admin/admins-data/${item?.key}`}>
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
      <h1>data length: {adminsData?.data?.length}</h1>

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

export default AdminDataTable;
