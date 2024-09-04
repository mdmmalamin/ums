import {
  Button,
  Dropdown,
  MenuProps,
  Table,
  TableColumnsType,
  Tag,
} from "antd";
import { TSemester } from "../../../types";

import { FormOutlined } from "@ant-design/icons";
import {
  useGetAllSemesterRegistrationsQuery,
  useUpdateSemesterRegistrationMutation,
} from "../../../redux/features/admin/courseManagement.api";
import dateFormat from "../../../utils/dateFormat";
import { useState } from "react";

export type TTableData = Pick<
  TSemester,
  "_id" | "academicSemester" | "status" | "startDate" | "endDate"
>;

const items: MenuProps["items"] = [
  { label: "Upcoming", key: "UPCOMING" },
  { label: "Ongoing", key: "ONGOING" },
  { label: "Ended", key: "ENDED" },
];

const RegisteredSemesters = () => {
  const [semesterId, setSemesterId] = useState("");

  const {
    data: semesterData,
    isLoading,
    isFetching,
  } = useGetAllSemesterRegistrationsQuery([{ name: "sort", value: "status" }]);

  const [updateSemesterStatus] = useUpdateSemesterRegistrationMutation();

  const tableData = semesterData?.data?.map(
    ({ _id, academicSemester, status, startDate, endDate }) => ({
      key: _id,
      name: `${academicSemester?.name} ${academicSemester?.year}`,
      status,
      startDate: dateFormat(startDate),
      endDate: dateFormat(endDate),
    })
  );

  const handleStatusUpdate: MenuProps["onClick"] = async (data) => {
    console.log(data?.key);
    console.log(semesterId);

    const updateDate = {
      id: semesterId,
      data: {
        status: data?.key,
      },
    };

    await updateSemesterStatus(updateDate);
  };

  const menuProps = {
    items,
    onClick: handleStatusUpdate,
  };

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
    },
    {
      title: "Status",
      key: "status",
      dataIndex: "status",
      render: (item) => {
        let color;
        item === "UPCOMING" && (color = "blue");
        item === "ONGOING" && (color = "green");
        item === "ENDED" && (color = "red");

        return <Tag color={color}>{item}</Tag>;
      },
    },
    {
      title: "Start Date",
      key: "startDate",
      dataIndex: "startDate",
    },
    {
      title: "End Date",
      key: "endDate",
      dataIndex: "endDate",
    },
    {
      title: "Action",
      key: "x",
      render: (item) => {
        return (
          <Dropdown menu={menuProps} trigger={["click"]}>
            <Button onClick={() => setSemesterId(item?.key)}>
              <FormOutlined />
            </Button>
          </Dropdown>
        );
      },
    },
  ];

  return (
    <div>
      <h1>Registered Semesters Length: {semesterData?.data?.length}</h1>

      <Table
        // loading={<Spin spinning />}
        loading={isFetching || isLoading}
        columns={columns}
        dataSource={tableData}
      />
    </div>
  );
};

export default RegisteredSemesters;
