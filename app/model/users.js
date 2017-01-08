/**
 * Created by phong on 1/8/17.
 */

var mongoose = require('mongoose'),
    Schema = mongoose.Schema,
    collection = 'users';
var userSchema = new Schema({
    email :{
        type : String,
        unique: true,
        required : true
    },
    password:{
        type:String,
        required:true
    },
    api_key:{
        type : String,
        unique:true,
        required:true
    },
    name :{
        type: String,
        required:true
    },
    created_date:{
        type : Number,
        required:true
    },
    updated_date:{
        type:Number,
        required: true
    }

});



userSchema.methods.signup = function (cb) {
    this.save(function (err,result) {
        if(err){
            return cb(true,result,'Sign up is failed');
        }else{
            return cb(false,result,'Sign up is successful');
        }

    });
};


userSchema.methods.signin = function (cb) {
    this.model(collection).find({email : this.email}).exec(function (err,result) {
        if(err){
            return cb(true,null);
        }else{
            if(result.length > 0){
                return cb(false,result[0]);
            }else{
                return cb(true,null);
            }
        }

    });

};

module.exports = mongoose.model(collection,userSchema);