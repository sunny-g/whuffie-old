if (typeof this.process === 'undefined') {
  process = {};
  process.nextTick = setImmediate;
}
