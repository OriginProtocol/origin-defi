import axios from 'axios';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SUBSQUID_URL,
});

const snapshotAxiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SNAPSHOT_URL,
});

export const graphqlClient =
  <TData, TVariables>(
    query: string,
    variables?: TVariables,
    options?: RequestInit['headers'],
  ) =>
  async () => {
    const res = await axiosInstance<TData>({
      url: '/graphql',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
      data: { query, variables },
    });

    return res.data['data'] as TData;
  };

export const snapshotGraphqlClient =
  <TData, TVariables>(
    query: string,
    variables?: TVariables,
    options?: RequestInit['headers'],
  ) =>
  async () => {
    const res = await snapshotAxiosInstance<TData>({
      url: '/graphql',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
      data: { query, variables },
    });

    return res.data['data'] as TData;
  };
