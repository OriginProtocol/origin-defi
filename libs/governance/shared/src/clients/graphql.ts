import axios from 'axios';
import { pathOr } from 'ramda';

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
    const res = await axiosInstance<TData, TVariables>({
      url: '/graphql',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
      data: { query, variables },
    });

    return pathOr<TData>({} as TData, ['data', 'data'], res);
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

    return pathOr<TData>({} as TData, ['data', 'data'], res);
  };
