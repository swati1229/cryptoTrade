const mongoose = require('mongoose');

const tradeModel = new mongoose.Schema({
    userId: {
        type: Number
    },
    utcTime: {
        type: Date
    },
    operation: {
        type: String
    },
    market: {
        type: String
    },
    baseCoin: {
        type: String
    },
    quoteCoin: {
        type: String
    },
    amount: {
        type: Number
    },
    price: {
        type: Number
    }
})

module.exports = mongoose.model('Trade', tradeModel);