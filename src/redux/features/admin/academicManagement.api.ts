import {
  TAcademicSemester,
  TQueryParams,
  TResponseRedux,
} from "../../../types";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesters: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) =>
            params.append(item.name, item.value as string)
          );
        }

        console.log(args);

        return {
          url: "/academic-semesters",
          method: "GET",
          params: params,
        };
      },
      transformResponse: (res: TResponseRedux<TAcademicSemester[]>) => {
        console.log(res);
        return {
          data: res?.data,
          meta: res?.meta,
        };
      },
    }),

    createAcademicSemester: builder.mutation({
      query: (data) => ({
        url: "/academic-semesters/create-academic-semester",
        method: "POST",
        body: data,
      }),
    }),
  }),
});

export const { useGetAllSemestersQuery, useCreateAcademicSemesterMutation } =
  academicManagementApi;
