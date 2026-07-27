export type ApiError = {
  error: {
    code: string;
    message: string;
  };
};

export type ApiValidationError = {
  error: {
    details?: Record<string, string>;
  };
};
