import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_SUBSQUID_URL,
});

export const graphqlClient =
  <TData, TVariables>(
    query: string,
    variables?: TVariables,
    options?: RequestInit['headers'],
  ) =>
  async () => {
    const res = await axiosInstance<TData>({
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      ...options,
      data: { query, variables },
    });

    return res.data['data'];
  };
