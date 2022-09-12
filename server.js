//DEPENDENCIES
const express = require('express')
const app = express();
require('dotenv').config();
const mongoose = require('mongoose');
const Song = require('./models/song.js')
const methodOverride = require("method-override")

// Database Connection
mongoose.connect(process.env.DATABASE_URL)


//MIDDLEWARE $ BODY PARSER
app.use(express.urlencoded({ extended: true }))
app.use(methodOverride("_method"))


//ROUTES

// Index
app.get('/songs', (req, res) => {
	Song.find({}, (error, allSongs) => {
		res.render('index.ejs', {
			songs: allSongs,
		});
	});
});

// Create
app.post('/songs', (req, res) => {
	if (req.body.completed === 'on') {
		//if checked, req.body.completed is set to 'on'
		req.body.completed = true;
	} else {
		//if not checked, req.body.completed is undefined
		req.body.completed = false;
	}

	Song.create(req.body, (error, createdSong) => {
		res.redirect('/songs');
	});
});

//NEW

app.get('/songs/new', (req, res) => {
	res.render('new.ejs');
});
//DELETE

app.delete("/songs/:id", (req, res) => {
    Song.findByIdAndRemove(req.params.id, (err, data) => {
      res.redirect("/songs")
    })
  })


// Update
app.put("/songs/:id", (req, res) => {
    if (req.body.completed === "on") {
      req.body.completed = true
    } else {
      req.body.completed = false
    }
  
    Song.findByIdAndUpdate(
      req.params.id,
      req.body,
      {
        new: true,
      },
      (error, updatedBook) => {
        res.redirect(`/songs/${req.params.id}`)
      }
    )
  })

//CREATE
app.post('/songs', (req, res) => {
	if (req.body.completed === 'on') {
		//if checked, req.body.completed is set to 'on'
		req.body.completed = true;
	} else {
		//if not checked, req.body.completed is undefined
		req.body.completed = false;
	}

	Song.create(req.body, (error, createdSong) => {
		res.send(createdSong);
	});
});

//EDIT

// Edit
app.get("/songs/:id/edit", (req, res) => {
    Song.findById(req.params.id, (error, foundSong) => {
      res.render("edit.ejs", {
        song: foundSong,
      })
    })
  })
  
//SHOW

app.get('/songs/:id', (req, res) => {
	Song.findById(req.params.id, (err, foundSong) => {
		res.render('show.ejs', {
			song: foundSong,
		});
	});
});
//LISTENERS
// Database Connection Error/Success
// Define callback functions for various events
const db = mongoose.connection
db.on('error', (err) => console.log(err.message + ' is mongo not running?'));
db.on('connected', () => console.log('mongo connected'));
db.on('disconnected', () => console.log('mongo disconnected'));

const PORT = process.env.PORT;
app.listen(PORT, () => {
    console.log(`The server is listening on port: ${PORT}`)
})
