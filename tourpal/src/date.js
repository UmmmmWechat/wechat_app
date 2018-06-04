let startDate = new Date()
let endDate = new Date()
endDate.setDate(startDate.getDate() + 30)
var format = (date) => {
  let y = date.getFullYear()
  let m = date.getMonth()
  m = m < 10 ? ('0' + m) : m
  let d = date.getDate()
  d = d < 10 ? ('0' + d) : d
  return y + '-' + m + '-' + d
}

console.log(format(startDate))

