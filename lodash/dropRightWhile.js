const dropRightWhile = (array, predicate) => {
  return array.filter((v) => {
    return predicate(v)
  })
}