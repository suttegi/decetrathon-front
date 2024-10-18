export interface Pagination {
    total: number;
    page: number;
    limit: number;
  }
  
  export interface ResultResponse<T> {
    status: boolean;
    result: T;
  }
  
  export interface ResultsResponse<T> {
    status: boolean;
    results: T[];
    pagination: Pagination;
  }
  
  export interface PlayerCreate {
    telegram_id: number;
    first_name: string;
    last_name?: string;
    username?: string;
    language_code?: string;
  }
  
  export interface PlayerSchema extends PlayerCreate {
    id: number;
    created_at: string;
    updated_at: string;
  }