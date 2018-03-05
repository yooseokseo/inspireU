const express = require('express');
const router = express.Router();
const Inspiration = require('../models/inspiration');
const mongoose = require("mongoose");

//show all inspirations
router.get('/', (req, res, next) =>{
  Inspiration.find()
    // what kind of attr want to fetch?
    .select('title caption category mediaType _id')
    .exec()
    .then(docs =>{
      const response = {
        count: docs.length,
        inspirations: docs.map(doc =>{
          return {
            titie : doc.title,
            caption : doc.caption,
            category: doc.category,
            mediaType: doc.mediaType,
            _id : doc._id,
            request: {
              type: 'GET',
              url: 'http://localhost:3000/inspirations/' + doc._id
            }
          }
        })
      };
      res.status(200).json(response);
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({
        error: err
      })
    });
});

//create an inspiration
router.post('/', (req, res, next) =>{
  const inspiration = new Inspiration({
    _id: new mongoose.Types.ObjectId(),
    title : req.body.title,
    caption : req.body.caption,
    description : req.body.description,
    category: req.body.category,
    mediaType: req.body.mediaType
  });
  inspiration.save()
  .then(result =>{
    console.log(result);
    res.status(201).json({
      message: 'Created inspiration successfully',
      createdInspiration: {
        title : result.title,
        caption : result.caption,
        description : result.description,
        category: result.category,
        mediaType: result.mediaType,
        request:{
          type: 'GET',
          url: 'http://localhost:3000/inspirations/' + result._id
        }
      }
    })
  }).catch(err => {
    console.log(err);
    res.status(500).json({
      error: err
    })
  });

});

//show a specific inspiration by Id
router.get('/:inspirationId', (req, res, next) =>{
  const id = req.params.inspirationId;
  Inspiration.findById(id)
    .select('title caption description category mediaType _id')
    .exec()
    .then(doc => {
      console.log(doc);
      if (doc){
        res.status(200).json({
          inspiration: doc,
          request:{
            type: 'GET',
            description: 'Show All Inspirations',
            url: 'http://localhost:3000/inspirations'
          }
        });
      }
      else {
        res.status(404).json({message: 'No valid entry found for provided ID'});
      }

  }).catch(err => {
    console.log(err);
    res.status(500).json({error:err});
  });
});

//update a specific inspiration by Id
router.patch('/:inspirationId', (req, res, next) =>{
  const id = req.params.inspirationId;
  const updatedOps = {};
  for (const ops of req.body){
    updatedOps[ops.propName] = ops.value;
  }
  Inspiration.update({_id: id}, {$set: updatedOps})
  .exec()
  .then(result => {
    res.status(200).json({
      message: 'Inspiration updated',
      request: {
        type:'GET',
        url:'http://localhost:3000/inspirations/' + id
      }
    });
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
      res.status(200).json({
        message: 'Inspiration deleted',
        request: {
          type: 'POST',
          url: 'http://localhost:3000/inspirations',
          body: {
            title : 'String',
            caption : 'String',
            description :'String',
            category: 'String',
            mediaType:  'String'
          }
        }
      });
    })
    .catch(err => {
      console.log(err);
      res.status(500).json({error:err});
    });

});


module.exports = router;
