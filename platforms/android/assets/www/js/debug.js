app.debug_log = true;

app.logger = function (msg) {
  if (this.debug_log) {
    if (typeof msg !== 'undefined') {
      console.log(msg)
    } else {
      console.log('logger: msg is undefined')
    }

  }
};
