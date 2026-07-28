import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  setSelectedNumber,
  fetchHexagramList,
  fetchHexagram
} from './state/hexagramSlice'
import HexagramForm from './components/HexagramForm'
import HexagramCard from './components/HexagramCard'

export default function HexagramPage() {
  const dispatch = useDispatch()
  const {
    hexagrams,
    listLoading,
    listError,
    selectedNumber,
    hexagram,
    loading,
    error
  } = useSelector((state) => state.hexagram)

  useEffect(() => {
    if (hexagrams.length === 0) {
      dispatch(fetchHexagramList())
    }
  }, [dispatch, hexagrams.length])

  function handleGenerate() {
    dispatch(fetchHexagram(selectedNumber))
  }

  return (
    <main data-theme="sunset" className="min-h-screen bg-base-200 py-10 px-4">
      <HexagramForm
        hexagrams={hexagrams}
        selectedNumber={selectedNumber}
        onSelectChange={(v) => dispatch(setSelectedNumber(v))}
        onGenerate={handleGenerate}
        loading={loading}
        listLoading={listLoading}
        listError={listError}
        error={error}
      />
      <HexagramCard hexagram={hexagram} />
    </main>
  )
}
