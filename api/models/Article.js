const mongoose=require('mongoose');
const articlesSchema = mongoose.Schema({

    nom : {type:String, required:true},
    prenom : {type:String, required:true},
    fonction : {type:String, required:true},
    etablissement : {type:String, required:true},
    cin :{type:String, required:true},
    badgeNumber :{type:String, required:true},
   
    

});
module.exports =mongoose.model('Article',articlesSchema);

