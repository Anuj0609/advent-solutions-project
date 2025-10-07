export default function Pager({
  page,
  pages,
  onPage,
  disabled = false,
}: {
  page: number
  pages: number
  onPage: (p: number) => void
  disabled?: boolean
}) {
  return (
    <div className="flex items-center justify-center gap-3 mt-6">
      <button
        className="rounded-lg border px-3 py-1 disabled:opacity-50"
        onClick={() => onPage(Math.max(1, page - 1))}
        disabled={disabled || page <= 1}
      >
        Prev
      </button>
      <span className="text-sm text-slate-600">
        Page <strong>{page}</strong> / {pages || 1}
      </span>
      <button
        className="rounded-lg border px-3 py-1 disabled:opacity-50"
        onClick={() => onPage(Math.min(pages || 1, page + 1))}
        disabled={disabled || page >= (pages || 1)}
      >
        Next
      </button>
    </div>
  )
}
