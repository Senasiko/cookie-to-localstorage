function parseOption(optionStr) {
  optionStr.match(/(.+)?=(.+)/);
  return {
    name: RegExp.$1,
    value: RegExp.$2,
  };
}

var per = 'ctl:';

module.exports = {
  parse: function(cookieStr) {
    var entries = cookieStr.split('; ');
    var cookie = parseOption(entries.shift());
    var options = {};
    entries.forEach((option) => {
      var optionObj = parseOption(option);
      options[optionObj.name] = optionObj.value;
    }); 

    this.set(cookie.name, cookie.value, options);

    return {
      name: cookie.name,
      value: cookie.value,
      options: options,
    };
  },

  toCookie: function() {
    var str = '';
    var cookies = this.getAll();
    cookies.forEach(cookie => str = str + '; ' + cookie.name.replace(per, '') + '=' + cookie.value);
    return str;
  },

  set: function(name, value, options) {
    var v = JSON.stringify({ value: value, options: options });
    localStorage.setItem(per + name, v);
  },

  get: function(name) {
    var v = JSON.parse(localStorage.getItem(per + name));
    if (!v) return null;
    if (v.options.expires) {
      var expires = new Date(v.options.expires).getTime();
      var now = new Date(v.options.expires).getTime();
      if (now > expires) {
        this.delete(name);
        return null;
      }
    }
    return v.value;
  },

  getAll: function() {
    var keys = Object.keys(localStorage).filter(key => new RegExp(per).test(key));
    return keys.map(key => ({ name: key, value: JSON.parse(localStorage[key]).value }));
  },

  delete: function() {
    localStorage.removeItem(per + name);
  },

  install: function(Vue) {
    Vue.cookie = this;
    Object.defineProperty(Vue.prototype, '$cookie', { value: this });
  }
}
