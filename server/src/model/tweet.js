const collection = require('../utilities/connection');
const mongoose = require('mongoose');
const { path } = require('../app');

let tweet ={}

tweet.postTweet = async(text,uemail)=>{

	const tweetColl =await collection.getTweetCollection();
	const userColl = await collection.getCollection();
    
    const authordata = await userColl.findOne({"uemail":uemail});
	let obj = {
		tweet:text,
		created:Date.now(),
		author:authordata
	}
	let data = await tweetColl.insertMany(obj);
	tweetColl.find({"author":authordata}).populate({path:'author'});

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

	const tweetColl =await collection.getTweetCollection();

	const userColl = await collection.getCollection();
 
	let result = [];
	let user = await userColl.find({"uemail":uemail});
	if(user){
		result.push(await tweetColl.find({"author":user}).sort({'created':'-1'}).populate({path:'author'}));
		let following = user[0]["following"];
		if(following.length){
			for(let i=0;i<following.length;i++){
				result.push(await tweetColl.find({"author":following[i]}).sort({'created':'-1'}).populate({path:'author'}));
			}
			return result;
		}
		else if(result.length){
			return result;
		}
		else{
			let err= new Error("You are not follwing any user on Twitter");
			err.status=500;
			throw err;
		}
	}
	else{
		let err= new Error("There is a problem with your account");
			err.status=500;
			throw err;
	}
	
}


module.exports = tweet;