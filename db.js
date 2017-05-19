const rules = require('./game-rules');
const dbClient = require('mongodb');

const DB_CONNECTION_STRING = 'mongodb://localhost:27017/test';

const getPlayers = () => {
  let promise = dbClient.connect(DB_CONNECTION_STRING)
    .then(function (db) {
      let docs = db.collection('players').find({}).sort({ points: -1 }).toArray();
      db.close();
      return docs;
    }).then(function (docs) {
      rules.setRankingAndCoef(docs);
      return docs;
    }).catch(function (error) {
      throw error;
    });
  return promise;
}

const addScore = function (obj) {
  let promise = getPlayers()
    .then((players) => {
      return findMatchPlayers(players, obj);
    }).then((players) => {
      rules.setVictoryPoints(obj);
      rules.setPointsWithCoef(obj, players);
    }).then(() => {
      return dbClient.connect(DB_CONNECTION_STRING)
    }).then((db) => {
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
      db.close();
      return 1;
    }).catch(function (error) {
      throw error;
    });

  return promise;
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

module.exports = { getPlayers, addScore };