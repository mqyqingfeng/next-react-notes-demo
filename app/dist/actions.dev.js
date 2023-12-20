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

function saveNote(formData) {
  var noteId, data, res;
  return regeneratorRuntime.async(function saveNote$(_context) {
    while (1) {
      switch (_context.prev = _context.next) {
        case 0:
          noteId = formData.get('noteId');
          data = JSON.stringify({
            title: formData.get('title'),
            content: formData.get('body'),
            updateTime: new Date()
          });

          if (!noteId) {
            _context.next = 8;
            break;
          }

          (0, _redis.updateNote)(noteId, data);
          (0, _cache.revalidatePath)('/', 'layout');
          (0, _navigation.redirect)("/note/".concat(noteId));
          _context.next = 13;
          break;

        case 8:
          _context.next = 10;
          return regeneratorRuntime.awrap((0, _redis.addNote)(data));

        case 10:
          res = _context.sent;
          (0, _cache.revalidatePath)('/', 'layout');
          (0, _navigation.redirect)("/note/".concat(res));

        case 13:
        case "end":
          return _context.stop();
      }
    }
  });
}

function deleteNote(formData) {
  var noteId;
  return regeneratorRuntime.async(function deleteNote$(_context2) {
    while (1) {
      switch (_context2.prev = _context2.next) {
        case 0:
          noteId = formData.get('noteId');
          (0, _redis.delNote)(noteId);
          (0, _cache.revalidatePath)('/', 'layout');
          (0, _navigation.redirect)('/');

        case 4:
        case "end":
          return _context2.stop();
      }
    }
  });
}