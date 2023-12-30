const express = require('express')
const bodyParser = require('body-parser')
const app = express()
const fs = require('fs')
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

app.get('/', (req, res, next) => {
    fs.readFile('username.txt', (err, data) => {
        if (err){
            data = 'No chats exists'
            console.log(err)
        }
        res.send(
            `<p>${data}</p><form action="/" method="POST" onSubmit="document.getElementById('username').value = localStorage.getItem('username')">
                <input type="text" placeholder="message" name="message" id="message">
                <input type="hidden" name="username" id="username">
                <br>
                <button type="submit">Send</button>
            </form>`
            );
    })
    
});

app.post('/', (req, res, next) => {
    console.log(req.body.username)
    console.log(req.body.message)
    fs.writeFile("username.txt", `${req.body.username}: ${req.body.message} `, {flag:'a'}, (err) => 
        err ? console.log(err) : res.redirect("/")
    )
});

app.get('/login', (req, res, next) => {
  res.send(`
    <form action="/login" method="POST" onsubmit="event.preventDefault(); localStorage.setItem('username', document.getElementById('username').value); window.location.href='/';">
      <input type="text" name="username" placeholder="Enter a Username" id="username">
      <br>
      <button type="submit">Log In</button>
    </form>
    `)
});


app.listen(3000);