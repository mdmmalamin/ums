import { TQueryParams, TResponseRedux } from "../../../types";
import { baseApi } from "../../api/baseApi";

const facultyCourseApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllFacultyCourses: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) =>
            params.append(item.name, item.value as string)
          );
        }

        return {
          url: "/enrolled-courses",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["offeredCourse"],
      transformResponse: (res: TResponseRedux<any>) => {
        console.log(res);
        return {
          data: res?.data,
          meta: res?.meta,
        };
      },
    }),

    addStudentMark: builder.mutation({
      query: (data) => ({
        url: "/enrolled-courses/update-enrolled-course-mark",
        method: "PATCH",
        body: data,
      }),
      invalidatesTags: ["offeredCourse"],
    }),
  }),
});

export const { useGetAllFacultyCoursesQuery, useAddStudentMarkMutation } =
  facultyCourseApi;
