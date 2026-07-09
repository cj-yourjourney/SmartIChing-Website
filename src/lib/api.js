const API_BASE_URL = process.env.NEXT_PUBLIC_API_BASE_URL

export async function generateHexagram({
  number,
  pinyin_name,
  english_name
} = {}) {
  const res = await fetch(`${API_BASE_URL}/api/smart-iching/generate/`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ number, pinyin_name, english_name })
  })

  if (!res.ok) {
    const errorBody = await res.json().catch(() => ({}))
    throw new Error(
      errorBody.error || `Request failed with status ${res.status}`
    )
  }

  return res.json()
}
