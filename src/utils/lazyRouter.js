import Error from '@components/empty/empty'
import Loading from '@components/loading/loading'

export default (AsyncView) => {
  const AsyncHandler = () => ({
    component: AsyncView,
    loading: Loading,
    error: Error
  })

  return Promise.resolve({
    functional: true,
    render(h, { data, children }) {
      // Transparently pass any props or children
      // to the view component.
      return h(AsyncHandler, data, children)
    }
  })
}
