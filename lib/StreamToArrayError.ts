class StreamToArrayError extends Error {
  public array: any[];

  public constructor (message: string | undefined, array: any[]) {
    super(message);

    this.array = array;
  }
}

export default StreamToArrayError;
