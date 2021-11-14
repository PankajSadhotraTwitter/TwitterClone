const express=require('express');
const router = express.Router();
const service = require('../service/tweet')

router.get("/",function(req,res,next){
    res.send("Tweet route accessed");
})

router.post('/postTweet',async(req,res,next)=>{
    let tweet=req.body.tweet;
    let uemail = req.body.uemail;

    try{
        let response = await service.postTweet(tweet,uemail);
        if(response){
            res.send(response)
            // res.json({"message":"successfully posted tweet"});
        }
    }
    catch(err){
        next(err);
    }

})

router.post('/feed',async(req,res,next)=>{
	
    let uemail = req.body.uemail;

    try{
        let response = await service.getfeed(uemail);
        if(response){
            // return response
            res.send(response)
        }
    }
    catch(err){
        next(err);
    }
})

module.exports = router;