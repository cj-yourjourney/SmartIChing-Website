const ACCESS_KEY = 'smartiching_access'
const REFRESH_KEY = 'smartiching_refresh'

const read = (key) => {
  if (typeof window === 'undefined') return null
  try {
    return window.localStorage.getItem(key)
  } catch {
    return null
  }
}

const write = (key, value) => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.setItem(key, value)
  } catch {
    // storage unavailable (private mode, blocked) - session just won't persist
  }
}

const remove = (key) => {
  if (typeof window === 'undefined') return
  try {
    window.localStorage.removeItem(key)
  } catch {
    // ignore
  }
}

export const tokenStorage = {
  getAccess: () => read(ACCESS_KEY),
  getRefresh: () => read(REFRESH_KEY),
  set: ({ access, refresh } = {}) => {
    if (access) write(ACCESS_KEY, access)
    if (refresh) write(REFRESH_KEY, refresh)
  },
  clear: () => {
    remove(ACCESS_KEY)
    remove(REFRESH_KEY)
  }
}

export default tokenStorage
