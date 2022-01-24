const express=require("express");
const app=express();
const authroute=require('./routes/auth');
const dotenv=require('dotenv');
const mongoose=require('mongoose');
const postroute=require('./routes/post');
dotenv.config();
const connectDB = async () => {
    mongoose.connect(process.env.DB_CONNECT, {
            useUnifiedTopology: true,
        })
        .then((data) => console.log(`Connected Successfully ${data.connection.host}`))
        .catch((err) => console.error('Not Connected', err.message));
}
connectDB()
app.use(express.json());
app.use('/api/user',authroute);
app.use('/api/posts',postroute);

const port=8080;
app.listen(port,() => {
console.log(`a jwtauth port: ${port}`)
});