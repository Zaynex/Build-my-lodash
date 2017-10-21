/**
 * get dom's left and top relative to the viewpor
 * @param {Document Element} dom
 */
const getBoundingView = (dom) => {
  const { left, top } = dom.getBoundingClientRect()
  const scrollX = window.pageXOffset
  const scrollY = window.pageYOffset
  return {
    left: left + scrollX,
    top: top + scrollY
  }
}