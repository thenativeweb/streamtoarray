'use strict';

const streamToArray = async function (stream) {
  if (!stream) {
    throw new Error('Stream is missing.');
  }

  const array = [];

  try {
    for await (const item of stream) {
      array.push(item);
    }
  } catch (ex) {
    ex.array = array;

    throw ex;
  }

  return array;
};

module.exports = streamToArray;
