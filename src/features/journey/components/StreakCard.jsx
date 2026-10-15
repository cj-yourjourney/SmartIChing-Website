import { Check, Flame } from 'lucide-react'

// streaks: { current, longest }   last7: [{ key, label, active }]
export default function StreakCard({ streaks, last7 }) {
  const { current, longest } = streaks
  return (
    <section className="rounded-box border border-base-300 bg-base-100 p-6">
      <h2 className="font-serif text-2xl">Daily rhythm</h2>

      <div className="mt-5 flex items-end gap-3">
        <Flame className="mb-1 size-9 text-secondary" strokeWidth={1.5} aria-hidden="true" />
        <div className="font-serif text-6xl leading-none">{current}</div>
        <div className="pb-1 opacity-70">
          {current === 1 ? 'day' : 'days'} in a row
        </div>
      </div>
      <p className="mt-2 text-sm opacity-70">
        {current === 0
          ? 'Visit today to start a new streak.'
          : `Your longest streak is ${longest} ${longest === 1 ? 'day' : 'days'}.`}
      </p>

      <div className="mt-6 flex justify-between">
        {last7.map((d) => (
          <div key={d.key} className="flex flex-col items-center gap-2">
            <div
              className={`grid size-9 place-items-center rounded-full ${
                d.active
                  ? 'bg-primary text-primary-content'
                  : 'bg-base-200 text-base-content/40'
              }`}
            >
              {d.active && <Check className="size-4" aria-hidden="true" />}
            </div>
            <div className="text-xs opacity-60">{d.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
