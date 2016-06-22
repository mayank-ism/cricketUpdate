var url = "http://127.0.0.1:8080/";
var match = "match/";
var commentary = "commentary/";
var favTeams = ["India","Australia","England","South Africa"];
$(document).ready(function() {
	renderScore();
	interval = 1000 * 60 * 1;
	setInterval(renderScore, interval);
});

function renderScore() {
	var scoreBoxLiveDOM = $('#score-box-live');
	var scoreBoxLaterDOM = $('#score-box-later');
	var scoreBoxFavTeamDOM = $('#score-fav-live');
	var animationDOM = $('#score-box-loading');
	animationDOM.show();
	$.getJSON(url + match, function(response) {
		var allMatchDataArray = response.data;
		scoreBoxLiveDOM.html("");
		scoreBoxLaterDOM.html("");
		scoreBoxFavTeamDOM.html("");
		animationDOM.hide();
		scoreBoxFavTeamDOM.append("<h3 class = \"text-left\">Games:</h3><hr>");
		allMatchDataArray.forEach(function(game) {
			var unique_id = game['unique_id'];
			var description = game['description'];
			var gameHTML = "";
			gameHTML += "<p class = \"text-left\">" + description + "</p>";

			$.getJSON(url + match + "/" + unique_id, function(matchDetail) {
				var team1 = matchDetail['team-1'];
				var team2 = matchDetail['team-2'];
				var significantEvent = matchDetail['innings-requirement'];
				var score = "";
				var isFavGame = false;
				var inProgress = false;
				if(significantEvent.search("Match scheduled to begin") == -1) {
					inProgress = true;
					isFavGame = (favTeams.indexOf(team1) != -1) || (favTeams.indexOf(team2) != -1);
					score = matchDetail['score'];
					score = score.slice(score.indexOf("(")+1,score.indexOf(")")).split(", ");

					gameHTML += "<p>"+ toString(score[0]) + ", " + toString(score[3]) +"</p>";
					gameHTML += "<p>"+ toString(score[1]) + ", " + toString(score[2]) +"</p>";
				}			

				var htmlString = "<div class=\"card\""   
					+ "id=\"" + unique_id + "\"" + "onclick=\"getCommentary(" + unique_id + ")\">" 
					+ gameHTML + "<p>" + significantEvent 
					+ "</p></div>"+"<hr>";

				if(inProgress) {
					if(isFavGame){
						scoreBoxFavTeamDOM.append(htmlString);
					} else {
						scoreBoxLiveDOM.append(htmlString);
					}
				} else {
					scoreBoxLaterDOM.append(htmlString);
				}
			});
		});
	});
}

function toString(val) {
	if (val === undefined || val === null) {
		return "";
	}

	return val;
}

function getCommentary(id) {
	var animationDOM = $('#box-loading');
	animationDOM.show();
	$.getJSON(url + match + commentary + id, function(response) {
		var commentaryHTML = response.commentary;

		goBackToNews = "Go to news";
		commentaryHTMLTemp = "<h4 class=\"text-left\" onclick = \"renderNews()\" style = \"cursor: pointer\">" 
						+ goBackToNews + "</h4>" 
		commentaryHTMLTemp += "<h3 class = \"text-left\">Commentary:</h3>"
				+ "<hr>";
		commentaryHTML = commentaryHTMLTemp + commentaryHTML;
		animationDOM.hide();
		var commentaryBoxDOM = $('#box');
		commentaryBoxDOM.html(commentaryHTML);
	})
}