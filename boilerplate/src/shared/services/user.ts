import { instance } from '@/libs/api';
import { User } from '@/types/models/user';

export const getUsers = (): Promise<ApiResponsePagination<User>> => {
  return instance.get('users', { searchParams: { delay: 2 } }).json();
};
