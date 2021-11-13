import Loading from '@components/loading/loading'

export default (AsyncView) => {
  const AsyncHandler = () => ({
    component: AsyncView,
    loading: Loading,
    error: Loading,
    delay: 400,
    timeout: 5000
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
