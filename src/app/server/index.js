let express = require('express')
let http = require('http')
let cors = require('cors')
let bodyParser = require('body-parser')
let mongoose = require('mongoose')
let dotenv = require('dotenv')
dotenv.config()

mongoose.connect(process.env.MONGO, { useNewUrlParser: true, useUnifiedTopology: true}, function(err) {
    if (!err) console.log("DB Connected")
    else console.log(err)
})
let Schema = mongoose.Schema;
let ObjectId = mongoose.ObjectId;
let UserSchema = new Schema({
    id: ObjectId,
    Email: String,
    Password: String
})
let Users = mongoose.model('Users', UserSchema)

let app = express()
app.use(cors())
app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.get('/api/get', cors(), async function(req, res) {
    await Users.find({}, function(err, data) {
        if (!err) res.json(data)
        else console.log(err)
    })
})
app.post('/api/post', cors(), async function(req, res) {
    let newUser = new Users(req.body)
    await Users.create(newUser)
    if (!req.body) {
        console.log("Unsucessful")
    }
})
app.put('/api/update', cors(), async function(req, res) {
    Users.findByIdAndUpdate(req.params.id, function(err, data) {
        if (!err) console.log(data)
        else console.log(err)
    })
})
app.delete('/api/delete/:_id', cors(), function(req, res) {
    Users.findByIdAndDelete(req.body.id)
})
http.createServer(app).listen(process.env.PORT, function(err) {
    if (!err) console.log("Server Started on Port " + process.env.PORT)
})