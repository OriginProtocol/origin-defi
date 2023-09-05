/* eslint-disable @typescript-eslint/no-unused-vars */
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'https://squid.subsquid.io/origin-squid/v/v4',
});

export const graphqlClient =
  <_, TVariables>(query: string, variables?: TVariables) =>
  async () => {
    const res = await axiosInstance({
      url: '/graphql',
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      data: { query, variables },
    });

    return res.data['errors']?.[0] || res.data['data'];
  };
