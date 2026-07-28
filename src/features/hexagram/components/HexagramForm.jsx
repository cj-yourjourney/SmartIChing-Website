export default function HexagramForm({
  hexagrams,
  selectedNumber,
  onSelectChange,
  onGenerate,
  loading,
  listLoading,
  listError,
  error
}) {
  return (
    <div className="max-w-3xl mx-auto mb-8">
      <h1 className="text-3xl font-bold text-center mb-6">Smart I Ching</h1>

      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <label className="form-control">
            <span className="label-text">Hexagram</span>
            <select
              value={selectedNumber}
              onChange={(e) => onSelectChange(Number(e.target.value))}
              className="select select-bordered"
              disabled={listLoading || hexagrams.length === 0}
            >
              {hexagrams.map((h) => (
                <option key={h.number} value={h.number}>
                  {h.number}. {h.pinyin_name} · {h.english_name}
                </option>
              ))}
            </select>
          </label>

          {listError && (
            <div className="alert alert-error mt-4">
              <span>{listError}</span>
            </div>
          )}

          <button
            onClick={onGenerate}
            disabled={loading || listLoading || hexagrams.length === 0}
            className="btn btn-primary mt-4"
          >
            {loading ? (
              <span className="loading loading-spinner"></span>
            ) : (
              'Generate Hexagram'
            )}
          </button>

          {error && (
            <div className="alert alert-error mt-4">
              <span>{error}</span>
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
