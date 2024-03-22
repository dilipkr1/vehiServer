require('dotenv').config()
const express = require('express');
const cookiParser = require("cookie-parser")

const app = express();
const cors = require('cors');


app.use(cors({
  origin: '*',
  credentials: true
}));

app.use(cookiParser())


const authRoute = require('./Routes/authroutes')
const customerRoute = require('./Routes/custmrRoute')
const settingBusData = require('./Routes/settingBusRoutes')
const walletTranscation = require("./Routes/walletTranRoutes")
const packages = require('./Routes/packageRoutes')
const order = require('./Routes/orderRoutes')
const messages = require('./Routes/messageRoutes')
const familyNumber = require('./Routes/userContactRoutes')

const PORT = process.env.PORT;
const url = process.env.MONGO_URL;

const mongoose = require('mongoose');
mongoose.connect(url, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
  .then(() => {
    console.log("Connected to MongoDB");
  })
  .catch((error) => {
    console.error("MongoDB connection error:", error);
  });

const bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());


app.use('/api/auth', authRoute);
app.use('/api/customer', customerRoute);
app.use('/api/settings', settingBusData);
app.use('/api/wallet', walletTranscation);
app.use('/api/packages', packages)
app.use('/api/orders', order)
app.use('/api/messages', messages)
app.use('/api/contacts', familyNumber)

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
