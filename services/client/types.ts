type CoreResponse<T> = CoreResponseSuccess<T> | CoreResponseError;

interface CoreResponseSuccess<T> {
  success: true;
  data: T;
}

interface CoreResponseError {
  success: false;
  error: {
    code: string;
    message: string;
    reason?: string;
  };
}

interface CoreDeleteResponse {
  success: boolean;
}

export type {
  CoreResponse,
  CoreResponseError,
  CoreResponseSuccess,
  CoreDeleteResponse,
};
