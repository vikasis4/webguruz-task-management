import { ITask } from "./modules/task";
import IRespType from "./utils/payloadType";

interface ITaskDto {
  update: {
    resp: IRespType<{}>;
    req: {
      taskIds: string[];
      status: string;
    };
  };

  fetch: {
    resp: IRespType<{
      tasks: ITask[];
      totalPages: number;
      page: number;
      limit: number;
      totalTasks: number;
    }>;
    req: {
      page: number;
      limit: number;
    };
  };
}

export default ITaskDto;
