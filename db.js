const rules = require('./game-rules');
const MongoClient = require('mongodb').MongoClient;

const DB_CONNECTION_STRING = 'mongodb://localhost:27017/test';

let db;

const init = () => {
  MongoClient.connect(DB_CONNECTION_STRING, function (err, database) {
    if (err)
      throw err;

    db = database;
  });
}

const getPlayers = () => {
  return db.collection('players').find({}).sort({ points: -1 }).toArray()
    .then(function (docs) {
      rules.setRankingAndCoef(docs);
      return docs;
    }).catch(function (error) {
      throw error;
    });
}

const addScore = function (obj) {
  return getPlayers()
    .then((players) => {
      const matchPlayers = findMatchPlayers(players, obj);
      rules.setVictoryPoints(obj);
      rules.setPointsWithCoef(obj, matchPlayers);
      
      let collection = db.collection('players');
      collection.updateOne(
        { name: obj.name1 },
        { $inc: { matches: 1, points: obj.points1 } },
        { upsert: false }
      );
      collection.updateOne(
        { name: obj.name2 },
        { $inc: { matches: 1, points: obj.points2 } },
        { upsert: false }
      );
      return 1;
    }).catch(function (error) {
      throw error;
    });
}

function findMatchPlayers(players, matchObj) {
  let player1 = players.find(function (player) {
    return player.name == matchObj.name1;
  });

  let player2 = players.find(function (player) {
    return player.name == matchObj.name2;
  });

  return [player1, player2];
}

process.on('SIGINT', function () {
  db.close();
  process.exit();
});

module.exports = { init, getPlayers, addScore };