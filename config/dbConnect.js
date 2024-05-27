const mongoose = require('mongoose')

const connectDB = () => {
    return (
        mongoose.connect(process.env.MONGO_URL).then((x) => {
            console.log('Database connected successfully');
        }).catch((e) => {
            console.log(e);
            console.log('Databse not connected');
        })
    )
}

module.exports = connectDB