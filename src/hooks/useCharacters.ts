import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { api } from "../api/client";
import type { CharactersResponse } from "../api/types";

export function useCharacters(page: number, name: string) {
  return useQuery({
    queryKey: ["characters", page, name],
    queryFn: async () => {
      const res = await api.get<CharactersResponse>("/character", {
        params: { page, name: name || undefined },
      });
      return res.data;
    },
    staleTime: 1000 * 60 * 2,
    gcTime: 1000 * 60 * 10,
    placeholderData: keepPreviousData,
  });
}
