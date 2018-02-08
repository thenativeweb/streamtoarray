'use strict';

const streamToArray = function (stream) {
  return new Promise((resolve, reject) => {
    if (!stream) {
      throw new Error('Stream is missing.');
    }

    const array = [];

    let onData,
        onEnd,
        onError;

    const unsubscribe = function () {
      stream.removeListener('data', onData);
      stream.removeListener('error', onError);
      stream.removeListener('end', onEnd);
    };

    onData = function (data) {
      array.push(data);
    };

    onError = function (err) {
      unsubscribe();
      reject(err);
    };

    onEnd = function () {
      unsubscribe();
      resolve(array);
    };

    stream.on('data', onData);
    stream.on('error', onError);
    stream.on('end', onEnd);
  });
};

module.exports = streamToArray;
