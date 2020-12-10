const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');
const path = require('path');
const port = 3004;

require('../database');
const Game = require('../database/Game');
const client = require('../postgres/index.js');


const server = express();

server.use(morgan('dev'));
server.use(bodyParser.json());
server.use(express.static(path.join(__dirname, '../client/dist')));

server.get('/api/games/one', (req, res) => {
  var index = Math.floor(Math.random() * 10000000);

  // Game.findOne({sku: index})
  // .then((game) => {
  //   res.send(game);
  // })
  // .catch((err) => {
  //   console.error(err);
  // })

  client.query(`SELECT * FROM games WHERE sku = ${index}`)
  .then((game) => {
    res.send(game.rows[0]);
  })
  .catch((err) => {
    console.error(err);
  })

});

server.get('/api/games/:sku/oneBySku', (req, res) => {
  var sku = Number(req.params.sku);

  // Game.findOne({sku: sku})
  // .then((game) => {
  //   res.send(game);
  // })
  // .catch((err) => {
  //   console.error(err);
  // })

  // client.query("SHOW search_path", function(err, result) {
  //   console.log(result);
  // });
  client.query(`SELECT * FROM games WHERE sku = ${sku}`)
  .then((game) => {
    res.send(game.rows[0]);
  })
  .catch((err) => {
    console.error(err);
  })


});

server.get('/api/games/:sku/similar', (req, res) => {
  var sku = Number(req.params.sku);

// if (sku < 9000000) {
//     Game.find({sku: { $gte: (sku + 1), $lte: (sku + 20) }})
//     .then((simGames) => {
//       res.send(simGames);
//     })
//     .catch((err) => {
//       console.error(err);
//     })
//   } else {
//     Game.find({sku: { $gte: (sku - 20), $lte: (sku - 1) }})
//     .then((simGames) => {
//       res.send(simGames);
//     })
//     .catch((err) => {
//       console.error(err);
//     })
//   }
if (sku < 9000000) {
  client.query(`SELECT * FROM games WHERE sku >= (${sku} + 1) AND sku <= (${sku} + 20)`)
  .then((simGames) => {
    res.send(simGames.rows);
  })
  .catch((err) => {
    console.error(err);
  })
} else {
  client.query(`SELECT * FROM games WHERE sku >= (${sku} - 20) AND sku <= (${sku} - 1)`)
  .then((simGames) => {
    res.send(simGames.rows);
  })
  .catch((err) => {
    console.error(err);
  })
}

});

server.get('/api/games/:sku/together', (req, res) => {
  var sku = Number(req.params.sku);

  // if (sku < 9000000) {
  //   Game.find({sku: { $gte: (sku), $lte: (sku + 2) }})
  //   .then((togetherGames) => {
  //     res.send(togetherGames);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   })
  // } else {
  //   Game.find({sku: { $gte: (sku - 2), $lte: (sku) }})
  //   .then((togetherGames) => {
  //     res.send(togetherGames);
  //   })
  //   .catch((err) => {
  //     console.error(err);
  //   })
  // }

  if (sku < 9000000) {
    client.query(`SELECT * FROM games WHERE sku >= (${sku} + 1) AND sku <= (${sku} + 3)`)
    .then((simGames) => {
      res.send(simGames.rows);
    })
    .catch((err) => {
      console.error(err);
    })
  } else {
    client.query(`SELECT * FROM games WHERE sku >= (${sku} - 3) AND sku <= (${sku} - 1)`)
    .then((simGames) => {
      res.send(simGames.rows);
    })
    .catch((err) => {
      console.error(err);
    })
  }

});


server.get('/api/games/readAll', (req, res) => {
  // Game.find({})
  // .then((games) => {
  //   res.send(games);
  // })
  // .catch((err) => {
  //   console.error(err);
  // })

  client.query('SELECT * FROM games')
  .then((games) => {
    res.send(games);
  })
  .catch((err) => {
    console.error(err);
  })
});

server.get('/api/games/readBySystem', (req, res) => {
  // Game.find({system: req.body.system})
  // .then((games) => {
  //   res.send(games);
  // })
  // .catch((err) => {
  //   console.error(err);
  // })

  client.query(`SELECT * FROM games WHERE  system = ${req.body.system}`)
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