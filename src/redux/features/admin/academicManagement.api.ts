import {
  TAcademicDepartment,
  TAcademicSemester,
  TQueryParams,
  TResponseRedux,
} from "../../../types";
import { baseApi } from "../../api/baseApi";

const academicManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllAcademicSemesters: builder.query({
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
      providesTags: ["academicSemester"],
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
      invalidatesTags: ["academicSemester"],
    }),

    getAllAcademicFaculties: builder.query({
      query: () => {
        // const params = new URLSearchParams();

        // if (args) {
        //   args.forEach((item: TQueryParams) =>
        //     params.append(item.name, item.value as string)
        //   );
        // }

        // console.log(args);

        return {
          url: "/academic-faculties",
          method: "GET",
          // params: params,
        };
      },
      providesTags: ["academicFaculty"],
      transformResponse: (res: TResponseRedux<TAcademicSemester[]>) => {
        console.log(res);
        return {
          data: res?.data,
          meta: res?.meta,
        };
      },
    }),

    createAcademicFaculty: builder.mutation({
      query: (data) => ({
        url: "/academic-faculties/create-academic-faculty",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["academicFaculty"],
    }),

    getAllAcademicDepartment: builder.query({
      query: () => {
        // const params = new URLSearchParams();

        // if (args) {
        //   args.forEach((item: TQueryParams) =>
        //     params.append(item.name, item.value as string)
        //   );
        // }

        // console.log(args);

        return {
          url: "/academic-departments",
          method: "GET",
          // params: params,
        };
      },
      providesTags: ["academicDepartment"],
      transformResponse: (res: TResponseRedux<TAcademicDepartment[]>) => {
        console.log(res);
        return {
          data: res?.data,
          meta: res?.meta,
        };
      },
    }),

    createAcademicDepartment: builder.mutation({
      query: (data) => ({
        url: "/academic-departments/create-academic-department",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["academicDepartment"],
    }),
  }),
});

export const {
  useGetAllAcademicSemestersQuery,
  useCreateAcademicSemesterMutation,

  useGetAllAcademicFacultiesQuery,
  useCreateAcademicFacultyMutation,

  useGetAllAcademicDepartmentQuery,
  useCreateAcademicDepartmentMutation,
} = academicManagementApi;
