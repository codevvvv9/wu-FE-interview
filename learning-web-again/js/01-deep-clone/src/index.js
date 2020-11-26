let cache = [];
function deepClone(source) {
  if (source instanceof Object) {
    let cachedSource = findCache(source);
    if (cachedSource) {
      return cachedSource;
    } else {
      let newSource;
      if (source instanceof Array) {
        newSource = [];
      } else if (source instanceof Function) {
        newSource = function () {
          return source.apply(this, arguments);
        };
      } else if(source instanceof RegExp) {
        newSource = new RegExp(source.source, source.flags)
      } else if (source instanceof Date) {
        newSource = new Date(source)
      }else {
        newSource = {};
      }
      cache.push([source, newSource]);
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

  function findCache(source) {
    for (let i = 0; i < cache.length; i++) {
      if (cache[i][0] === source) {
        return cache[i][1];
      }
    }
    return undefined;
  }
}

module.exports = deepClone;
