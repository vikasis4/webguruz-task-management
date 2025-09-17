interface IRespType<T> {
  error: string;
  status: number;
  message: string;
  data: T;
}

export default IRespType;
