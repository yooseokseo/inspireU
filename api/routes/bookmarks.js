const express = require('express');
const router = express.Router();
const Bookmark = require('../models/bookmark');
const mongoose = require("mongoose");

router.get('/', (req, res, next) =>{
    res.status(200).json({
      message: 'bookmarks were fetched'
    })
});

router.post('/', (req, res, next) =>{
  const bookmark = new Bookmark({
    _id: mongoose.Types.ObjectId(),
    inspirationId: req.body.inspirationId

  });
  bookmark.save()
  .then( reusult => {
    console.log(result);
    res.status(201).json(result);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({
      error:err
    });
  });
});

router.get('/:bookmarkId', (req, res, next) =>{
    res.status(200).json({
      message: 'bookmarks Detail',
      bookMarkId : req.params.bookmarkId
    })
});

router.delete('/:bookmarkId', (req, res, next) =>{
    res.status(200).json({
      message: 'bookmarks were deleted',
      bookMarkId : req.params.bookmarkId
    })
});

module.exports = router;
