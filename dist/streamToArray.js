'use strict';

var _interopRequireDefault = require("@babel/runtime/helpers/interopRequireDefault");

var _regenerator = _interopRequireDefault(require("@babel/runtime/regenerator"));

var _asyncToGenerator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncToGenerator"));

var _asyncIterator2 = _interopRequireDefault(require("@babel/runtime/helpers/asyncIterator"));

var streamToArray =
/*#__PURE__*/
function () {
  var _ref = (0, _asyncToGenerator2.default)(
  /*#__PURE__*/
  _regenerator.default.mark(function _callee(stream) {
    var array, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, _value, item;

    return _regenerator.default.wrap(function _callee$(_context) {
      while (1) {
        switch (_context.prev = _context.next) {
          case 0:
            if (stream) {
              _context.next = 2;
              break;
            }

            throw new Error('Stream is missing.');

          case 2:
            array = [];
            _context.prev = 3;
            _iteratorNormalCompletion = true;
            _didIteratorError = false;
            _context.prev = 6;
            _iterator = (0, _asyncIterator2.default)(stream);

          case 8:
            _context.next = 10;
            return _iterator.next();

          case 10:
            _step = _context.sent;
            _iteratorNormalCompletion = _step.done;
            _context.next = 14;
            return _step.value;

          case 14:
            _value = _context.sent;

            if (_iteratorNormalCompletion) {
              _context.next = 21;
              break;
            }

            item = _value;
            array.push(item);

          case 18:
            _iteratorNormalCompletion = true;
            _context.next = 8;
            break;

          case 21:
            _context.next = 27;
            break;

          case 23:
            _context.prev = 23;
            _context.t0 = _context["catch"](6);
            _didIteratorError = true;
            _iteratorError = _context.t0;

          case 27:
            _context.prev = 27;
            _context.prev = 28;

            if (!(!_iteratorNormalCompletion && _iterator.return != null)) {
              _context.next = 32;
              break;
            }

            _context.next = 32;
            return _iterator.return();

          case 32:
            _context.prev = 32;

            if (!_didIteratorError) {
              _context.next = 35;
              break;
            }

            throw _iteratorError;

          case 35:
            return _context.finish(32);

          case 36:
            return _context.finish(27);

          case 37:
            _context.next = 43;
            break;

          case 39:
            _context.prev = 39;
            _context.t1 = _context["catch"](3);
            _context.t1.array = array;
            throw _context.t1;

          case 43:
            return _context.abrupt("return", array);

          case 44:
          case "end":
            return _context.stop();
        }
      }
    }, _callee, null, [[3, 39], [6, 23, 27, 37], [28,, 32, 36]]);
  }));

  return function streamToArray(_x) {
    return _ref.apply(this, arguments);
  };
}();

module.exports = streamToArray;