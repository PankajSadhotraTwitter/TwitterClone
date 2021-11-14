const collection = require('../utilities/connection');
const mongoose = require('mongoose');
const {validateEmail} = require('../utilities/validator');
const { path } = require('../app');
let user = {}


user.userLogin = async(uemail,password) =>{
    const userColl = await collection.getCollection();
    
    const data = await userColl.find({"uemail":uemail});
    if(data.length==1){
        if(password==data[0]['password']){
            return data;
        }
        else{
            let err= new Error("The password is incorrect");
            err.status=401;
            throw err;
        }
    }
    else{
        let err = new Error("You are not Registered. Please register first")
        err.status=401;
        throw err;
    }
}


user.userRegister = async(userObject) => {
    validateEmail(userObject.uemail);
    let userColl = await collection.getCollection();
    let existUser = await userColl.find({"uemail":userObject.uemail});
    if(existUser.length==0){
        const data = await userColl.insertMany(userObject);
        if(data){
            return data;
        }
        else{
            let err= new Error("Data not inserted");
            err.status=500;
            throw err;
        }
    }
    else{
        let err= new Error(`User exists with email ${userObject.uemail}`);
        err.status=500;
        throw err;
    }
}

user.getAllUsers = async()=>{
    const userColl = await collection.getCollection();

    let data  = await userColl.find({});
    if(data.length){
        return data;
    }
    else{
        let err= new Error(`No user exists`);
        err.status=500;
        throw err;
    }
}

user.follow = async(follower,followed) =>{

    const userColl = await collection.getCollection();

    let followedUser = await userColl.findOne({"uemail":followed});
    let followingUser = await userColl.findOne({"uemail":follower});

    let data1 = await userColl.updateOne({"uemail":followed},{$push:{"followers":followingUser}}).populate({path:'followers'});

    

    let data2 = await userColl.updateOne({"uemail":follower},{$push:{"following":followedUser}}).populate({path:'following'});;
    if(data2 && data1){
        return data2;
    }
    else{
        let err= new Error("unable to follow");
        err.status=500;
        throw err;
    }
}

// user.toFollow = async(uemail)=>{

//     const userColl = await collection.getCollection();

//     let userlist = await userColl.find().populate({path:'following'});
//     let followingList = await userColl.find({"uemail":uemail},{following:1}).populate({path:'following'});

//     result =[]
//     for(let j=0;j<followingList.length;j++){
//         if(userlist.includes(followingList[j])){
//             continue;
//         }
//         else{
//             result.push(followingList[j].uemail);
//         }
//     }

//     if(result){
//         return result;
//     }
//     else{
//         let err= new Error("unable to find users");
//         err.status=500;
//         throw err;
//     }
// }

module.exports = user;