export default class Logger {
  constructor() {
    this._name = 'Logger';
    this.init();
  }
  init() {
    // initializes logger features
    // Log messages will be written to the window's console.
    Logger.useDefaults();
    // Only log WARN and ERROR messages.
    Logger.setLevel(Logger.WARN);
    Logger.debug('Logger level: ' + Logger.getLevel());
  }
  get name() {
    return this._name;
  }
}
