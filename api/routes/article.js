const express = require('express');
const router = express.Router();
const articleController=require('../controllers/articles')
router.get('/', articleController.all); 
router.get('/:id', articleController.get);
router.post('/', articleController.create);
router.put('/:id', articleController.update);
router.delete('/:id', articleController.delete);
module.exports=router;