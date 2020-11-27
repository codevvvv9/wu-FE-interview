class DeepClone {
  constructor() {
    this.cache = [];
  }
  deepClone(source) {
    if (source instanceof Object) {
      let cachedSource = this.findCache(source);
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
        } else if (source instanceof RegExp) {
          newSource = new RegExp(source.source, source.flags);
        } else if (source instanceof Date) {
          newSource = new Date(source);
        } else {
          newSource = {};
        }
        this.cache.push([source, newSource]);
        for (const key in source) {
          if (source.hasOwnProperty(key)) {
            const element = source[key];
            newSource[key] = this.deepClone(element);
          }
        }
        return newSource;
      }
    }
    return source;
  }
  findCache(source) {
    for (let i = 0; i < this.cache.length; i++) {
      if (this.cache[i][0] === source) {
        return this.cache[i][1];
      }
    }
    return undefined;
  }
}
module.exports = DeepClone;
