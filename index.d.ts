declare module 'cookie-to-localstorage' {
  export interface ICookie {
    name: string;
    value: string;
    options?: {
      [x: string]: any
    };
  }
  export interface CTL {
    parse: (cookieStr: string) => ICookie;
    toCookie: () => string;
    set: (name: ICookie['name'], value: ICookie['value'], options?: ICookie['options']) => void;
    get: (name: ICookie['name']) => string;
    getAll: () => {
      [name: string]: ICookie['value']
    };
    delete: (name: ICookie['name']) => string;
    install: (Vue: Object) => void;
  }
  const ctl: CTL;
  export default ctl;
}
