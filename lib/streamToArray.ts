import { Readable } from 'stream';
import StreamToArrayError from './StreamToArrayError';

const streamToArray = async function (stream: Readable): Promise<any[]> {
  if (!stream) {
    throw new Error('Stream is missing.');
  }

  const array = [];

  try {
    for await (const item of stream) {
      array.push(item);
    }
  } catch (ex) {
    const error = new StreamToArrayError(ex.message, array);

    throw error;
  }

  return array;
};

export default streamToArray;
