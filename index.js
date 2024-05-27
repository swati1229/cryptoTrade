const express = require('express');
const connectDB = require('./config/dbConnect');
const app = express();
require('dotenv').config();
const cors = require('cors')
const tradeRoutes = require('./routes/tradeRoutes')

PORT = process.env.PORT || 5000

app.use(cors())
app.use(express.json())

//connecting database
connectDB();

//routes
app.use('/trade', tradeRoutes)

//rest API
app.get('/', (req, res) => {
    res.send('Hello...')
})

app.listen(PORT, () => {
    console.log(`Server is listening at port ${PORT}`);
})