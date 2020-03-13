const mongoose = require('mongoose');
const { Schema } = mongoose;
//const Schema = mognoose.Schema;
const userSchema = new Schema({
    googleId : String,
    googleName : String,
});

mongoose.model('users', userSchema);
