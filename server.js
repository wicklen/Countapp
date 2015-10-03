var express          = require('express'),
    app              = express(),
    bodyParser       = require('body-parser'),
    router           = express.Router(),
    basicAuth        = require('basic-auth-connect'),
    mongoose         = require('mongoose');

mongoose.connect('mongodb://localhost:27017/countapp2');

var gamesSchema = mongoose.Schema({
    name: String,
    players: { name: String, score: Number }
});

var Games = mongoose.model('Games', gamesSchema);

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/js', express.static(__dirname + '/client/js'));
app.use(router);

// Authenticator
app.use(basicAuth('testUser', 'testPass'));

app.get('/', function(req, res) {
    res.sendFile(__dirname + '/client/views/index.html');
});

router.route('/api/games')
    .get(function (req, res) {
        Games.find(function(err, games) {
            if (err)
                res.send(err);
            res.send(games);
        });
    });

app.listen(3000, function() {
    console.log('listening...');
});

router.route('/api/games/:game_id')
    .get(function (req, res) {
        Games.findOne({_id: req.params.game_id}, (function(err, game) {
            if (err)
                res.send(err);
            res.send(game);
        }));
    })
    .put(function(req, res) {
        Games.findOne({_id: req.params.game_id}, function(err, game) {
            game.players = req.body.players;

            game.save(function(err) {
                if (err)
                    res.send(err);
                res.send({message: "Game updated"});
            });

        });
    });






















































// router.route('/api/players')
//     .get(function (req, res) {
//         Player.find(function(err, player) {
//             if (err)
//                 res.send(err);
//             res.send(player);
//         });
//     })
//     .post(function (req, res) {
//         var player = new Player();
//         player.name = req.body.name;
//         player.score = req.body.score;

//         player.save(function(err) {
//             if (err)
//                 res.send(err);

//             res.send({message: "Player created"});
//         });
//     });

// app.listen(3000, function() {
//     console.log('listening...');
// });

// router.route('/api/players/:player_id')
//     .get(function (req, res) {
//         Player.findOne({_id: req.params.player_id}, (function(err, player) {
//             if (err)
//                 res.send(err);
//             res.send(player);
//         }));
//     })
//     .put(function(req, res) {
//         Player.findOne({_id: req.params.player_id}, function(err, player) {
//             player.name = req.body.name;
//             player.score = req.body.score;

//             console.log(player.name);
//             console.log(player.score);

//             player.save(function(err) {
//                 if (err)
//                     res.send(err);
//                 res.send({message: "Fruit updated"});
//             });

//         });
//     });