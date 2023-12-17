"use strict";
'use server';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.saveNote = saveNote;
exports.deleteNote = deleteNote;

var _navigation = require("next/navigation");

var _redis = require("@/lib/redis");

var _cache = require("next/cache");

function saveNote(noteId, title, body) {
  var data, res;
  return regeneratorRuntime.async(function saveNote$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          data = JSON.stringify({
            title: title,
            content: body,
            updateTime: new Date()
          });

          if (!noteId) {
            _context.next = 7;
            break;
          }

          (0, _redis.updateNote)(noteId, data);
          (0, _cache.revalidatePath)('/', 'layout');
          (0, _navigation.redirect)("/note/".concat(noteId));
          _context.next = 12;
          break;

        case 7:
          _context.next = 9;
          return regeneratorRuntime.awrap((0, _redis.addNote)(data));

        case 9:
          res = _context.sent;
          (0, _cache.revalidatePath)('/', 'layout');
          (0, _navigation.redirect)("/note/".concat(res));

        case 12:
        case "end":
          return _context.stop();
      }
    }
  });
}

function deleteNote(noteId) {
  return regeneratorRuntime.async(function deleteNote$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          (0, _redis.delNote)(noteId);
          (0, _cache.revalidatePath)('/', 'layout');
          (0, _navigation.redirect)('/');

        case 3:
        case "end":
          return _context2.stop();
      }
    }
  });
}