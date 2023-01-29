require('dotenv').config();
require('./connectDB');
const express = require('express');
const cors = require('cors');
const chalk = require('chalk');

const app = express();
const PORT = process.env.PORT || 5000;
app.use(cors());
app.use(express.json());


app.get('/', (req, res) => {
    res.send('Hello World!');

});

app.use('/users', require('./routes/users'));
app.use('/courses', require('./routes/courses'));

app.listen(PORT, () => {
    console.log(chalk.bold.green(`Listening on http://localhost:${PORT}`));
});
