const express = require('express');
const router = express.Router();
const mongoose = require("mongoose");

const Bookmark = require('../models/bookmark');
const Inspiration = require('../models/inspiration');


router.get('/', (req, res, next) => {
  Bookmark.find()
    .select('_id inspiration')
    .exec()
    .then(docs => {
      res.status(200).json({
        count: docs.length,
        bookmarks: docs.map(doc => {
          return {
            _id: doc._id,
            inspiration: doc.inspiration,
            request: {
              type: 'GET',
              url: 'http://localhost:3000/bookmarks/' + doc._id
            }
          }
        })
      });
    })
    .catch(err => {
      res.status(500).json({
        error: err
      });
    });

});

router.post('/', (req, res, next) => {
  Inspiration.findById(req.body.inspirationId)
    .then(inspiration => {
      if (!inspiration) {
        return res.status(404).json({
          message : "Inspiration not found"
        });
      }
      const bookmark = new Bookmark({
        _id: mongoose.Types.ObjectId(),
        inspiration: req.body.inspirationId

      });
      return bookmark.save()

    })
    .then(result => {
      console.log(result);
      res.status(201).json({
        message: 'Bookmarked',
        createdBookmark: {
          _id: result._id,
          bookmark: result.bookmark
        },
        request: {
          type: 'GET',
          url: 'http://localhost:3000/bookmarks/' + result._id
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      });
    });


});

router.get('/:bookmarkId', (req, res, next) => {
  Bookmark.findById(req.params.bookmarkId)
  .exec()
  .then(bookmark => {
    res.status(200).json({
      bookmark : bookmark,
      request: {
        type:'GET',
        url:'http://localhost:3000/bookmarks'
      }
    });
  })
  .catch(err => {
    res.status(500).json({
      error: err
    });
  });
});

router.delete('/:bookmarkId', (req, res, next) => {
  res.status(200).json({
    message: 'bookmarks were deleted',
    bookMarkId: req.params.bookmarkId
  })
});

module.exports = router;
