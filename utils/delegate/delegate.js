/**
 * 专业的事件委托
 * @param { element } element 
 * @param {string } eventType 
 * @param { string } selector 
 * @param { function } fn 
 */
function delegate(element, eventType, selector, fn) {
  element.addEventListener(eventType, e => {
    console.log("delegate -> e", e)
    let el = e.target
    console.log("delegate -> el", el)
    while (!el.matches(selector)) {
      if (element === el) {
        el = null
        break
      }
      el = el.parentNode
    }
    el && fn.call(el, e, el)
  })
  // return element
}