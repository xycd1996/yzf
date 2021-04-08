const MERCH_ID = 192

export function defaultParams(config) {
  const isFormData = config.data instanceof FormData
  if (isFormData) {
    config.data.append('merch_id', MERCH_ID)
    localStorage.getItem('uid') && config.data.append('uid', localStorage.getItem('uid'))
    localStorage.getItem('token') && config.data.append('token', localStorage.getItem('token'))
  } else {
    const formData = new FormData()
    formData.append('merch_id', MERCH_ID)
    localStorage.getItem('uid') && formData.append('uid', localStorage.getItem('uid'))
    localStorage.getItem('token') && formData.append('token', localStorage.getItem('token'))
    config.data = formData
  }
}
