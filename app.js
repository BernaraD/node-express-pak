const express = require('express');
const logger = require('morgan');

const app = express();

const PORT = 8000;


// Hey app, I want you to be capable of reading JSON data
app.use(express.json())

// because of the below line our server knows how to read data from forms (firstName, lastName, Address etc)
app.use(express.urlencoded({extended: false}));

//to see more info in terminal about our requests (how much time it took, is server running? ETC)
app.use(logger("dev"));

//Dummy data
let playerData = [
    {id: 1, name: 'Kobe', team: 'lakers', points: 50},
    {id: 1, name: 'Shaq', team: 'Magic', points: 100}
]

app.get('/', (req, res) => {
    res.json({
        message: 'success',
        payload: playerData
    });
})

app.get('/get-player-by-id/:id', (req, res) => {
    const id = req.params.id;

    let foundPlayer = null;

    playerData.forEach((item) => {
        if (item.id === +id) {
            foundPlayer = item;
        }
    });

    if (!foundPlayer) {
        res.status(404)
            .json({message: "failure", payload: "Sorry, player not found"})
    } else {
        res.json({message: "success", payload: foundPlayer})
    }

})

app.get('/', (req, res) => {
    res
        .status(200)
        .send('Home Page')
});

app.get('/about', (req, res) => {
    res
        .status(200)
        .send('About Page')
});


app.post('/', (req, res) => {
    console.log(req.body)

    res.json({
        message: 'success',
        payload: req.body
    })
});

app.post('/create-team', (req, res) => {
    console.log(req.body)

    res.json({
        message: 'success',
        payload: req.body
    })
})


// WILD CARD
app.get('*', (req, res) => {
    res
        .status(404)
        .send('Sorry, the page you are looking for does not exist. Please try again later.')
})
// END OF WILD CARD


app.listen(PORT, () => {
    console.log(`Server is running on ${PORT} port`)
})