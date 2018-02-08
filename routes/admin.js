var express = require('express');
var fileUpload = require('express-fileupload');

var router = express.Router();


router.get('/', function(req, res, next) {
  res.render('admin/index');
});

router.get('/account', function(req, res){
  res.render('admin/account');
});

router.post('/account', function(req, res) {
  // The name of the input field (i.e. "sampleFile") is used to retrieve the uploaded file
   var profilepic = req.files.profilepic;
   // Pour l'instant on nomme toutes les images enregistrées img.jpg, après on pourra utiliser req.session.user._id
   // pour pouvoir renommer l'image en fonction de l'user qui l'a uploadée
   var fileName = 'img';
   // Use the mv() method to place the file somewhere on your server
   profilepic.mv('./public' + '/images/profilepics/' + fileName + '.jpg' , function(err) {
     if(err){
    console.log(err);
     }else{
    res.render('/admin');
    console.log("uploaded");
    }
   });
 });

router.get('/stories/:id', function(req, res, next) {
  res.render('admin/story');
});



module.exports = router;
