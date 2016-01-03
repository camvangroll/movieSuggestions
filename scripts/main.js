var movieDBKey = "68648bc22dd03754bbe2b368551f7eb2";

var movieApp = {};

var imdbNum = 2593224;

var releaseYear = 1990;

movieApp.getMoviesByYear = function(year) {
	$.ajax({
		url: 'http://api.themoviedb.org/3/discover/movie?api_key=' + movieDBKey + '&primary_release_year=' + releaseYear,
		method: 'GET',
		dataType: 'jsonp'
	}).then(function(data) {
		console.log(data);
		for (var i in data.results) {
			$('.results').append('<div>' + data.results[i].title + ' ' + data.results[i].id + '</div>');
		}
	});
}

movieApp.getIMDBNumber = function(movieNum) {
	$.ajax({
		url: 'http://api.themoviedb.org/3/movie/' + movieNum + '?api_key=' + movieDBKey,
		method: 'GET',
		dataType: 'jsonp'
	}).then(function(data) {
		console.log('imdb number is ' + data.imdb_id);
	})
}

movieApp.searchBechdel = function() {
	$.ajax({
		url: 'http://bechdeltest.com/api/v1/getMovieByImdbId?' + imdbNum,
		method: 'GET',
		dataType: 'json'
	}).then(function(data) {
		console.log(data);
	});
};

$(function() {
	console.log('program executed');
	movieApp.searchBechdel();
	movieApp.getMoviesByYear();
	movieApp.getIMDBNumber(861);
});