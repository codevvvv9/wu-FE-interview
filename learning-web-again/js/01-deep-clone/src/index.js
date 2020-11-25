function deepClone(source) {
  if (source instanceof Object) {
    if (source instanceof Array) {
      const newSource = [];
      for (const key in source) {
        if (source.hasOwnProperty(key)) {
          const element = source[key];
          newSource[key] = deepClone(element);
        }
      }
      return newSource;
    } else if( source instanceof Function) {
      const newSource = function () {
        return source.apply(this, arguments)
      };
      for (const key in source) {
        if (source.hasOwnProperty(key)) {
          const element = source[key];
          newSource[key] = deepClone(element);
        }
      }
      return newSource;
    } else {
      const newSource = {};
      for (const key in source) {
        if (source.hasOwnProperty(key)) {
          const element = source[key];
          newSource[key] = deepClone(element);
        }
      }
      return newSource;
    }
  }
  return source;
}

module.exports = deepClone;
