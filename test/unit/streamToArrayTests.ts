import { assert } from 'assertthat';
import { PassThrough } from 'stream';
import { StreamToArrayError } from '../../lib/StreamToArrayError';
import { toArray } from '../../lib/streamToArray';

const getClosedStream = function (): PassThrough {
  const closedStream = new PassThrough({ objectMode: true });

  closedStream.write('foo');
  closedStream.write('bar');
  closedStream.end();

  return closedStream;
};

const getStream = function (): PassThrough {
  const fakeStream = new PassThrough({ objectMode: true });

  process.nextTick((): void => {
    fakeStream.write('foo');
    fakeStream.write('bar');
    fakeStream.end();
  });

  return fakeStream;
};

const getFailingStream = function (): PassThrough {
  const failingStream = new PassThrough({ objectMode: true });

  process.nextTick((): void => {
    failingStream.emit('error', new Error('some-error'));
  });

  return failingStream;
};

const getStreamThatFailsAfterSomeTime = function (): PassThrough {
  const failingStream = new PassThrough({ objectMode: true });

  process.nextTick((): void => {
    failingStream.write('foo');
    failingStream.write('bar');

    // Delay the stream error to give the client time to handle the already
    // written data.
    setTimeout((): void => {
      failingStream.emit('error', new Error('some-error'));
    }, 100);
  });

  return failingStream;
};

suite('toArray', (): void => {
  test('converts the stream to an array.', async (): Promise<void> => {
    const array = await toArray(getStream());

    assert.that(array).is.equalTo([ 'foo', 'bar' ]);
  });

  test('also works with closed streams.', async (): Promise<void> => {
    const array = await toArray(getClosedStream());

    assert.that(array).is.equalTo([ 'foo', 'bar' ]);
  });

  test('handles stream errors.', async (): Promise<void> => {
    await assert.that(async (): Promise<void> => {
      await toArray(getFailingStream());
    }).is.throwingAsync('some-error');
  });

  test('provides the partially parsed stream in case of an error.', async (): Promise<void> => {
    await assert.that(async (): Promise<void> => {
      await toArray(getStreamThatFailsAfterSomeTime());
    }).is.throwingAsync((ex: Error): boolean => {
      const exCasted = ex as StreamToArrayError;

      return (
        exCasted.message === 'some-error' &&
        exCasted.array.length === 2
      );
    });
  });
});
