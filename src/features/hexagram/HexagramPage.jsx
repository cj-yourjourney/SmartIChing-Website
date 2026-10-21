import { useEffect, useRef } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import {
  setSelectedNumber,
  fetchHexagramList,
  fetchHexagram
} from './state/hexagramSlice'
import HexagramPicker from './components/HexagramPicker'
import HexagramCard from './components/HexagramCard'
import PageHeader from '@/shared/components/layout/PageHeader'
import SplitLayout from '@/shared/components/layout/SplitLayout'
import EmptyState from '@/shared/components/feedback/EmptyState'
import ErrorAlert from '@/shared/components/feedback/ErrorAlert'
import useAccessGate from '@/features/account/useAccessGate'
import GatedPage from '@/features/account/components/GatedPage'

function ContentSkeleton() {
  return (
    <div className="space-y-6" aria-busy="true">
      <div className="skeleton h-48 w-full" />
      <div className="skeleton h-32 w-full" />
      <div className="skeleton h-64 w-full" />
    </div>
  )
}

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
  const contentRef = useRef(null)

  // Only load the list once access is confirmed, so a blocked user never
  // fires a request that would return 403.
  useEffect(() => {
    if (gate === 'allowed' && hexagrams.length === 0) {
      dispatch(fetchHexagramList())
    }
  }, [gate, dispatch, hexagrams.length])

  function handleSelect(number) {
    if (loading) return // avoid out-of-order responses
    if (hexagram?.number === number) return
    dispatch(setSelectedNumber(number))
    dispatch(fetchHexagram(number))
    // On phones the content sits below the picker, so bring it into view.
    if (window.matchMedia('(max-width: 1023px)').matches) {
      contentRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
    }
  }

  return (
    <GatedPage skeleton="split" subscriptionRequired={subscriptionRequired}>
      <PageHeader
        title="Hexagrams"
        description="Browse all 64 hexagrams: their judgment, their image and the meaning of every line."
      />

      <SplitLayout
        asideFirst
        sticky
        aside={
          <HexagramPicker
            hexagrams={hexagrams}
            selectedNumber={selectedNumber}
            hasSelection={Boolean(hexagram) || loading}
            onSelect={handleSelect}
            listLoading={listLoading}
            listError={listError}
          />
        }
      >
        <div ref={contentRef} aria-live="polite" className="scroll-mt-6">
          {loading ? (
            <ContentSkeleton />
          ) : error ? (
            <ErrorAlert
              message={error}
              onRetry={() => dispatch(fetchHexagram(selectedNumber))}
            />
          ) : hexagram ? (
            <HexagramCard hexagram={hexagram} />
          ) : (
            <EmptyState
              variant="card"
              title="Select a hexagram to begin"
              description="Each one comes with its overall meaning, the Judgment, the Image and a reading of all six lines."
            />
          )}
        </div>
      </SplitLayout>
    </GatedPage>
  )
}
