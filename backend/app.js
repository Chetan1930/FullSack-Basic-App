const express = require('express');
const http = require('http');
const cors = require('cors');
const cookieParser = require('cookie-parser');
const { Server } = require('socket.io');
const path = require('path');

const connection = require('./db/connection');
const authRoute = require('./routes/authRoute');
const indexx = require('./routes/index');
const { authManage } = require('./middlewares/authmanage');

const app = express();
const server = http.createServer(app);

// ✅ Socket.io with CORS support
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // React app origin
    credentials: true
  }
});

// ✅ Connect to DB
connection();

// ✅ Middlewares
app.use(cookieParser());
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

// ✅ Routes
app.use('/', indexx);
app.use('/api/auth', authRoute);
app.get("/api/user/me", authManage, (req, res) => {
  res.json({ user: req.user });
});

// ✅ Socket.IO chat logic
io.on('connection', (socket) => {
  console.log('A user connected');

  socket.on('chat message', (msg) => {
    io.emit('chat message', msg);
  });

  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});

// ✅ Start server
server.listen(3000, () => {
  console.log('Server running at http://localhost:3000');
});
