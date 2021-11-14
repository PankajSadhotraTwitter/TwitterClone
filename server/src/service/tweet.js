const dblayer = require('../model/tweet');
let tweet = {}

tweet.postTweet = async(text,uemail)=>{
    let data = await dblayer.postTweet(text,uemail);

    if(data){
        return data;
    }
    else{
        let err= new Error("unable to post tweet");
        err.status=500;
        throw err;
    }
}

tweet.getfeed = async(uemail)=>{
    let data = await dblayer.getfeed(uemail);
    if(data){
        return data;
    }
    else{
        let err= new Error("unable to load feed in service");
        err.status=500;
        throw err;
    }
}

module.exports = tweet;