import { Link } from "react-router-dom";
import { useEpisodesByIds } from "../hooks/useEpisodes";
import { useCharacter } from "../hooks/useCharacter";

function extractEpisodeIds(links: string[]): number[] {
  return links.map((u) => Number(u.split("/").pop())).filter(Boolean);
}

export default function CharacterDetailPage({ id }: { id?: number | null }) {
  const idStr = id ? String(id) : undefined;
  const {
    data: character,
    isPending,
    isLoading,
    isError,
    error,
  } = useCharacter(idStr, !!id);

  const epIds = character ? extractEpisodeIds(character.episode) : [];
  const { data: episodes, isLoading: epLoading } = useEpisodesByIds(epIds);

  if (!id) {
    return (
      <div className="h-full grid place-items-center text-slate-500 border rounded-xl bg-white">
        Select a character to see details
      </div>
    );
  }

  if (isPending || isLoading) return <div>Loading character…</div>;
  if (isError)
    return (
      <div className="text-red-600">
        {error?.message || "Failed to load character."}
      </div>
    );
  if (!character) return <div>Character not found.</div>;

  return (
    <section className="space-y-4">
      <div className="flex items-center gap-4">
        <img
          src={character.image}
          alt={character.name}
          className="rounded-2xl w-64 h-64 object-cover col-span-2"
        />
        <div>
          <h1 className="mt-2 text-3xl font-bold">{character.name}</h1>
          <p className="text-slate-600">
            {character.species} • {character.gender} •{" "}
            <span className="italic">{character.status}</span>
          </p>
          <p className="text-slate-500 text-sm">
            Origin: {character.origin?.name} • Last known:{" "}
            {character.location?.name}
          </p>
        </div>
      </div>
      <div className="grid grid-cols-3 gap-6">
        <div className="col-span-3">
          <h2 className="text-xl font-semibold mb-2">Episodes</h2>
          {epLoading && <div>Loading episodes…</div>}
          {!epLoading && (!episodes || episodes.length === 0) && (
            <div className="text-slate-500">No episodes found.</div>
          )}
          <ul className="divide-y rounded-xl border bg-white">
            {episodes?.map((e) => (
              <li
                key={e.id}
                className="px-4 py-3 hover:bg-slate-50 flex items-center justify-between"
              >
                <div>
                  <div className="font-medium">
                    {e.episode} — {e.name}
                  </div>
                  <div className="text-sm text-slate-500">{e.air_date}</div>
                </div>
                <Link
                  to={`/episode/${e.id}`}
                  className="text-sm text-blue-600 hover:underline"
                >
                  Open
                </Link>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>
  );
}
