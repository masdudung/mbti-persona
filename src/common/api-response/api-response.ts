export class ApiResponse<T> {
  message: string;
  statusCode: number;
  data: T;

  constructor(data: T, message: string = 'OK') {
    this.data = data;
    this.message = message;
  }
}
