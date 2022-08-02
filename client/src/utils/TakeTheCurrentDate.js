export const takeTheCurrentDate = () => {
  var finishTime = new Date()
  localStorage.setItem('finishTime', finishTime)
  var dd = String(finishTime.getDate()).padStart(2, '0')
  var mm = String(finishTime.getMonth() + 1).padStart(2, '0')
  var yyyy = finishTime.getFullYear()
  finishTime = mm + '/' + dd + '/' + yyyy
  return finishTime
}
