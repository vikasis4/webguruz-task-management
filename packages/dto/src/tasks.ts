import IRespType from "./utils/payloadType";

interface ITaskDto {
  update: {
    resp: IRespType<{}>;
    req: {
      taskIds: string[];
      status: string;
    };
  };
}

export default ITaskDto;
