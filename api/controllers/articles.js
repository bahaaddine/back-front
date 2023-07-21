const Article=require('../models/Article');



exports.all=('/',(req,res)=>{
    Article.find()
 .then(article=>res.status(200).json(article))
 .catch(err=>res.status(400).json({error:err.message}));
     
});

exports.create = (req, res, next) => {
    const article = new Article({
      ...req.body
    });
    article.save()
      .then(() => res.status(201).json({ message: 'Article created  !'}))
      .catch(error => res.status(400).json({ error }));
  };
  exports.get=('/:id',(req,res,next)=>{
    Article.findOne({_id: req.params.id})
 .then(article=>res.status(200).json(article))
 .catch(err=>res.status(400).json({error:err.message}));
     
});
  
  exports.update=('/:id',(req,res,next)=>{
   
    Article.updateOne({_id: req.params.id},{...req.body, _id: req.params.id})
    .then(article=>res.status(200).json({message:'article updated Seccesfuly'}))
    .catch(err=>res.status(400).json({error:err.message}));
        
   });
   exports.delete=('/:id',(req,res,next)=>{
      
    Article.deleteOne({_id: req.params.id})
       .then(article=>res.status(200).json({message:'car deleted Seccesfuly'}))
       .catch(err=>res.status(400).json({error:err.message}));
           
      });