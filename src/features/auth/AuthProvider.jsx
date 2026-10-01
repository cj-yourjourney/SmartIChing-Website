import { useEffect } from 'react'
import { useDispatch } from 'react-redux'
import { loadSession } from './state/authSlice'

export default function AuthProvider({ children }) {
  const dispatch = useDispatch()

  useEffect(() => {
    dispatch(loadSession())
  }, [dispatch])

  return children
}
