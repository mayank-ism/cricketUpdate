$(document).ready(function() {
	renderNews();
	setInterval(renderNews, 1000*60*60);
});

function renderNews() {
	var animationDOM = $('#box-loading');
	animationDOM.show();
	var url = "http://127.0.0.1:8080/";
	var news = "news/";
	$.getJSON(url + news, function(response) {
		allCricketNewsData = response.data;

		var newsDOMBox = $('#box');
		newsDOMBox.html("");
		animationDOM.hide();
		newsDOMBox.append('<h3 class = "text-left">News:</h3><hr>');
		allCricketNewsData.forEach(function(news) {
			var title = news.title;
			var description = news.description;

			var newsHTML = '<strong><p class = "text-left">' + title + '</p></strong>';
			newsHTML += '<p class = "text-left">' + description + '</p><hr>';
			newsDOMBox.append(newsHTML);
		});
	});
}
