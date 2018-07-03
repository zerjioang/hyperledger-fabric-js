// CommonJS import
import Logger from 'js-logger';

export default class Log {
  constructor() {
    this._name = 'HLFLog';
    this.loaded = false;
    this.defaultLogger = this.createLogger('default');
  }
  init() {
    // initializes logger features
    // Log messages will be written to the window's console.
    Logger.useDefaults();
    // Only log WARN and ERROR messages.
    Logger.setLevel(Logger.WARN);
    Logger.debug('HLFLog Logger level: ' + Logger.getLevel());
    this.loaded = true;
  }
  get name() {
    if (!this.init) {
      this.init();
    }
    return this._name;
  }
  createLogger(name) {
    return Logger.get(name);
  }
  get getLevel() {
    return this.defaultLogger.getLevel();
  }
  debug(o) {
    this.defaultLogger.debug(o);
  }
  info(o) {
    this.defaultLogger.info(o);
  }
}
