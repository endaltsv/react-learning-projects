const express = require('express');
const http = require('http');
const { Server } = require('socket.io');
const cors = require('cors');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"]
  }
});

app.use(cors({
  origin: "http://localhost:5173"
}));

const rooms = {}; 

io.on('connection', (socket) => {


  socket.on('joinRoom', () => {
    let roomIdToJoin = null;
    for (const roomId in rooms) {
      if (rooms[roomId].players.length === 1) {
        roomIdToJoin = roomId;
        break;
      }
    }

    if (roomIdToJoin) {
      socket.join(roomIdToJoin);
      rooms[roomIdToJoin].players.push({ id: socket.id, number: null, choose: null });
      socket.emit('joinedRoom', roomIdToJoin);

      if (rooms[roomIdToJoin].players.length === 2) {
        io.to(roomIdToJoin).emit('startGame');
      }
    } else {
      const newRoomId = Date.now().toString();
      socket.join(newRoomId);
      rooms[newRoomId] = { players: [{ id: socket.id, number: null, choose: null }] };
      socket.emit('roomCreated', newRoomId);
    }
  });

  
  socket.on('generateNumber', (roomId) => {
    const room = rooms[roomId];
    if (!room) return;

    const player = room.players.find(p => p.id === socket.id);
    if (!player) return;

    const randomNumber = Math.floor(Math.random() * 10) + 1;
    player.number = randomNumber;

    socket.emit('generatedNumber', randomNumber);
    console.log(`Generated number for player ${socket.id}: ${randomNumber}`);
  });

  
  socket.on('chooseSolution', (roomId, solution) => {
    const room = rooms[roomId];
    if (!room) return;

    const player = room.players.find(p => p.id === socket.id);
    if (!player) return;

    player.choose = solution;
    console.log(`Player ${socket.id} chose ${solution}`);

    
    if (room.players.every(p => p.choose !== null)) {
      const player1 = room.players[0];
      const player2 = room.players[1];

      let result1 = '';
      let result2 = '';

      
      if (player1.choose === 'less' && player1.number < player2.number) {
        result1 = 'Вы правы';
      } else if (player1.choose === 'more' && player1.number > player2.number) {
        result1 = 'Вы правы';
      } else {
        result1 = 'Вы неправы';
      }
      
      if (player2.choose === 'less' && player2.number < player1.number) {
        result2 = 'Вы правы';
      } else if (player2.choose === 'more' && player2.number > player1.number) {
        result2 = 'Вы правы';
      } else {
        result2 = 'Вы неправы';
      }

      console.log(player1.number, player2.number)
     
      io.to(player1.id).emit('result', result1);
      io.to(player2.id).emit('result', result2);

      console.log(`Player ${player1.id} result: ${result1}`);
      console.log(`Player ${player2.id} result: ${result2}`);

      
      room.players.forEach(p => {
        p.choose = null;
        p.number = null;
      });

      
      io.to(roomId).emit('newRound');
    }
  });

  socket.on('leaveRoom', (roomId) => {
    socket.leave(roomId);
    rooms[roomId].players = rooms[roomId].players.filter(player => player.id !== socket.id);
    if (rooms[roomId].players.length === 0) {
      delete rooms[roomId]; 
    }
  });

  socket.on('disconnect', () => {
    console.log('User disconnected');
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
