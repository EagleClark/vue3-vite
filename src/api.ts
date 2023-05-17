import { useGet } from './util/api';

interface User {
  name: string;
  age: number;
  email: string;
}

interface ApiRes<T> {
  code: number;
  data: T;
  description: string;
}

export const getUser = () => {
  const { isFetching, execute, data } = useGet<ApiRes<User>>('/api/user', { immediate: false });

  // compute 中可以做更多数据处理，也可以解决响应式丢失的问题
  return {
    isFetching,
    data: computed(() => data.value?.data ?? { name: '--', age: -1, email: '--' }),
    execute,
  };
};
