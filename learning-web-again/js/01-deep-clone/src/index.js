function deepClone(source) {
  if (source instanceof Object) {
    const newSource = {}
    for (const key in source) {
      if (source.hasOwnProperty(key)) {
        const element = source[key];
        newSource[key] = deepClone(element)
      }
    }
    return newSource
  }
  return source
}

module.exports = deepClone