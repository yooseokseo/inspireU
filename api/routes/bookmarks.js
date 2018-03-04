const express = require('express');
const router = express.Router();

router.get('/', (req, res, next) =>{
    res.status(200).json({
      message: 'bookmarks were fetched'
    })
});

router.post('/', (req, res, next) =>{
  const bookmark ={
    inspirationId : req.body.inspirationId
  }
    res.status(201).json({
      message: 'bookmarks were created',
      bookmark : bookmark
    })
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
