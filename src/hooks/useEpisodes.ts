import { useQuery } from '@tanstack/react-query'
import { api } from '../api/client'
import type { Episode } from '../api/types'

export function useEpisodesByIds(ids: number[]) {
  const key = ids.join(',')
  return useQuery({
    enabled: ids.length > 0,
    queryKey: ['episodes', key],
    queryFn: async () => {
      const res = await api.get<Episode | Episode[]>(`/episode/${key}`)
      const data = Array.isArray(res.data) ? res.data : [res.data]
      return data.sort((a, b) => a.id - b.id)
    },
  })
}

export function useEpisode(id: string) {
  return useQuery({
    queryKey: ['episode', id],
    queryFn: async () => {
      const res = await api.get<Episode>(`/episode/${id}`)
      return res.data
    },
  })
}
