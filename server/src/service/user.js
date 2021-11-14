const dblayer = require('../model/user');
let user = {}

user.loginUser= async(uemail,password) => {
    return await dblayer.userLogin(uemail,password).then(response => {
        return response;
    })
}

user.registerUser = async(userObject) =>{
    let data= await dblayer.userRegister(userObject)
    if(data){
        return data;
    }
    else{
        let err= new Error("unable to register");
        err.status=404;
        throw err;
    }
}
user.getAllUsers = async()=>{
    let data = await dblayer.getAllUsers();
    if(data){
        return data;
    }
    else{
        let err = new Error("unable to find users");
        err.status=404;
        throw err;
    }
}

user.follow = async(follower,followed)=>{
    let data = await dblayer.follow(follower,followed)
    if(data){
        return data;
    }
    else{
        let err= new Error("unable to follow");
        err.status=404;
        throw err;
    }
}

module.exports = user;
