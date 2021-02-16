const express = require('express');
const cors    = require('cors');
const path    = require('path');


require('dotenv').config();

const app  = express();
const port = process.env.PORT || 5000;


app.use(cors());
app.use(express.json());

// declare routers
const gamesRouter  = require('./routes/games');
const mailerRouter = require('./routes/mailer');

// include routers in application
app.use('/games', gamesRouter);
app.use('/mailer', mailerRouter);


// Express will serve up production assets i.e. main.js # test
app.use(express.static(__dirname + '/client'));

// If Express doesn't recognize route serve index.html
app.get('*', (req, res) => {
    res.sendFile(
        path.resolve(__dirname, 'client', 'index.html')
    );
});


app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});

// killall -9 node
// Run the client and server: -- npm run dev --
// Make this server available in dev by using: -- ngrok http 5000 --
