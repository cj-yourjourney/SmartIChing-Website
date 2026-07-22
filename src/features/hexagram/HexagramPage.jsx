import { useSelector, useDispatch } from 'react-redux'
import {
  setNumber,
  setPinyinName,
  setEnglishName,
  fetchHexagram
} from './state/hexagramSlice'
import HexagramForm from './components/HexagramForm'
import HexagramCard from './components/HexagramCard'

export default function HexagramPage() {
  const dispatch = useDispatch()
  const { number, pinyinName, englishName, hexagram, loading, error } =
    useSelector((state) => state.hexagram)

  function handleGenerate() {
    dispatch(
      fetchHexagram({
        number: Number(number),
        pinyin_name: pinyinName,
        english_name: englishName
      })
    )
  }

  return (
    <main data-theme="sunset" className="min-h-screen bg-base-200 py-10 px-4">
      <HexagramForm
        number={number}
        pinyinName={pinyinName}
        englishName={englishName}
        onNumberChange={(v) => dispatch(setNumber(v))}
        onPinyinChange={(v) => dispatch(setPinyinName(v))}
        onEnglishChange={(v) => dispatch(setEnglishName(v))}
        onGenerate={handleGenerate}
        loading={loading}
        error={error}
      />
      <HexagramCard hexagram={hexagram} />
    </main>
  )
}
