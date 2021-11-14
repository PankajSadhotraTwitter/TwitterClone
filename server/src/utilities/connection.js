const {Schema} = require('mongoose');
const mongoose = require('mongoose');

mongoose.Promise = global.Promise;
const url="mongodb://localhost:27017/twitterDB";

const userSchema = Schema({
    userId:{
        type:String,
        trim:true,
        require:[true,'userId is requird']
    },
    uemail:{
        type:String,
        require:[true,'uemail is required'],
    },
    password:{
        type:String,
        require:[true,"password is required"]
    },
    uname:String,
    followers:[{type:Schema.Types.ObjectId,ref:'User'}],
    following:[{type:Schema.Types.ObjectId,ref:'User'}]
},{collection:"User",timestamp:true});


const tweetSchema = Schema({
	tweet: {
		type: String,
		required: true,
		trim: true
	},
	created: {
		type: Date,
		default: Date.now
	},
	author: {
		type: mongoose.Schema.ObjectId,
		ref: 'User'
	}
},{collection:"Tweet",timestamp:true});

let connection={}

connection.getCollection=async()=>{
    return await mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(database=>{
        return database.model('User',userSchema)
    }).catch(erro => {
        let err= new Error("Could not connect to database");
        err.status=500;
        throw err;
    });
}

connection.getTweetCollection=async()=>{
    return await mongoose.connect(url,{useNewUrlParser:true,useUnifiedTopology:true}).then(database=>{
        return database.model('Tweet',tweetSchema)
    }).catch(erro => {
        let err= new Error("Could not connect to database");
        err.status=500;
        throw err;
    });
}

module.exports=connection;