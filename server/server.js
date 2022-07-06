const express = require('express');
const { readdirSync } = require('fs');
const mongoose = require('mongoose');
const morgan = require('morgan');
const helmet = require('helmet');
const bodyParser = require('body-parser');
const cors = require('cors');
require('dotenv').config();

// PORT
const PORT = process.env.PORT || 8000;

// CONNECTING TO DATABASE
mongoose
  .connect(process.env.DB_CONNECTION_URL, {
    useNewUrlParser: true,
    // useFindAndModify: false,
    useUnifiedTopology: true,
    // useCreateIndex: false,
    dbName: process.env.DB_NAME,
  })
  .then(() => console.log('db connected 😁'))
  .catch(e => console.log('error connecting db 😐', e));

//EXPRESS APP
const app = express();

//APPLYING MIDDLEWARES
app.use(morgan('dev'));
app.use(helmet());
app.use(cors());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.json());

//ROUTES
readdirSync('./routes').map(r =>
  app.use(`/api/${r.split('.')[0]}`, require(`./routes/${r}`))
);

// STARTING THE SERVER
app.listen(PORT, () => {
  console.log(`🚀 Server ready at http://localhost:${PORT}`);
});
