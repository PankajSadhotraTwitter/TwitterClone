const express=require('express');
const router = express.Router();
const service = require('../service/user');

router.post('/login',(req,res,next)=>{
    let uemail = req.body.uemail;
    let password = req.body.password;

    return service.loginUser(uemail,password).then(item=>{
        res.json({data:item});
    }).catch(err =>{
        next(err);
    });
});


class UserClass{
    static count=1;
    static getUserId(){
        this.count++;
        return this.count;
    }
}


router.post('/register',async(req,res,next)=>{

    let input = req.body;

    try{
        let id=UserClass.getUserId();
        let userId="U"+id;
        input.userId=userId;
        let userData = {
            "userId":input.userId,
            "uemail":req.body.uemail,
            "password":req.body.password,
            "uname":req.body.uname
        }
        let response = await service.registerUser(userData);
        if(response){
            res.json({"message":`Successfully registered with email id `+req.body.uemail});
        }
    }
    catch(err){
        next(err);
    }
})
router.get('/',async(req,res,next)=>{
    try{
        let data = await service.getAllUsers();
        if(data){
            return data;
        }
    }
    catch(err){
        next(err);
    }
})


router.post('/follow',async(req,res,next)=>{
    let follower = req.body.follower;
    let followed = req.body.followed;

    try{
        let response = await service.follow(follower,followed);
        if(response){
            res.json({"message":`${follower} started following ${followed}`});
        }
    }
    catch(err){
        next(err)
    }
})

// router.post('/toFollow',async(req,res,next)=>{
//     let uemail = req.body.uemail

//     try{
//         let response = await service.toFollow(uemail);
//         if(response){
//             return response
//             // res.json({"message":`${follower} started following ${followed}`});
//         }
//     }
//     catch(err){
//         next(err)
//     }
// })

module.exports = router;