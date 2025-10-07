// src/hooks/useCharacter.ts
import { keepPreviousData, useQuery } from "@tanstack/react-query";
import { api } from "../api/client";
import type { Character } from "../api/types";

export function useCharacter(id?: string, enabled: boolean = true) {
  return useQuery({
    queryKey: ["character", id],
    enabled: !!id && enabled, 
    queryFn: async () => {
      const res = await api.get<Character>(`/character/${id}`);
      return res.data;
    },
    placeholderData: keepPreviousData,
  });
}
