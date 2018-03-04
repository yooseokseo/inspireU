const express = require('express');
const router = express.Router();
const Inspiration = require('../models/inspiration');
const mongoose = require("mongoose");

//show inspirations
router.get('/', (req, res, next) =>{
  Inspiration.find()
    .exec()
    .then(docs =>{
      console.log(docs);
      res.status(200).json(docs);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
});

//create inspiration
router.post('/', (req, res, next) =>{
  const inspiration = new Inspiration({
    _id: new mongoose.Types.ObjectId(),
    title : req.body.title,
    caption : req.body.caption,
    description : req.body.description,
    category: req.body.category,
    mediaType: req.body.mediaType
  });
  inspiration.save().then(result =>{
    console.log(result);
    res.status(201).json({
      message: 'inspirations were created',
      createdInspiration: result
    })
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  });

});

//show specific inspiration by Id
router.get('/:inspirationId', (req, res, next) =>{
  const id = req.params.inspirationId;
  Inspiration.findById(id).exec()
    .then(doc => {
      console.log(doc);
      if (doc){
        res.status(200).json(doc);
      }
      else {
        res.status(404).json({message: 'No valid entry found for provided ID'});
      }

  }).catch(err => {
    console.log(err);
    res.status(500).json({error:err});
  });
});

//update specific inspiration by Id
router.patch('/:inspirationId', (req, res, next) =>{
  const id = req.params.inspirationId;
  const updatedOps = {};
  for (const ops of req.body){
    updatedOps[ops.propName] = ops.value;
  }
  Inspiration.update({_id: id}, {$set: updatedOps})
  .exec()
  .then(result => {
    res.status(200).json(result);
  })
  .catch(err => {
    console.log(err);
    res.status(500).json({error:err});
  });

});

//delete specific inspiration by Id
router.delete('/:inspirationId', (req, res, next) =>{
  const id = req.params.inspirationId;
    Inspiration.remove({_id: id})
    .exec()
    .then(result => {
      res.status(200).json(result);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error:err});
    });

});


module.exports = router;
