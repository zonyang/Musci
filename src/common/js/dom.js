export function addClass(el, className) {
  if (hasClass(el, className)) {
    return
  }
  el.classList.add(className)
}

export function hasClass(el, className) {
  return el.classList.contains(className)
}

export function getData(el, name, val) {
  const prefix = 'data-'
  if (val) {
    return el.setAttribute(prefix + name, val)
  } else {
    return el.getAttribute(prefix + name)
  }
}
