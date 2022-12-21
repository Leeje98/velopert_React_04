import { useEffect, useReducer } from "react"



function reducer(state, action) {
  switch (action.type) {
    case 'LOADING':
      return {
        loading: true,
        data: null,
        error: null
      }
    case 'SUCCESS':
      return {
        loading: false,
        data: action.data,
        error: null
      }
    case 'ERROR':
      return {
        loading: false,
        data: null,
        error: action.error
      }
    default:
      throw new Error(`Unhandled action type: ${action.type}`)
  }
}

function useAsync(callback, deps = [] ) {
  const [state, dispstch] = useReducer(reducer, {
    loading: false,
    data: null,
    error: false
  })

  const fetchData = async () => {
    dispstch({ type: 'LOADING' })
    try {
      const data = await callback()
      dispstch({ type: 'SUCCESS', data })
    } catch (e) {
      dispstch({ type: 'ERROR', error: e })
    }
  }

  useEffect(() => {
    fetchData();
    // eslint 설정을 다음 줄에서만 비활성화
    // eslint-disable-next-line
  }, deps)

  return [state, fetchData]
}

export default useAsync;