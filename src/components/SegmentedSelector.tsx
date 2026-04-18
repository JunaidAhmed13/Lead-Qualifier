interface Props {
  options: string[]
  value: string
  onChange: (value: string) => void
  name: string
}

export default function SegmentedSelector({ options, value, onChange, name }: Props) {
  return (
    <div className="grid grid-cols-2 md:grid-cols-4 gap-2" role="group" aria-label={name}>
      {options.map((opt) => {
        const selected = value === opt
        return (
          <button
            key={opt}
            type="button"
            role="radio"
            aria-checked={selected}
            onClick={() => onChange(opt)}
            onKeyDown={(e) => {
              if (e.key === 'Enter' || e.key === ' ') {
                e.preventDefault()
                onChange(opt)
              }
            }}
            tabIndex={0}
            className="relative px-3 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 text-center"
            style={{
              backgroundColor: selected ? 'rgba(79,110,247,0.12)' : 'var(--bg-elevated)',
              border: selected ? '1px solid var(--accent-primary)' : '1px solid var(--border)',
              color: selected ? 'var(--accent-primary)' : 'var(--text-secondary)',
              boxShadow: selected ? '0 0 12px rgba(79,110,247,0.15)' : 'none',
            }}
          >
            {opt}
          </button>
        )
      })}
    </div>
  )
}
