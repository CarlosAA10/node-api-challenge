const express = require('express'); 

const server = express(); 

const projectRouter = require('./url-routers/projectsRouter'); 
const actionsRouter = require('./url-routers/actionsRouter'); 

server.use(express.json()); 

server.use('/api/projects', projectRouter); 
server.use('/api/actions', actionsRouter); 

server.get('/', (req,res) => {
    res.send(`<h2> Let's Build This Thang Baby!`); 
}); 

module.exports = server; 