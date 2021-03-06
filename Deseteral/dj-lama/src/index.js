const path = require('path');
const Server = require('http').Server;
const express = require('express');
const socket = require('socket.io');

import { DiscordBot } from './discord-bot';
import { Database } from './database';
import * as help from './help-content';

const HTTP_PORT = 8000;

var app = express();
var server = Server(app);
var io = socket(server);

var database = null;
var bot = null;

var commands = {
  yt: (song) => {
    io.emit('play', song);
  },

  song: () => {
    io.emit('song');
  },

  skip: () => {
    io.emit('skip');
  },

  add: (song) => {
    database.add(song);
  },

  play: (song) => {
    if (song !== null) {
      io.emit('play', song);
    }
  },

  say: (what) => {
    io.emit('say', what);
  },

  list: () => {
    let songList = '';

    for (let i = 0; i < database.library.length; i++) {
      let song = database.library[i];
      songList += `\`${song.artist} - ${song.title}\`\n`;
    }

    bot.sendMessage(songList);
  },

  random: () => {
    let randomIndex = Math.floor(Math.random() * database.library.length);
    let song = database.library[randomIndex];

    commands.play(song);
  }
};

// HTTP server initialization
app.use('/', express.static(path.join(__dirname, 'static')));
server.listen(HTTP_PORT, () => {
  console.log('Started HTTP server');
});

// socket.io initialization
io.on('connection', (socket) => {
  console.log('New socket connection');

  socket.on('current-song', (id) => {
    bot.sendMessage(`https://www.youtube.com/watch?v=${id}`);
  });

  // Client socket
  socket.on('client-yt', (info) => {
    io.emit('play', info);
  });
});

// Database initialization
database = new Database();
database.load();

// Discord bot initialization
bot = new DiscordBot();
bot.initialize();
bot.events.on('command', (args) => {
  parseCommand(args);
});

function parseCommand(args) {
  // TODO: Add checking whether args exist
  // TODO: Add documentation

  if (args[0] === undefined) {
    return;
  }

  // Trim all of the arguments
  for (let i = 0; i < args.length; i++) {
    args[i] = args[i].trim();
  }

  switch (args[0].toLowerCase()) {
    // Chat bot only command
    case 'help':
      bot.sendMessage(help.content);
      break;

    // Chat bot only command
    case 'song':
      commands.song();
      break;

    // Chat bot only command
    case 'list':
      commands.list();
      break;

    case 'yt': {
      if (args[1] === undefined) {
        return;
      }

      let song = {
        id: args[1],
        start: typeof args[2] !== 'undefined' ? args[2] : undefined,
        end: typeof args[3] !== 'undefined' ? args[3] : undefined
      };

      commands.yt(song);
    } break;

    case 'skip':
      commands.skip();
      break;

    case 'add': {
      args.shift();
      args = args.join(' ').split('|');

      // Make sure args fulfill the requirement of having at least id, artist
      // and title.
      if (args.length < 3) {
        return;
      }

      // Trim all of the arguments
      for (let i = 0; i < args.length; i++) {
        args[i] = args[i].trim();
      }

      let song = {
        id: args[0],
        artist: args[1].toLowerCase(),
        title: args[2].toLowerCase(),
        start: typeof args[3] !== 'undefined' ? args[3] : undefined,
        end: typeof args[4] !== 'undefined' ? args[4] : undefined,
      };

      commands.add(song);
    } break;

    case 'play': {
      args.shift();
      if (args.length === 0) {
        return;
      }

      args = args.join(' ').toLowerCase();
      commands.play(database.getByTitle(args));
    }
      break;

    case 'say': {
      args.shift();
      if (args.length === 0) {
        return;
      }

      args = args.join(' ');

      commands.say(args);
    } break;

    case 'random':
      commands.random();
      break;
  }
}
