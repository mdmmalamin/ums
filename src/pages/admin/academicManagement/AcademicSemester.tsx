import { Button, Table, TableColumnsType, TableProps } from "antd";
import { useGetAllAcademicSemestersQuery } from "../../../redux/features/admin/academicManagement.api";
import { TAcademicSemester, TQueryParams } from "../../../types";
import { useState } from "react";
import { yearOptions } from "../../../utils/yearOptions";
import { monthOptions } from "../../../constants/global";
import { FormOutlined } from "@ant-design/icons";

export type TTableData = Pick<
  TAcademicSemester,
  "_id" | "name" | "year" | "startMonth" | "endMonth"
>;

const AcademicSemester = () => {
  const [params, setParams] = useState<TQueryParams[] | undefined>(undefined);
  const {
    data: semesterData,
    isFetching,
    isLoading,
  } = useGetAllAcademicSemestersQuery(params);

  const tableData = semesterData?.data?.map(
    ({ _id, name, year, startMonth, endMonth }) => ({
      key: _id,
      name,
      year,
      startMonth,
      endMonth,
    })
  );

  const yearQueryFilters = yearOptions.map((item) => ({
    text: item.label,
    value: item.value,
  }));

  const monthQueryFilters = monthOptions.map((item) => ({
    text: item.label,
    value: item.value,
  }));

  const columns: TableColumnsType<TTableData> = [
    {
      title: "Name",
      key: "name",
      dataIndex: "name",
      filters: [
        {
          text: "Autumn",
          value: "Autumn",
        },
        {
          text: "Summer",
          value: "Summer",
        },
        {
          text: "Fall",
          value: "Fall",
        },
      ],
    },
    {
      title: "Year",
      key: "year",
      dataIndex: "year",
      filters: yearQueryFilters,
    },
    {
      title: "Start Month",
      key: "startMonth",
      dataIndex: "startMonth",
      filters: monthQueryFilters,
    },
    {
      title: "End Month",
      key: "endMonth",
      dataIndex: "endMonth",
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
      <h1>data length: {semesterData?.data?.length}</h1>

      <Table
        // loading={<Spin spinning />}
        loading={isFetching || isLoading}
        columns={columns}
        dataSource={tableData}
        onChange={onChange}
        showSorterTooltip={{ target: "sorter-icon" }}
      />
    </div>
  );
};

export default AcademicSemester;
