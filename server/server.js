const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const port = 3004;

require('../database');
const Game = require('../database/Game');


const server = express();

server.use(morgan('dev'));
server.use(bodyParser.json());
server.use(express.static(path.join(__dirname, '../client/dist')));

server.get('/api/games/one', (req, res) => {
  var index = Math.floor(Math.random() * 43);
  Game.findOne({sku: index})
  .then((game) => {
    res.send(game);
  })
  .catch((err) => {
    console.error(err);
  })

});

server.get('/api/games/:sku/oneBySku', (req, res) => {
  var sku = Number(req.params.sku);

  Game.findOne({sku: sku})
  .then((game) => {
    res.send(game);
  })
  .catch((err) => {
    console.error(err);
  })

});

server.get('/api/games/:sku/similar', (req, res) => {
  var sku = Number(req.params.sku);

if (sku < 9000000) {
    Game.find({sku: { $gte: (sku + 1), $lte: (sku + 20) }})
    .then((simGames) => {
      res.send(simGames);
    })
    .catch((err) => {
      console.error(err);
    })
  } else {
    Game.find({sku: { $gte: (sku - 20), $lte: (sku - 1) }})
    .then((simGames) => {
      res.send(simGames);
    })
    .catch((err) => {
      console.error(err);
    })
  }

});

server.get('/api/games/:sku/together', (req, res) => {
  var sku = Number(req.params.sku);

  if (sku < 9000000) {
    Game.find({sku: { $gte: (sku), $lte: (sku + 2) }})
    .then((togetherGames) => {
      res.send(togetherGames);
    })
    .catch((err) => {
      console.error(err);
    })
  } else {
    Game.find({sku: { $gte: (sku - 2), $lte: (sku) }})
    .then((togetherGames) => {
      res.send(togetherGames);
    })
    .catch((err) => {
      console.error(err);
    })
  }

});


server.get('/api/games/readAll', (req, res) => {
  Game.find({})
  .then((games) => {
    res.send(games);
  })
  .catch((err) => {
    console.error(err);
  })
});

server.get('/api/games/readBySystem', (req, res) => {
  Game.find({system: req.body.system})
  .then((games) => {
    res.send(games);
  })
  .catch((err) => {
    console.error(err);
  })
});

server.post('/api/games/create', (req, res) => {
  var newGame = req.body;
  Game.create(newGame)
  .then(() => {
    res.send('successfully created document');
  })
  .catch((err) => {
    console.error(err);
  })
});

server.delete('/api/games/:id/delete', (req, res) => {
  var gameId = req.params.id;
  Game.deleteOne({_id: gameId})
  .then((deleted) => {
    res.send('successfully deleted ' + deleted);
  })
  .catch((err) => {
    console.error(err);
  })
});

server.put('/api/games/:id/updateName', (req, res) => {
  var gameId = req.params.id;
  var newName = req.body.name;
  Game.findOneAndUpdate({_id: gameId}, {item: newName})
  .then(() => {
    res.send('put');
  })
  .catch((err) => {
    console.error(err);
  })
})

server.listen(port, () => {
  console.log(`Listening on port ${port}`);
})

module.exports = server;