import { discoverMoviesApi, posterURL , searchMovieApi , movieApiKey } from "./variables.js";
function search (data) {
    $('#main').html('');
    const {results} = data;
    results.forEach(movie => {
        const {poster_path,release_date,vote_average,title,overview,id} = movie;
        let movieContainer = $('<div></div>');
        movieContainer.addClass('movie');
        let moviePoster = $(`<img src="${posterURL+poster_path}">`);
        movieContainer.append(moviePoster);
        let movieTitle = $(`<h4><a href="./DetailsPage.html?id=${id}">${title}</a></h4>`);
        movieContainer.append(movieTitle);
        $('#main').append(movieContainer);
    });
}
function discoverMovies() {
    let pageNum = 1 + Math.floor( 200 * Math.random() ) ;
    $.get(discoverMoviesApi+`&page=${pageNum}`, function (data) {
        search(data);
    });
}
function searchMovieByName (movieName) {
    $.get(searchMovieApi + `?api_key=${movieApiKey}&query=${movieName}&include_adult=false` , function (data) {
        search(data);
    })
}
$(function () {
    discoverMovies();
});
$('.search').keyup(function () {
    if ($(this).val() == '') {
        discoverMovies();
    }
    else searchMovieByName($(this).val());
})



// `https://api.themoviedb.org/3/search/movie?api_key=${movieApiKey}&query=${requiredMovieName}`;
