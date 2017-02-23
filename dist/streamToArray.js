'use strict';

var streamToArray = function streamToArray(stream, callback) {
  if (!stream) {
    throw new Error('Stream is missing.');
  }
  if (!callback) {
    throw new Error('Callback is missing.');
  }

  var array = [];

  var onData = void 0,
      onEnd = void 0,
      onError = void 0;

  var unsubscribe = function unsubscribe() {
    stream.removeListener('data', onData);
    stream.removeListener('error', onError);
    stream.removeListener('end', onEnd);
  };

  onData = function onData(data) {
    array.push(data);
  };

  onError = function onError(err) {
    unsubscribe();
    callback(err);
  };

  onEnd = function onEnd() {
    unsubscribe();
    callback(null, array);
  };

  stream.on('data', onData);
  stream.on('error', onError);
  stream.on('end', onEnd);
};

module.exports = streamToArray;