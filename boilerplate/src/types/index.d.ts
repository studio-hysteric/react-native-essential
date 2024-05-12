declare module '*.svg' {
  const content: any;
  export default content;
}

type TFunction = () => void;

type ApiResponse<T> = {
  data: T;
  code: string;
  message: string;
};

type ApiResponsePagination<T> = {
  page: number;
  per_page: number;
  total: number;
  total_pages: number;
  data: T[];
};
