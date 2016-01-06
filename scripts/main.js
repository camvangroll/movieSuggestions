var movieDBKey = "68648bc22dd03754bbe2b368551f7eb2";

var movieApp = {};

var movieInfo = {};


movieApp.getMovies = function() {
	var releaseYear = $('#year').val();
	var genreCode = $('#genre').val();
	$.ajax({
		url: 'http://api.themoviedb.org/3/discover/movie?api_key=' + movieDBKey + '&primary_release_year=' + releaseYear + '&with_genres=' + genreCode,
		method: 'GET',
		dataType: 'jsonp'
	}).then(function(data) {
		movieInfo = data;
		console.log(movieInfo);
		movieApp.getIMDBNumber();
	});
};

movieApp.getIMDBNumber = function() {
	for (var i in movieInfo.results) {
		$.ajax({
			url: 'http://api.themoviedb.org/3/movie/' + movieInfo.results[i].id + '?api_key=' + movieDBKey,
			method: 'GET',
			dataType: 'jsonp'
		}).then(function(data) {
			var imdbNum = data.imdb_id;
			imdbNum = imdbNum.substr(2);
			imdbNum = imdbNum.toString();
			console.log(imdbNum);
			$.ajax({
				url: 'http://proxy.hackeryou.com',
				method: 'GET',
				dataType: 'json',
				data: {
					reqUrl: 'http://bechdeltest.com/api/v1/getMovieByImdbId',
					imdbid: imdbNum
				}
				}).then(function(data) {
					console.log(data.rating);
					console.log(movieInfo.results[i]);
					movieInfo.results[i].bechdelRating = data.rating;
					console.log(movieInfo.results[i].bechdelRating);
			});
		});
	};
	movieApp.displayResults();
};

movieApp.results = function() {
	$('form').on('submit', function(e) {
		e.preventDefault();
		movieApp.getMovies();
	});	
};

movieApp.displayResults = function() {
	$('.results').html('');
	for (var i in movieInfo.results) {
		$('.results').append('<div class="movie">' + '<a target="_blank" href="https://www.themoviedb.org/movie/' + movieInfo.results[i].id +'">' + '<img class="movie-poster" src="http://image.tmdb.org/t/p/w500' + movieInfo.results[i].poster_path +'">' + '</a>' + '<h3>' + movieInfo.results[i].title + '</h3>' + '<p class="description">' + movieInfo.results[i].overview + '</p>' + '<p>' + movieInfo.results[i].id + '</p>' + '<p>' + movieInfo.bechdelRating + '</p>' + '</div>');
	};
};

$(function() {
	movieApp.results();
});