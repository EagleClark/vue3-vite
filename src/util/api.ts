import { MaybeRefOrGetter, UseFetchOptions, UseFetchReturn, createFetch } from '@vueuse/core';

const fetchInstance = createFetch({
  baseUrl: '.',
  options: {
    timeout: 30 * 1000,
    // 请求之前，注入 token、修改 headers 等
    beforeFetch({ options }) {
      return { options };
    },
    // 请求成功之后的处理逻辑
    afterFetch({ data, response }) {
      return { data, response };
    },
    // 请求失败之后的处理逻辑
    onFetchError({ data, error }) {
      return { data, error };
    },
  },
  fetchOptions: {
    mode: 'cors',
    credentials: 'same-origin',
  },
});

const FETCH_OPTIONS_KEY = [
  'fetch',
  'immediate',
  'refetch',
  'initialData',
  'timeout',
  'beforeFetch',
  'afterFetch',
  'onFetchError',
];

const isFetchOptions = (options: RequestInit | UseFetchOptions): options is UseFetchOptions => {
  for (const [key] of Object.entries(options)) {
    if (!FETCH_OPTIONS_KEY.includes(key)) {
      return false;
    }
  }

  return true;
};

type Method = 'get' | 'post' | 'put' | 'delete' | 'patch' | 'head' | 'options';

const createMyFetch = (method: Method) => {
  function useFetch<T>(
    url: MaybeRefOrGetter<string>,
  ): UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>>;
  function useFetch<T>(
    url: MaybeRefOrGetter<string>,
    useFetchOptions: UseFetchOptions,
  ): UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>>;
  function useFetch<T>(
    url: MaybeRefOrGetter<string>,
    options: RequestInit,
    useFetchOptions?: UseFetchOptions,
  ): UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>>;
  function useFetch<T>(
    url: MaybeRefOrGetter<string>,
    options?: RequestInit | UseFetchOptions,
    useFetchOptions?: UseFetchOptions,
  ): UseFetchReturn<T> & PromiseLike<UseFetchReturn<T>> {
    if (!options) {
      return fetchInstance<T>(url).json()[method]();
    }
    if (isFetchOptions(options)) {
      return fetchInstance<T>(url, options).json()[method]();
    } else {
      return fetchInstance<T>(url, options, useFetchOptions).json()[method]();
    }
  }

  return useFetch;
};

const useGet = (() => createMyFetch('get'))();

const usePost = (() => createMyFetch('post'))();

const usePut = (() => createMyFetch('put'))();

const useDelete = (() => createMyFetch('delete'))();

const usePatch = (() => createMyFetch('patch'))();

const useHead = (() => createMyFetch('patch'))();

const useOptions = (() => createMyFetch('patch'))();

export { useGet, usePost, useDelete, usePut, usePatch, useHead, useOptions };
