import { ApiTags, baseApi } from "@/store/base.api";
import ITaskDto from "@repo/dto/tasks";

const parseQuery = (query: { [key: string]: string | number }) => {
  return Object.keys(query)
    .map((key) => `${key}=${query[key]}`)
    .join("&");
};

const taskApi = baseApi.injectEndpoints({
  endpoints: (build) => ({
    fetchTasks: build.query({
      query: (query) => ({
        url: `/tasks?${parseQuery(query)}`,
        method: "GET",
      }),
      providesTags: [ApiTags.tasks],
    }),
    updateTasksStatus: build.mutation<
      ITaskDto["update"]["resp"],
      ITaskDto["update"]["req"]
    >({
      query: (body) => ({
        url: `/tasks/status`,
        method: "PUT",
        body,
      }),
      invalidatesTags: [ApiTags.tasks],
    }),
  }),
});

export default taskApi;
