import { MockMethod } from 'vite-plugin-mock';

export default [
  {
    url: '/api/one',
    method: 'get',
    timeout: 2000,
    response: () => ({
      code: 200,
      data: {
        one: 1,
      },
      description: 'test',
    }),
  },
] as MockMethod[];
