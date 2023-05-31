const express = require('express');
const app = express();
const port = process.env.PORT || 4001;
const { connect } = require('./config/mongoConnection');

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.get('/', (_, res) => res.json(`Hello to User's World!`));

app.use('/users', require('./routes/userRoute'));

connect().then(() => {
  app.listen(port, () => {
    console.log(`USERS: Listening from port ${port}`);
  });
});
