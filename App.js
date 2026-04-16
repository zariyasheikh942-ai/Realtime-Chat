const express = require('express');
const app = express();
// server setup with web socket 
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server);
app.set('view engine', 'ejs');
app.use(express.static('./public'))

// post request midlewares 
app.use(express.json());
app.use(express.urlencoded({extended: true}));
   
// showing page on frontend
app.get('/',(req,res)=>{
res.render('index')
})

// Socket io handlers
io.on('connection',(socket)=>{
    console.log("A socket or a user is attached");
    socket.on("message",(message)=>{
        socket.broadcast.emit('message',message)
    })
    
})


server.listen(3000,()=>{
    console.log("Server is srunning on port 3000");
    
})