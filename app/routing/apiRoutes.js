var friendsArray = require('../data/friends.js');

module.exports = function (app) {
    //a GET route that displays JSON of all possible friends
    app.get('/api/friends', function (req, res) {
        res.json(friendsArray);
    });

    app.post('/api/friends', function (req, res) {
        //grabs the new friend's scores to compare with friends in friendsArray array
        var newFriendScores = req.body.scores;
        var scoresArray = [];
        var bestMatch = 0;

        //runs through all current friends in list
        for (var i = 0; i < friendsArray.length; i++) {
            var scoresDiff = 0;
            //run through scores to compare friends
            for (var j = 0; j < newFriendScores.length; j++) {
                scoresDiff += (Math.abs(parseInt(friendsArray[i].scores[j]) - parseInt(newFriendScores[j])));
            }

            //push results into scoresArray
            scoresArray.push(scoresDiff);
        }

        //after all friends are compared, find best match
        for (var i = 0; i < scoresArray.length; i++) {
            if (scoresArray[i] <= scoresArray[bestMatch]) {
                bestMatch = i;
            }
        }

        //return bestMatch data
        var bff = friendsArray[bestMatch];
        res.json(bff);

        //pushes new submission into the friendsList array
        friendsArray.push(req.body);
    });
};