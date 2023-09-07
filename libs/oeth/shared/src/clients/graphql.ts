/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SUBSQUID_URL,
});

export const graphqlClient =
  <TData, TVariables>(query: string, variables?: TVariables) =>
  async () => {
    const res = await axiosInstance<TData>({
      url: '/graphql',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { query, variables },
    });

    return res.data['data'];
  };
