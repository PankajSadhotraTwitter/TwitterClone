const collection = require('../utilities/connection');
const mongoose = require('mongoose');
let user = {}


user.userLogin = async(uemail,password) =>{
    const userColl = await collection.getCollection();

    const data = await userColl.find({"uemail":uemail});

    if(data.length ===1){
        if(password==data[0]['password']){
            console.log("login success");
            return DataTransferItem;
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

module.exports = user;