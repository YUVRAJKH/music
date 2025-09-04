import express from "express";
import pg from "pg";
import bodyparser from "body-parser";
import { config } from 'dotenv';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from "url";
import dotenv from 'dotenv';
dotenv.config();


const app= express();
const port = 3000;
app.use(bodyparser.urlencoded({extended: true}));


const db = new pg.Client({
    user: process.env.Db_user,
    host: process.env.Db_host,
    database: process.env.Db_database,
    password: process.env.Db_password,
    port: process.env.Db_port,
})

db.connect();

app.use(express.static("public"));

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);
app.use(express.static(path.join(__dirname, "songs"))); 

config();

app.get("/", (req,res)=> {
    res.render("Spotify.ejs",{ results: [], query: "" });
})
app.get("/Signin", (req,res)=> {
    res.render("Auth/signin.ejs");
})
app.get("/Signup", (req,res)=> {
    res.render("Auth/signup.ejs");
})
app.post("/Signin", async (req,res)=> {
    const {email, password} = req.body;

    try{
        const result = await db.query(`SELECT * FROM users WHERE email = '${email}' AND password = '${password}'`);

        if (result.rows.length === 0){
           return  res.send("user not found")
        }
        const user = result.rows[0];
        res.redirect("/");
    }catch(err){
        console.error("Signin error", err)
    }
})

app.post("/Signup", async (req,res)=> {
  const {username, email,password} = req.body;
  try{
       await db.query("INSERT into users (username, email,password) VALUES ($1,$2,$3)",[username,email,password])
       res.redirect("/");
  }catch(err){
    console.log("error:", err);
  }
})
app.get("/", (req, res) => {
  const query = (req.query.query || "").toLowerCase();
  res.render("Spotify.ejs", { results: null, query: "" });
});
app.get("/search", (req, res) => {
  const query = (req.query.query || "").toLowerCase(); 
  const songsDir = path.join(__dirname, "public", "songs");

  fs.readdir(songsDir, (err, files) => {
    if (err) {
      console.error("Failed to read songs folder:", err);
      return res.render("Spotify.ejs", { results: [], query });
    }

    const matchingSongs = files
      .filter(file => {
        return file.toLowerCase().includes(query) && file.endsWith(".mp3");
      })
      .map(file => {
        return {
          name: file,                      
          path: `/songs/${file}`        
        };
      });
   res.render("Spotify.ejs", { results: matchingSongs, query });
  });
});
app.get("/playlist/:singer", (req, res) => {
  const singer = req.params.singer;
  const folderPath = path.join(__dirname, "public", "songs", singer);
  fs.readdir(folderPath, (err, files) => {
    if (err) return res.status(500).send("Error loading songs");

    res.render("playlist.ejs", {
      songs: files,
      singer: singer
    });
  }); 
});
app.get("/playlist1/:singerName", (req, res) => {
  const singerName = req.params.singerName;

  // Path to singer's folder
  const folderPath = path.join(__dirname, "public", "songs", singerName);

  // Read songs from folder
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).send("Error loading songs");
    }

    // Only mp3 files
    const songs = files.filter(file => file.endsWith(".mp3"));

    // Pass both singer and songs to EJS
    res.render("playlist1.ejs", { singer: singerName, songs });
  });
});

app.get("/playlist2/:singerName", (req, res) => {
  const singerName = req.params.singerName;

  // Path to singer's folder
  const folderPath = path.join(__dirname, "public", "songs", singerName);

  // Read songs from folder
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).send("Error loading songs");
    }

    // Only mp3 files
    const songs = files.filter(file => file.endsWith(".mp3"));

    // Pass both singer and songs to EJS
    res.render("playlist2.ejs", { singer: singerName, songs });
  });
});
app.get("/playlist3/:singerName", (req, res) => {
  const singerName = req.params.singerName;

  // Path to singer's folder
  const folderPath = path.join(__dirname, "public", "songs", singerName);

  // Read songs from folder
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).send("Error loading songs");
    }

    // Only mp3 files
    const songs = files.filter(file => file.endsWith(".mp3"));

    // Pass both singer and songs to EJS
    res.render("playlist3.ejs", { singer: singerName, songs });
  });
});
app.get("/playlist4/:singerName", (req, res) => {
  const singerName = req.params.singerName;

  // Path to singer's folder
  const folderPath = path.join(__dirname, "public", "songs", singerName);

  // Read songs from folder
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).send("Error loading songs");
    }

    // Only mp3 files
    const songs = files.filter(file => file.endsWith(".mp3"));

    // Pass both singer and songs to EJS
    res.render("playlist4.ejs", { singer: singerName, songs });
  });
});
app.get("/playlist5/:singerName", (req, res) => {
  const singerName = req.params.singerName;

  // Path to singer's folder
  const folderPath = path.join(__dirname, "public", "songs", singerName);

  // Read songs from folder
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).send("Error loading songs");
    }

    // Only mp3 files
    const songs = files.filter(file => file.endsWith(".mp3"));

    // Pass both singer and songs to EJS
    res.render("playlist5.ejs", { singer: singerName, songs });
  });
});
app.get("/playlist6/:singerName", (req, res) => {
  const singerName = req.params.singerName;

  // Path to singer's folder
  const folderPath = path.join(__dirname, "public", "songs", singerName);

  // Read songs from folder
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).send("Error loading songs");
    }

    // Only mp3 files
    const songs = files.filter(file => file.endsWith(".mp3"));

    // Pass both singer and songs to EJS
    res.render("playlist6.ejs", { singer: singerName, songs });
  });
});
app.get("/playlist7/:singerName", (req, res) => {
  const singerName = req.params.singerName;

  // Path to singer's folder
  const folderPath = path.join(__dirname, "public", "songs", singerName);

  // Read songs from folder
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).send("Error loading songs");
    }

    // Only mp3 files
    const songs = files.filter(file => file.endsWith(".mp3"));

    // Pass both singer and songs to EJS
    res.render("playlist7.ejs", { singer: singerName, songs });
  });
});
app.get("/playlist8/:singerName", (req, res) => {
  const singerName = req.params.singerName;

  // Path to singer's folder
  const folderPath = path.join(__dirname, "public", "songs", singerName);

  // Read songs from folder
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).send("Error loading songs");
    }

    // Only mp3 files
    const songs = files.filter(file => file.endsWith(".mp3"));

    // Pass both singer and songs to EJS
    res.render("playlist8.ejs", { singer: singerName, songs });
  });
});
app.get("/playlist9/:singerName", (req, res) => {
  const singerName = req.params.singerName;

  // Path to singer's folder
  const folderPath = path.join(__dirname, "public", "songs", singerName);

  // Read songs from folder
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).send("Error loading songs");
    }

    // Only mp3 files
    const songs = files.filter(file => file.endsWith(".mp3"));

    // Pass both singer and songs to EJS
    res.render("playlist9.ejs", { singer: singerName, songs });
  });
});
app.get("/playlist10/:singerName", (req, res) => {
  const singerName = req.params.singerName;

  // Path to singer's folder
  const folderPath = path.join(__dirname, "public", "songs", singerName);

  // Read songs from folder
  fs.readdir(folderPath, (err, files) => {
    if (err) {
      return res.status(500).send("Error loading songs");
    }

    // Only mp3 files
    const songs = files.filter(file => file.endsWith(".mp3"));

    // Pass both singer and songs to EJS
    res.render("playlist10.ejs", { singer: singerName, songs });
  });
});


app.listen(port, ()=> {
  console.log(`Server running on ${port}`)
})
