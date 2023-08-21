const mongoose = require('mongoose')
module.exports.init=async function(){
    await mongoose.connect('mongodb+srv://klimb:NKFp2LQchxwo50ot@cluster0.rhxqls6.mongodb.net/klimbTable?retryWrites=true&w=majority');
};