app.controller('countController', ['$scope', '$http', function ($scope, $http) {

    $http.get('/api/games').

        success(function(data, status, headers, config) {
            console.log(data);
            $scope.games = data;

            $scope.game = data[0];

            console.log($scope.game);

            $scope.players = data[0].players;

            // var last = data[data.length - 1];
            // console.log(last);
        });

    $scope.updateStandings = function() {

        var games = $scope.games[0];

        //console.log(games);

        $http.put("/api/games/" + games._id, games).success(function(data) {
            $scope.response = data;
        });

    };

}]);