const express = require('express');
const path = require('path');
const app = express();

// Db connection
const { mongoose } = require('./database');

// Settings 
app.set('port', process.env.PORT || 3000);

// Middlewares
app.use(express.json());

// Routes
app.use("/api/itemsSelected" ,require('./routes/routing.js'));
app.use("/api/last7Days" ,require('./routes/last7Days'));
app.use("/api/7to14Days" ,require('./routes/7to14Days'));

// Static Files
app.use(express.static(path.join(__dirname, 'public')));;

// Start the server
app.listen(app.get('port'), () => {
  console.log(`Server on port ${app.get('port')}`);
});