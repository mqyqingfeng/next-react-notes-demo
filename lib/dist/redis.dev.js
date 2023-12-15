"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.getAllNotes = getAllNotes;
exports.addNote = addNote;
exports.updateNote = updateNote;
exports.getNote = getNote;
exports.delNote = delNote;
exports["default"] = void 0;

var _ioredis = _interopRequireDefault(require("ioredis"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { "default": obj }; }

var redis = new _ioredis["default"]();
var initialData = {
  "1702459181837": '{"title":"sunt aut","content":"quia et suscipit suscipit recusandae","updateTime":"2023-12-13T09:19:48.837Z"}',
  "1702459182837": '{"title":"qui est","content":"est rerum tempore vitae sequi sint","updateTime":"2023-12-13T09:19:48.837Z"}',
  "1702459188837": '{"title":"ea molestias","content":"et iusto sed quo iure","updateTime":"2023-12-13T09:19:48.837Z"}'
};

function getAllNotes() {
  var data;
  return regeneratorRuntime.async(function getAllNotes$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          _context.next = 2;
          return regeneratorRuntime.awrap(redis.hgetall("notes"));

        case 2:
          data = _context.sent;

          if (!(Object.keys(data).length == 0)) {
            _context.next = 6;
            break;
          }

          _context.next = 6;
          return regeneratorRuntime.awrap(redis.hset("notes", initialData));

        case 6:
          _context.next = 8;
          return regeneratorRuntime.awrap(redis.hgetall("notes"));

        case 8:
          return _context.abrupt("return", _context.sent);

        case 9:
        case "end":
          return _context.stop();
      }
    }
  });
}

function addNote(data) {
  var uuid;
  return regeneratorRuntime.async(function addNote$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          uuid = Date.now().toString();
          _context2.next = 3;
          return regeneratorRuntime.awrap(redis.hset("notes", [uuid], data));

        case 3:
          return _context2.abrupt("return", uuid);

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}

function updateNote(uuid, data) {
  return regeneratorRuntime.async(function updateNote$(_context3) {
    while (1) {
      switch (_context3.prev = _context3.next) {
        case 0:
          _context3.next = 2;
          return regeneratorRuntime.awrap(redis.hset("notes", [uuid], data));

        case 2:
        case "end":
          return _context3.stop();
      }
    }
  });
}

function getNote(uuid) {
  return regeneratorRuntime.async(function getNote$(_context4) {
    while (1) {
      switch (_context4.prev = _context4.next) {
        case 0:
          _context4.t0 = JSON;
          _context4.next = 3;
          return regeneratorRuntime.awrap(redis.hget("notes", uuid));

        case 3:
          _context4.t1 = _context4.sent;
          return _context4.abrupt("return", _context4.t0.parse.call(_context4.t0, _context4.t1));

        case 5:
        case "end":
          return _context4.stop();
      }
    }
  });
}

function delNote(uuid) {
  return regeneratorRuntime.async(function delNote$(_context5) {
    while (1) {
      switch (_context5.prev = _context5.next) {
        case 0:
          return _context5.abrupt("return", redis.hdel("notes", uuid));

        case 1:
        case "end":
          return _context5.stop();
      }
    }
  });
}

var _default = redis;
exports["default"] = _default;