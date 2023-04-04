const express = require('express');
const app = express();
const cors = require('cors');
const PORT = process.env.PORT || 5000;
const coinMarkets = require('./routes/coinMarkets');
const { urlencoded } = require('express');

app.use(cors({
    origin: "http://localhost:3000",
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use('/coins', coinMarkets)



app.listen(PORT, ()=>{
    console.log("Server has started")
})
