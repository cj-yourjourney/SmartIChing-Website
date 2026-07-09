import { useState } from 'react'
import { generateHexagram } from '@/lib/api'
import HexagramCard from '@/components/HexagramCard'

export default function Home() {
  const [number, setNumber] = useState(40)
  const [pinyinName, setPinyinName] = useState('Jie')
  const [englishName, setEnglishName] = useState('Relief')
  const [hexagram, setHexagram] = useState(null)
  const [loading, setLoading] = useState(false)
  const [error, setError] = useState(null)

  async function handleGenerate() {
    setLoading(true)
    setError(null)
    setHexagram(null)
    try {
      const data = await generateHexagram({
        number: Number(number),
        pinyin_name: pinyinName,
        english_name: englishName
      })
      setHexagram(data)
    } catch (err) {
      setError(err.message)
    } finally {
      setLoading(false)
    }
  }

  return (
    <main data-theme="sunset" className="min-h-screen bg-base-200 py-10 px-4">
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
                  onChange={(e) => setNumber(e.target.value)}
                  className="input input-bordered"
                />
              </label>
              <label className="form-control">
                <span className="label-text">Pinyin Name</span>
                <input
                  type="text"
                  value={pinyinName}
                  onChange={(e) => setPinyinName(e.target.value)}
                  className="input input-bordered"
                />
              </label>
              <label className="form-control">
                <span className="label-text">English Name</span>
                <input
                  type="text"
                  value={englishName}
                  onChange={(e) => setEnglishName(e.target.value)}
                  className="input input-bordered"
                />
              </label>
            </div>

            <button
              onClick={handleGenerate}
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

      <HexagramCard hexagram={hexagram} />
    </main>
  )
}
