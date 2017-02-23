'use strict';

const stream = require('stream');

const assert = require('assertthat');

const streamToArray = require('../../lib/streamToArray');

const PassThrough = stream.PassThrough;

const getClosingStream = function () {
  const closingStream = new PassThrough({ objectMode: true });

  process.nextTick(() => {
    closingStream.end();
  });

  return closingStream;
};

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

suite('streamToArray', () => {
  test('is a function.', done => {
    assert.that(streamToArray).is.ofType('function');
    done();
  });

  test('throws an error if stream is missing.', done => {
    assert.that(() => {
      streamToArray();
    }).is.throwing('Stream is missing.');
    done();
  });

  test('throws an error if callback is missing.', done => {
    assert.that(() => {
      streamToArray(getClosingStream());
    }).is.throwing('Callback is missing.');
    done();
  });

  test('converts the stream to an array.', done => {
    streamToArray(getStream(), (err, array) => {
      assert.that(err).is.null();
      assert.that(array).is.equalTo([ 'foo', 'bar' ]);
      done();
    });
  });

  test('also works with closed streams.', done => {
    streamToArray(getClosedStream(), (err, array) => {
      assert.that(err).is.null();
      assert.that(array).is.equalTo([ 'foo', 'bar' ]);
      done();
    });
  });

  test('handles stream errors.', done => {
    streamToArray(getFailingStream(), err => {
      assert.that(err).is.not.null();
      assert.that(err.message).is.equalTo('some-error');
      done();
    });
  });
});
