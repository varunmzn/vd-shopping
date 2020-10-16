const express = require('express');
const router = express.Router();
const multer = require('multer');
const Ad = require('./../models/postAd');
const storage = multer.diskStorage({
  destination : function(req,file,cb){
    cb(null,'./uploads/');
  },
  filename : function(req,file,cb){
    cb(null, file.originalname)
    
  }
})
const upload = multer({ storage });
//Post an AD
router.route('/submitad').post(
  upload.single('image'),
  
  function (req, res) {
    console.log(req.file)
    console.log(req.body)
    const Ads = new Ad({
      title:req.body.adTitle,
      category:req.body.category,
      model:req.body.model,
      condition:req.body.condition,
      price:req.body.price,
      description:req.body.adDescription,
      uploader:req.body.user,
      image:req.file.path,
      sellerName:req.body.sellerName,
      itemCity:req.body.itemCity,
      sellerPhoneNumber:req.body.sellerPhoneNumber
     });
     Ads.save()
     .then(ads => 
      {
       res.json(ads)
       console.log(ads)
      })
      .catch(err => 
      {
      res.status(500).json({error: err});
       }); 
  }
)

//Load an ad
router.route('/getAllAds').get(function (req, res) {
    
     Ad.find(function (err, data){
      if(err){
        console.log(err);
      }
      else {
        res.status(200).send(data)
      }
    });
  })

  
//categories count
  router.route('/getCategoriesCounts').get(function (req, res) {
      Ad.aggregate([{
        $group: {
          _id: "$category",
          count: {$sum: 1}
        }
      }])
        .then(catCounts => {
          res.json(catCounts);
        }).catch(error => {
          res.send(error);
        }
      )
    })


    //totaladscount
    
    router.route('/getAllAdsCounts').get(function(req, res) {
      Ad.estimatedDocumentCount() 
        .then(count => {
          res.json(count);
        })
        .catch(err => {
          res.send(err);
        })
      }
    )

    //filter ads
  router.route('/filterAds').get(function (req, res) {
     
    console.log(req.query.filters)
    Ad.find(JSON.parse(req.query.filters))
    
     .then(adscategory => {
  
        res.send(adscategory);
      
        console.log(adscategory)
      }).catch(error => {
        res.send(error);
        console.log("Error")
      });
  }
);

    //search ads
    router.route('/searchAdsListings').get(function(req,res){
      
      var searchRegex = new RegExp(JSON.parse(req.query.searchQuery), 'i');
       console.log(searchRegex)
       Ad.find().or(
                    [{ 'title': { $regex: searchRegex } }
                    ,{ 'description': { $regex: searchRegex } }])
      .then(searchads => {
        res.json(searchads);
        console.log(searchads)
      }).catch(error => {
        res.send(error);
      })
    });
      
  //getadbyid

  router.route('./getAdByIds').get(function(req,res){
    
       Ad.findById(adIdFilter)
        .then((adsId)=>{
          res.json(adsId)
          console.log(adsId)
        })
        .catch((err)=>{
         console.log(err)
        }
      )
        
  })

  


module.exports = router;

