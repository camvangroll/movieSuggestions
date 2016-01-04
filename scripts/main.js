var movieDBKey = "68648bc22dd03754bbe2b368551f7eb2";

var movieApp = {};

var imdbNum = 2593224;

var movieInfo = {};


movieApp.getMovies = function() {
	var releaseYear = $('#year').val();
	var genreCode = $('#genre').val();
	$.ajax({
		url: 'http://api.themoviedb.org/3/discover/movie?api_key=' + movieDBKey + '&primary_release_year=' + releaseYear + '&with_genres=' + genreCode,
		method: 'GET',
		dataType: 'jsonp'
	}).then(function(data) {
		console.log(data);
		movieInfo = data;
		for (var i in data.results) {
			$('.results').append('<div class="movie">' + '<img class="movie-poster" src="http://image.tmdb.org/t/p/w500' + data.results[i].poster_path + '">' + '<p>' + data.results[i].title + '</p>' + '<p class="description">' + data.results[i].overview + '</p>' + '<p>' + data.results[i].id + '</p>' + '</div>');
		};
	});
};

movieApp.getIMDBNumber = function(movieNum) {
	$.ajax({
		url: 'http://api.themoviedb.org/3/movie/' + movieNum + '?api_key=' + movieDBKey,
		method: 'GET',
		dataType: 'jsonp'
	}).then(function(data) {
		console.log('imdb number is ' + data.imdb_id);
	})
};

movieApp.searchBechdel = function() {
	movieApp.searchBechdel = function() {
	$.ajax({
		url: 'http://proxy.hackeryou.com',
		method: 'GET',
		dataType: 'json',
		data: {
			reqUrl: 'http://bechdeltest.com/api/v1/getMovieByImdbId?' + imdbNum
		}
	}).then(function(data) {
		console.log(data);
	});
	};
};

movieApp.results = function() {
	$('form').on('submit', function(e) {
		e.preventDefault();
		movieApp.getMovies();
		// movieApp.getIMDBNumber(861);
		// movieApp.searchBechdel();
		console.log("results");
	});
	
}


$(function() {
	movieApp.results();
});