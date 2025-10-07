// src/components/CharacterCard.tsx
import type { Character } from "../api/types";

export default function CharacterCard({
  c,
  onSelect,
  isActive = false,
}: {
  c: Character;
  onSelect: (id: number) => void;
  isActive?: boolean;
}) {
  return (
    <button
      type="button"
      onClick={() => onSelect(c.id)}
      className={
        "text-left group overflow-hidden rounded-2xl border bg-white shadow-sm hover:shadow-md transition " +
        (isActive ? "ring-2 ring-blue-500" : "")
      }
    >
      <div className="p-4 space-y-1">
        <div className="flex items-center justify-between">
          <div className="flex items-center gap-3">
            <img
              src={c.image}
              alt={c.name}
              className="h-12 w-12 rounded-full object-cover group-hover:scale-[1.02] transition-transform"
              loading="lazy"
            />
            <h3 className="font-semibold">{c.name}</h3>
          </div>
          <span
            className={
              "rounded-full px-2 py-0.5 text-xs " +
              (c.status === "Alive"
                ? "bg-green-100 text-green-700"
                : c.status === "Dead"
                ? "bg-red-100 text-red-700"
                : "bg-slate-100 text-slate-700")
            }
          >
            {c.status}
          </span>
        </div>
      </div>
    </button>
  );
}
