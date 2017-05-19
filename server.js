const path = require('path');
const express = require('express');
const db = require('./db');
const parser = require('body-parser');

const app = express();

const jsonParser = parser.json({
  verify(req, res, buf, enc) {
    try {
      JSON.parse(buf);
    } catch (error) {
      res.status(400).json({ Error: error.message });
      throw error;
    }
  }
});

if (process.env.NODE_ENV !== 'production') {
  const webpack = require('webpack');
  const config = require('./webpack.config.dev');

  const compiler = webpack(config);

  app.use(require('webpack-dev-middleware')(compiler, {
    noInfo: true,
    publicPath: config.output.publicPath
  }));

  app.use(require('webpack-hot-middleware')(compiler));
}

db.init();

app.get('/api/getPlayers', function (req, res) {
  db.getPlayers()
    .then(function (result) {
      if (!result) {
        res.json('{}');
        return;
      }
      res.json(result);
    }).catch(function (error) {
      res.status(500).json({ Error: error.message });
    });
});

function formatName(name) {
    return name.charAt(0).toUpperCase() + name.slice(1).toLowerCase();
}

function nameParser(req, res, next) {
    if (!req.body || !req.body.name1 || !req.body.name2) {
        res.sendStatus(400);
        return false;
    }

    req.body.name1 = formatName(req.body.name1);
    req.body.name2 = formatName(req.body.name2);

    next();
}

app.post('/api/addScore', jsonParser, nameParser, function (req, res) {
  const body = req.body;

  db.addScore(body)
    .then(function (result) {
      if (!result) {
        res.status(400).json({ Error: 'Player not found!' });
        return;
      }
      res.json(result);
    }).catch(function (error) {
      res.status(500).json({ Error: error.message });
    });
});

app.use(express.static('public'));

app.get('*', function (req, res) {
  res.status(404).send('Nope, nothing found here.');
});

const port = process.env.APP_PORT || 8020;

app.listen(port, function (err) {
  if (err) {
    console.log(err);
    return;
  }
  console.log('Listening at port %d', port);
});
