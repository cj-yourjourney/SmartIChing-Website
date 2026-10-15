import { RANGE_OPTIONS } from '../utils'

export default function RangeToggle({ value, onChange }) {
  return (
    <div role="tablist" aria-label="Time range" className="tabs tabs-box">
      {RANGE_OPTIONS.map((opt) => (
        <button
          key={opt.value}
          type="button"
          role="tab"
          aria-selected={value === opt.value}
          className={`tab ${value === opt.value ? 'tab-active' : ''}`}
          onClick={() => onChange(opt.value)}
        >
          {opt.label}
        </button>
      ))}
    </div>
  )
}
