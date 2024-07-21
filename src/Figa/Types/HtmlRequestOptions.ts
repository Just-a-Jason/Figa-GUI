export interface HtmlRequestOptions<T> {
  request: RequestInit;
  onSucess?: (data: T) => void;
  onFail?: () => void;
}

export interface HtmlRequest {
  abort: () => void;
  statusCode: number;
}
