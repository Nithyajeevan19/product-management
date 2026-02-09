export interface IPaginatedResponse<T> {
  data: T[];
  pagination: {
    nextCursor: string | null;
    hasMore: boolean;
  };
}

export interface ICursorPaginationRequest {
  cursor?: string;
  limit?: number;
  category?: string;
  search?: string;
}