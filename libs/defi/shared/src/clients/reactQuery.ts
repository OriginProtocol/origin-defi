import { QueryClient, replaceEqualDeep } from '@tanstack/react-query';

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: { staleTime: 1000 * 60, structuralSharing: replaceEqualDeep },
  },
});
