// src/pages/CharactersPage.tsx
import { useCallback, useMemo, useEffect } from "react";
import { useSearchParams } from "react-router-dom";
import { useCharacters } from "../hooks/useCharacters";
import CharacterCard from "../components/CharacterCard";
import SearchBox from "../components/SearchBox";
import Pager from "../components/Pager";
import CharacterDetailPage from "./CharacterDetailPage";

export default function CharactersPage() {
  const [searchParams, setSearchParams] = useSearchParams();
  const pageParam = Number(searchParams.get("page") || "1");
  const nameParam = searchParams.get("name") || "";
  const selectedParam = searchParams.get("id");
  const selectedId = selectedParam ? Number(selectedParam) : null;

  const { data, isFetching, isError, error } = useCharacters(
    pageParam,
    nameParam
  );
  const results = useMemo(() => data?.results ?? [], [data]);

  useEffect(() => {
    if (!results.length) return;

    const exists = selectedId
      ? results.some((r) => r.id === selectedId)
      : false;
    if (!selectedId || !exists) {
      const next = new URLSearchParams(searchParams);
      next.set("id", String(results[0].id));
      setSearchParams(next, { replace: true });
    }
  }, [results, selectedId, searchParams, setSearchParams]);

  const onSearch = useCallback(
    (v: string) => {
      if (v === nameParam) return;

      const next = new URLSearchParams(searchParams);
      next.set("name", v);
      next.set("page", "1");
      setSearchParams(next, { replace: true });
    },
    [nameParam, searchParams, setSearchParams]
  );

  const onPage = useCallback(
    (p: number) => {
      const next = new URLSearchParams(searchParams);
      next.set("page", String(p));
      if (nameParam) next.set("name", nameParam);
      else next.delete("name");

      setSearchParams(next, { replace: true });
    },
    [nameParam, searchParams, setSearchParams]
  );
  const onSelect = useCallback(
    (id: number) => {
      const next = new URLSearchParams(searchParams);
      next.set("id", String(id));
      setSearchParams(next, { replace: false });
    },
    [searchParams, setSearchParams]
  );

  return (
    <section className="h-[calc(100vh-10rem)] flex flex-col">
      {/* Top Bar */}
      <div>
        <div className="flex items-center justify-between gap-4">
          <h1 className="text-2xl font-semibold">Characters</h1>
        </div>
        <div className="mt-4 max-w-xl">
          <SearchBox defaultValue={nameParam} onChange={onSearch} />
        </div>

        {isFetching && (
          <div className="mt-6 text-slate-500">Loading characters…</div>
        )}
        {isError && (
          <div className="mt-6 text-red-600">
            {error?.message || "Failed to load characters."}
          </div>
        )}
      </div>

      <div className="mt-6 grid grid-cols-3 gap-6 flex-1 overflow-hidden">
        {/* Left: list */}
        <div className="col-span-1 flex flex-col h-full overflow-hidden">
          <div className="flex-1 overflow-auto pr-2">
            {!isFetching && !isError && results.length === 0 && (
              <div className="text-slate-500">No characters found.</div>
            )}
            <div className="grid grid-cols-1 gap-4">
              {results.map((c) => (
                <CharacterCard
                  key={c.id}
                  c={c}
                  onSelect={onSelect}
                  isActive={selectedId === c.id}
                />
              ))}
            </div>
          </div>
          <div className="mt-4">
            <Pager
              page={pageParam}
              pages={data?.info?.pages ?? 1}
              onPage={onPage}
              disabled={isFetching || !!isError}
            />
          </div>
        </div>

        <div className="col-span-2 overflow-auto h-full">
          <CharacterDetailPage id={selectedId} />
        </div>
      </div>
    </section>
  );
}
