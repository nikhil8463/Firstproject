const  express = require('express')
const mongoose = require('mongoose')
const app = express()
const bodyparser = require('body-parser')
const UserRoutes = require('./routes/api/userroutes')
const ProfileRoutes = require('./routes/api/profileroute')
const PostRoutes = require('./routes/api/postroutes')


//bodyparser

app.use(bodyparser.urlencoded({extended:false}));
app.use(bodyparser.json());

//mongo connection
mongoose.connect("mongodb+srv://nick:mh05dw8463@project.yqg3z.mongodb.net/test?retryWrites=true&w=majority",
{
    useNewUrlParser:true,
    useUnifiedTopology: true
})
.then(() => console.log('mongodb connected') )
.catch(err => console.log(err));

//use routes
app.use('/api/user',UserRoutes)
app.use('/api/profile',ProfileRoutes)
app.use('/api/post',PostRoutes)


app.use((req,res) => {
    res.status(200).json({
        message:'IT WORKS'
    });
})



module.exports = app;