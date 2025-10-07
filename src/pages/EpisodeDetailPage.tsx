import { Link, useParams } from 'react-router-dom'
import { useEpisode } from '../hooks/useEpisodes'

export default function EpisodeDetailPage() {
  const { id = '' } = useParams()
  const { data: e, isLoading, isError, error } = useEpisode(id)

  if (isLoading) return <div>Loading episode…</div>
  if (isError) return <div className="text-red-600">{(error as any)?.message || 'Failed to load episode.'}</div>
  if (!e) return <div>Episode not found.</div>

  return (
    <section className="space-y-4">
      <Link to={-1 as any} className="text-sm text-slate-500 hover:underline">← Back</Link>
      <h1 className="text-3xl font-bold">{e.episode} — {e.name}</h1>
      <p className="text-slate-600">Air date: {e.air_date}</p>

      <div className="mt-4">
        <h2 className="text-xl font-semibold mb-2">Appearing characters</h2>
        <ul className="list-disc list-inside text-slate-700">
          {e.characters.map((u) => {
            const id = u.split('/').pop()
            return (
              <li key={u}>
                <Link to={`/character/${id}`} className="text-blue-600 hover:underline">Character #{id}</Link>
              </li>
            )
          })}
        </ul>
      </div>
    </section>
  )
}
