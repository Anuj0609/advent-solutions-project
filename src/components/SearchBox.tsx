import { useEffect, useState } from 'react'

export default function SearchBox({
  defaultValue = '',
  onChange,
  placeholder = 'Search characters by name...',
}: {
  defaultValue?: string
  onChange: (value: string) => void
  placeholder?: string
}) {
  const [value, setValue] = useState(defaultValue)

  // Debounce typing for 300ms
  useEffect(() => {
    const t = setTimeout(() => onChange(value.trim()), 300)
    return () => clearTimeout(t)
  }, [value, onChange])

  useEffect(() => setValue(defaultValue), [defaultValue])

  return (
    <div className="flex items-center gap-3 rounded-xl border bg-white px-4 py-2 shadow-sm">
      <span role="img" aria-label="search">🔎</span>
      <input
        className="w-full outline-none"
        placeholder={placeholder}
        value={value}
        onChange={(e) => setValue(e.target.value)}
      />
      {value && (
        <button
          className="text-sm text-slate-500 hover:underline"
          onClick={() => setValue('')}
        >
          Clear
        </button>
      )}
    </div>
  )
}
