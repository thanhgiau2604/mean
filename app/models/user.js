var mongoose = require("mongoose");
var schema = mongoose.Schema;
var bcrypt = require("bcrypt-nodejs");

var UserSchema = new schema({
    username:String,
    name: String,
    password: String
});

UserSchema.pre('save',function(next){
    var user = this;
    if (!user.isModified('password')) return next();
    bcrypt.hash(user.password,null,null,(err,hash)=>{
        console.log("Da vao");
        if (err) return next(err);
        user.password = hash;
        console.log(user.password);
        next();
    });
});

UserSchema.methods.comparePassword = function(password) {
    var user = this;
    return bcrypt.compareSync(password,user.password);
};

var users = mongoose.model("users",UserSchema);
module.exports = users;