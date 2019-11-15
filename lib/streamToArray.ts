import { Readable } from 'stream';
import { StreamToArrayError } from './StreamToArrayError';

const toArray = async function (stream: Readable): Promise<any[]> {
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

export { toArray };
