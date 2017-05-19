exports.setRankingAndCoef = function (players) {
  let ranking = 1;
  let curPoints = players[0].points;

  for (player of players) {
    if (player.points < curPoints) {
      ranking++;
      curPoints = player.points;
    }
    player.ranking = ranking;
    player.coef = 3 - ((ranking - 1) * 0.3);

    if (player.coef < 0.3)
      player.coef = 0.3;
  }
}

exports.setVictoryPoints = function (obj) {
  const score1 = parseInt(obj.score1, 10);
  const score2 = parseInt(obj.score2, 10);

  if (score1 > score2) {
    obj.points1 = 100;
    obj.points2 = score2 * 25 > 50 ? 50 : score2 * 25;
  } else {
    obj.points2 = 100;
    obj.points1 = score1 * 25 > 50 ? 50 : score1 * 25;
  }
}

exports.setPointsWithCoef = function(obj, [player1, player2]) {
  obj.points1 *= player2.coef;
  obj.points2 *= player1.coef;
}
