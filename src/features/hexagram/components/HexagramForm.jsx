export default function HexagramForm({
  number,
  pinyinName,
  englishName,
  onNumberChange,
  onPinyinChange,
  onEnglishChange,
  onGenerate,
  loading,
  error
}) {
  return (
    <div className="max-w-3xl mx-auto mb-8">
      <h1 className="text-3xl font-bold text-center mb-6">Smart I Ching</h1>

      <div className="card bg-base-100 shadow-xl border border-base-300">
        <div className="card-body">
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
            <label className="form-control">
              <span className="label-text">Number (1–64)</span>
              <input
                type="number"
                min={1}
                max={64}
                value={number}
                onChange={(e) => onNumberChange(e.target.value)}
                className="input input-bordered"
              />
            </label>
            <label className="form-control">
              <span className="label-text">Pinyin Name</span>
              <input
                type="text"
                value={pinyinName}
                onChange={(e) => onPinyinChange(e.target.value)}
                className="input input-bordered"
              />
            </label>
            <label className="form-control">
              <span className="label-text">English Name</span>
              <input
                type="text"
                value={englishName}
                onChange={(e) => onEnglishChange(e.target.value)}
                className="input input-bordered"
              />
            </label>
          </div>

          <button
            onClick={onGenerate}
            disabled={loading}
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
