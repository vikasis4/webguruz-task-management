import { ApiTags, baseApi } from "@/store/base.api";

const userApi = baseApi.injectEndpoints({
  endpoints: (builder) => ({
    fetchUsers: builder.query({
      query: () => "/users",
      providesTags: [ApiTags.users],
    }),
    updateUserStatus: builder.mutation({
      query: (body) => ({
        url: `/users/status`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [ApiTags.users],
    }),
  }),
  overrideExisting: false,
});

export default userApi;
