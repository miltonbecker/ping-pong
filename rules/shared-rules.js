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
