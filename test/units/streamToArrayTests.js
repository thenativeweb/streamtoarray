'use strict';

const { PassThrough } = require('stream');

const assert = require('assertthat');

const streamToArray = require('../../src/streamToArray');

const getClosedStream = function () {
  const closedStream = new PassThrough({ objectMode: true });

  closedStream.write('foo');
  closedStream.write('bar');
  closedStream.end();

  return closedStream;
};

const getStream = function () {
  const fakeStream = new PassThrough({ objectMode: true });

  process.nextTick(() => {
    fakeStream.write('foo');
    fakeStream.write('bar');
    fakeStream.end();
  });

  return fakeStream;
};

const getFailingStream = function () {
  const failingStream = new PassThrough({ objectMode: true });

  process.nextTick(() => {
    failingStream.emit('error', new Error('some-error'));
  });

  return failingStream;
};

const getStreamThatFailsAfterAWhile = function () {
  const failingStream = new PassThrough({ objectMode: true });

  process.nextTick(() => {
    failingStream.write('foo');
    failingStream.write('bar');

    // Delay the stream error to give the client time to handle the already
    // written data.
    setTimeout(() => {
      failingStream.emit('error', new Error('some-error'));
    }, 0.1 * 1000);
  });

  return failingStream;
};

suite('streamToArray', () => {
  test('is a function.', async () => {
    assert.that(streamToArray).is.ofType('function');
  });

  test('throws an error if stream is missing.', async () => {
    await assert.that(async () => {
      await streamToArray();
    }).is.throwingAsync('Stream is missing.');
  });

  test('converts the stream to an array.', async () => {
    const array = await streamToArray(getStream());

    assert.that(array).is.equalTo([ 'foo', 'bar' ]);
  });

  test('also works with closed streams.', async () => {
    const array = await streamToArray(getClosedStream());

    assert.that(array).is.equalTo([ 'foo', 'bar' ]);
  });

  test('handles stream errors.', async () => {
    await assert.that(async () => {
      await streamToArray(getFailingStream());
    }).is.throwingAsync('some-error');
  });

  test('provides the partially parsed stream in case of an error.', async () => {
    await assert.that(async () => {
      await streamToArray(getStreamThatFailsAfterAWhile());
    }).is.throwingAsync(ex => ex.message === 'some-error' && ex.array.length === 2);
  });
});
