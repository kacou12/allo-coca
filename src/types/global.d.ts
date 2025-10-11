import type { HttpStatusCode } from "axios";

export {};

declare global {
  type SuccessResponse<T = any> = {
    data: T;
    message?: string;
    status?: boolean;
  };

  type ErrorResponse = {
    error: string;
    msg?: string;
    status?: true;
  };

  type PaginationResponse<T = any> = {
    items: Array<T>;
    total: number;
    hasMore: boolean;
  };
}
