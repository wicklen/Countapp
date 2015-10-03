var Player = require('../models/players');

module.exports.list = function (req, res) {
  Player.find({}, function (err, results) {
    res.json(results);
  });
};

module.exports.create = function (req, res) {
    var player = new Player(req.body);
  
    console.log(req.body);

    player.save(function (err, result) {
        console.log(result.player);
        res.json(result);
    });
};