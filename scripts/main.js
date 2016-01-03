var movieDBKey = "68648bc22dd03754bbe2b368551f7eb2";

var movieApp = {};

var imdbNum = 2593224;


movieApp.getMovies = function(yearAndGenre) {
	var releaseYear = $('#year').val();
	var genreCode = $('#genre').val();
	$.ajax({
		url: 'http://api.themoviedb.org/3/discover/movie?api_key=' + movieDBKey + '&primary_release_year=' + releaseYear + '&with_genres=' + genreCode,
		method: 'GET',
		dataType: 'jsonp'
	}).then(function(data) {
		console.log(data);
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

movieApp.results = function() {
	$('form').on('submit', function(e) {
		e.preventDefault();
		movieApp.getMovies();
		// movieApp.getIMDBNumber(861);
		// movieApp.searchBechdel();
		console.log("results");
		for (var i in data.results) {
			$('.results').append('<div>' + data.results[i].title + ' ' + data.results[i].id + '</div>');
		}
	});
	
}



$(function() {
	movieApp.results();
});