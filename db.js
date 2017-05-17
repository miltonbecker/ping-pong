const publicRules = require('./rules/shared-rules');
const privateRules = require('./rules/backend-rules');
const dbClient = require('mongodb');

const DB_CONNECTION_STRING = 'mongodb://localhost:27017/test';

const getPlayers = () => {
  let promise = dbClient.connect(DB_CONNECTION_STRING)
    .then(function (db) {
      let docs = db.collection('players').find({}).sort({ points: -1 }).toArray();
      db.close();
      return docs;
    }).then(function (docs) {
      return docs;
    }).catch(function (error) {
      throw error;
    });
  return promise;
}

const addScore = function (obj) {
  privateRules.setVictoryPoints(obj);

  let promise = getPlayers()
    .then((players) => {
      publicRules.setRankingAndCoef(players);

      let player1 = players.find(function (player) {
        return player.name == obj.name1;
      });

      let player2 = players.find(function (player) {
        return player.name == obj.name2;
      });

      return [player1, player2];
    }).then((players) => {
      privateRules.setPointsWithCoef(obj, players);
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

module.exports = { getPlayers, addScore };