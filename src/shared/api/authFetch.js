import { API_CONFIG, apiCall } from './config'
import { tokenStorage } from './tokenStorage'

// Only one refresh may be in flight at a time. The backend rotates and
// blacklists refresh tokens, so two parallel refreshes would make the second
// one fail and log the user out.
let refreshPromise = null

const refreshAccessToken = () => {
  if (refreshPromise) return refreshPromise

  const refresh = tokenStorage.getRefresh()
  if (!refresh) {
    return Promise.reject({
      status: 401,
      message: 'Session expired. Please sign in again.',
      data: null
    })
  }

  refreshPromise = apiCall(API_CONFIG.ENDPOINTS.REFRESH_TOKEN, {
    method: 'POST',
    body: JSON.stringify({ refresh })
  })
    .then((data) => {
      tokenStorage.set({ access: data.access, refresh: data.refresh })
      return data.access
    })
    .finally(() => {
      refreshPromise = null
    })

  return refreshPromise
}

const request = async (endpoint, options = {}) => {
  const send = (token) =>
    apiCall(endpoint, {
      ...options,
      headers: { ...options.headers, Authorization: `Bearer ${token}` }
    })

  const access = tokenStorage.getAccess() || (await refreshAccessToken())

  try {
    return await send(access)
  } catch (err) {
    if (err.status !== 401) throw err
    const freshAccess = await refreshAccessToken()
    return send(freshAccess)
  }
}

export const authApi = {
  get: (endpoint) => request(endpoint, { method: 'GET' }),
  post: (endpoint, data = {}) =>
    request(endpoint, { method: 'POST', body: JSON.stringify(data) })
}

export default authApi
