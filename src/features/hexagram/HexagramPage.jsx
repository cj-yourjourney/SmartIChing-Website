import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  setSelectedNumber,
  fetchHexagramList,
  fetchHexagram
} from './state/hexagramSlice'
import HexagramForm from './components/HexagramForm'
import HexagramCard from './components/HexagramCard'
import useAccessGate from '@/features/account/useAccessGate'
import SubscriptionRequired from '@/features/account/components/SubscriptionRequired'


export default function HexagramPage() {
  const dispatch = useDispatch()
  const {
    hexagrams,
    listLoading,
    listError,
    selectedNumber,
    hexagram,
    loading,
    error,
    subscriptionRequired
  } = useSelector((state) => state.hexagram)

  const gate = useAccessGate()

  useEffect(() => {
    if (gate === 'allowed' && hexagrams.length === 0) {
      dispatch(fetchHexagramList())
    }
  }, [gate, dispatch, hexagrams.length])

  function handleGenerate() {
    dispatch(fetchHexagram(selectedNumber))
  }

  if (gate === 'loading') {
    return (
      <main data-theme="" className="min-h-screen bg-base-200 py-10 px-4">
        <div className="max-w-2xl mx-auto skeleton h-40 w-full" />
      </main>
    )
  }

  if (gate === 'blocked' || subscriptionRequired) {
    return (
      <main data-theme="" className="min-h-screen bg-base-200 py-10 px-4">
        <SubscriptionRequired />
      </main>
    )
  }

  return (
    <main data-theme="" className="min-h-screen bg-base-200 py-10 px-4">
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
