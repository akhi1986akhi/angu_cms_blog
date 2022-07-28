const mongoose = require('mongoose');
mongoose.connect('mongodb+srv://akhi1986akhi:5ZT2CNDB7K3mPjwY@cluster0.wucuh.mongodb.net/mydb?retryWrites=true&w=majority', {
    useNewUrlParser: true,
    useUnifiedTopology: true
}).then(() => {
    console.log("database connected");
}).catch((e)=>{
    console.log("connection not established");
})

module.exports = mongoose;