# streamtoarray

streamtoarray converts streams to arrays.

## Installation

```shell
$ npm install streamtoarray
```

## Quick start

First you need to integrate streamtoarray into your application:

```javascript
const toArray = require('streamtoarray');
```

Then you can call `toArray` with a stream. The stream gets converted and its contents are returned as an array once the stream has ended:

```javascript
const array = await toArray(stream);
```

If the stream emits an `error` event, an exception is thrown, and the partially parsed array is provided as the `array` property of the exception:

```javascript
try {
  const array = await toArray(stream);
} catch (ex) {
  console.log(ex.array);

  // ...
}
```

## Running the build

To build this module use [roboter](https://www.npmjs.com/package/roboter).

```shell
$ npx roboter
```

## License

The MIT License (MIT)
Copyright (c) 2016-2019 the native web.

Permission is hereby granted, free of charge, to any person obtaining a copy of this software and associated documentation files (the "Software"), to deal in the Software without restriction, including without limitation the rights to use, copy, modify, merge, publish, distribute, sublicense, and/or sell copies of the Software, and to permit persons to whom the Software is furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE SOFTWARE.
