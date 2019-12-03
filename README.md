# streamtoarray

streamtoarray converts streams to arrays.

## Status

| Category         | Status                                                                                                     |
| ---------------- | ---------------------------------------------------------------------------------------------------------- |
| Version          | [![npm](https://img.shields.io/npm/v/streamtoarray)](https://www.npmjs.com/package/streamtoarray)          |
| Dependencies     | ![David](https://img.shields.io/david/thenativeweb/streamtoarray)                                          |
| Dev dependencies | ![David](https://img.shields.io/david/dev/thenativeweb/streamtoarray)                                      |
| Build            | ![GitHub Actions](https://github.com/thenativeweb/streamtoarray/workflows/Release/badge.svg?branch=master) |
| License          | ![GitHub](https://img.shields.io/github/license/thenativeweb/streamtoarray)                                |

## Installation

```shell
$ npm install streamtoarray
```

## Quick start

First you need to integrate streamtoarray into your application:

```javascript
const { toArray } = require('streamtoarray');
```

If you use TypeScript, use the following code instead:

```typescript
import { toArray } from 'streamtoarray';
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
