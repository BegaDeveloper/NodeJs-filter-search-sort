require('dotenv').config();
//async errors
require('express-async-errors');

const express = require('express');
const app = express();

const connectDB = require('./db/connect');
const router = require('./routes/products');

const notFound = require('./middleware/not-found');
const errorMiddleware = require('./middleware/error-handler');

//middleware
app.use(express.json());

//routes
app.get('/', (req, res) => {
  res.send('<h1>Store</h1>');
});

app.use('/api/v1/products', router);

//products rooute

app.use(notFound);
app.use(errorMiddleware);

const port = process.env.PORT || 3000;

const start = async () => {
  try {
    await connectDB(process.env.MONGO_URI);
    app.listen(port, console.log(`Server is listening ${port}`));
  } catch (err) {
    console.log(err);
  }
};

start();
