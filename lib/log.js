export default class Logger {
  constructor (id, start = Date.now()) {
    this.id = id
    this.start = start
  }

  child (id) {
    return new Logger(id, this.start)
  }

  log (...args) {
    if (window.console && window.console.log) {
      Function.prototype.bind.call(window.console.log, window.console)
        .apply(
        window.console,
        [Date.now() - this.start + 'ms', this.id ? `${this.id}:` : `your function:`].concat([].slice.call(args, 0))
        )
    }
  }

  error (...args) {
    if (window.console && window.console.error) {
      Function.prototype.bind.call(window.console.error, window.console)
        .apply(
        window.console,
        [Date.now() - this.start + 'ms', this.id ? `${this.id}:` : `your function:`].concat([].slice.call(args, 0))
        )
    }
  }
}