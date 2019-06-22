function formatNumber (n) {
  const str = n.toString()
  return str[1] ? str : `0${str}`
}

export function formatTime (date) {
  const hour = date.getHours()
  const minute = date.getMinutes()

  return `${formatDateTime(date)} ${formatNumber(hour)}:${formatNumber(minute)}`
}

export function formatDateTime (date) {
  const year = date.getFullYear()
  const month = date.getMonth() + 1
  const day = date.getDate()

  return `${year}/${formatNumber(month)}/${formatNumber(day)}`;
}

export function formatDate (date) {
  let y = date.getFullYear()
  let m = date.getMonth() + 1
  m = m < 10 ? ('0' + m) : m
  let d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  return y + '-' + m + '-' + d
}
