const Trade = require('../models/tradeModel')
const csv = require('csvtojson')

const importData = async(req, res) => {
    try {
        
        var tradeData = [];

        csv()
            .fromFile(req.file.path)
            .then(async(csvData) => {
                
                for(let x = 0; x < csvData.length; x++) {

                    const [baseCoin, quoteCoin] = csvData[x].Market.split('/');

                    tradeData.push({
                        userId: parseInt(csvData[x].User_ID),
                        utcTime: new Date(csvData[x].UTC_Time),
                        operation: csvData[x].Operation,
                        market: csvData[x].Market,
                        baseCoin: baseCoin,
                        quoteCoin: quoteCoin,
                        amount: parseFloat(csvData[x]['Buy/Sell Amount']),
                        price: parseFloat(csvData[x].Price)
                    })
                }

                await Trade.insertMany(tradeData);
            })

            res.send({
             status: 200,
             success: true,
             message: "CSV imported..."
        })
    } catch (error) {
        res.send({
            status: 400, success: false, message: error.message
        })
    }
}

const checkBalance = async (req, res) => {
    const { timestamp } = req.body;
    const date = new Date(timestamp);

    try {
        const trades = await Trade.find({ utcTime: { $lte: date } });
        const balances = {};

        trades.forEach(trade => {
            const asset = trade.baseCoin;
            const amount = trade.amount;

            if (!balances[asset]) {
                balances[asset] = 0;
            }

            if (trade.operation === 'Buy') {
                balances[asset] += amount;
            } else if (trade.operation === 'Sell') {
                balances[asset] -= amount;
            }
        });

        res.status(200).json(balances);
        
    } catch (err) {
        res.status(500).send('Error fetching balance');
        console.error(err);
    }
}

module.exports = {importData, checkBalance}