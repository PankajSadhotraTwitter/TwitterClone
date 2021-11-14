let validator={};

validator.validateEmail = function(email){
    let pattern = new RegExp("[A-Za-z][A-Za-z0-9]+@[a-zA-Z]+[.](com)$")
    if(!pattern.test(email)){
        let err=new Error("EmailId is Invalid");

        err.status=406;
        throw err;
    }
}

module.exports = validator