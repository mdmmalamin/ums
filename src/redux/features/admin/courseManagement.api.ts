import { TQueryParams, TResponseRedux, TSemester } from "../../../types";
import { baseApi } from "../../api/baseApi";

const courseManagementApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    getAllSemesterRegistrations: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) =>
            params.append(item.name, item.value as string)
          );
        }

        console.log(args);

        return {
          url: "/semester-registrations",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["semester"],
      transformResponse: (res: TResponseRedux<TSemester[]>) => {
        console.log(res);
        return {
          data: res?.data,
          meta: res?.meta,
        };
      },
    }),

    createSemesterRegistration: builder.mutation({
      query: (data) => ({
        url: "/semester-registrations/create-semester-registration",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["semester"],
    }),

    updateSemesterRegistration: builder.mutation({
      query: (args) => ({
        url: `/semester-registrations/${args.id}`,
        method: "PATCH",
        body: args.data,
      }),
      invalidatesTags: ["semester"],
    }),

    getAllCourse: builder.query({
      query: (args) => {
        const params = new URLSearchParams();

        if (args) {
          args.forEach((item: TQueryParams) =>
            params.append(item.name, item.value as string)
          );
        }

        console.log(args);

        return {
          url: "/courses",
          method: "GET",
          params: params,
        };
      },
      providesTags: ["courses"],
      transformResponse: (res: TResponseRedux<any>) => {
        console.log(res);
        return {
          data: res?.data,
          meta: res?.meta,
        };
      },
    }),

    createCourse: builder.mutation({
      query: (data) => ({
        url: "/courses/create-course",
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["courses"],
    }),

    addFacultiesForCourse: builder.mutation({
      query: (args) => ({
        url: `/courses/${args.courseId}/assign-faculties`,
        method: "PUT",
        body: args.data,
      }),
      invalidatesTags: ["courses"],
    }),

    getCourseFaculties: builder.query({
      query: (id) => {
        return {
          url: `/courses/${id}/get-faculties`,
          method: "GET",
        };
      },
      transformResponse: (response: TResponseRedux<any>) => {
        return {
          data: response.data,
          meta: response.meta,
        };
      },
    }),

    createOfferedCourse: builder.mutation({
      query: (data) => ({
        url: `offered-courses/create-offered-course`,
        method: "POST",
        body: data,
      }),
      invalidatesTags: ["courses"],
    }),
  }),
});

export const {
  useGetAllSemesterRegistrationsQuery,
  useCreateSemesterRegistrationMutation,
  useUpdateSemesterRegistrationMutation,

  useGetAllCourseQuery,
  useCreateCourseMutation,

  useAddFacultiesForCourseMutation,
  useGetCourseFacultiesQuery,

  useCreateOfferedCourseMutation,
} = courseManagementApi;
