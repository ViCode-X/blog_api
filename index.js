
require('dotenv').config();
const express = require('express');
const cors = require('cors');
const connectDB = require('./database/connectDB.js');
const RequestLogger = require('./middlewares/logger.js');
const errorhandler = require('./middlewares/errorHandler.js');

const ArticleRoutes = require('./routes/article.route.js');
const UserRoutes = require('./routes/user.route.js');

const app = express();
const PORT = process.env.PORT;
app.use(RequestLogger);
app.use(express.json());
app.use(cors('*'));
app.use(errorhandler);
app.use('/api/v1/', ArticleRoutes);
app .use('/api/v1/users', UserRoutes);


connectDB();



app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});