import express  from "express";
import mongoose, {Schema} from "mongoose";
import cors from "cors";
import {v4 as uuid} from "uuid";
import ejs from "ejs";


console.log(uuid());
let app = express();
mongoose.connect(
  "mongodb+srv://user:user@cluster0.rhuotn9.mongodb.net/?retryWrites=true&w=majority"
);

app.use(express.static('public'))


app.get("/", async (req, res) => {
  res.render("main");
});

app.get('/id/:sym/:token', (req, res)=>{
  let token = req.params.token;
  res.render("XO")
})

app.use(cors())
app.set('view engine', 'ejs')
let actives = new Schema({
  list: Array
});
let schema = new Schema({
  gameId: String,
  list: Array,
  amountUser: Number,
});
let activesList = []
let db = mongoose.model("db", schema)
let dbActives = mongoose.model("dbActive", actives);




// await db.deleteMany({})


// end point: 
// update/['', '', 'X', 'O']
// save db
// http
// 3s socket - tcp/ip 0.0005

// let aa = {
//   gameId: 5345345345,
//   list: 'list',
// }

app.get("/addUser/:token", (req, res) =>{
  let token = req.params.token
  if(!activesList.includes(token)){
    activesList.push(token)
  }
  dbActives.insertMany([{
    list: activesList
  }])
  res.send({ data: activesList });
})

let lastActivesUsers = [];

app.get("/signal/:token", (req, res) => {
  let token = req.params.token;
  lastActivesUsers.push(token)
  if (lastActivesUsers.length == activesList.length) {
    console.log(11)
    for(let i = 0; i < activesList.length; i++) {
        if(!lastActivesUsers.includes(activesList[i]) ){
          activesList = activesList.filter((item) => item != activesList[i]);
        }
    }
    lastActivesUsers = [];
  }
  res.send({ data: activesList.length });
});

app.get('/createLobby/:code/:token', (req, res) => {
  let code = req.params.code
  let token = req.params.token
  db.insertMany({
    gameId: code,
    list: ['', '', '', '', '', '', '', '', ''],
    amountUser: 1,
  });
  res.send({data: 'success'});
})

// app.get('/id/:token', (req, res) => {
//   let token = req.params.token
//   res.send({data: "success"});
// })

app.get("/getActiveUsers", (req, res) =>{
  res.send({data: activesList.length});
})



app.get("/update/:list/:gameId", async (req, res) => {
  // "['x']" => ['x']
  let list = JSON.parse(req.params.list);
  let gameId = req.params.gameId;
  await db.findOneAndUpdate({ gameId: gameId}, {$set: {list: list}});
  res.send({ data: "ok" });
});

app.get('/new/:gameID', async(req, res) => {
  let gameId = req.params.gameID;
 let games = await db.findOne({ gameId: gameId });
console.log(games);
console.log('hello');
 res.send({data: games.list});

})



app.listen(3005)