const params = new URLSearchParams(location.search);
import { findMovieApi, movieApiKey, posterURL } from "./variables.js";

const movieId = params.get("id");
const movieURL = `${findMovieApi}${movieId}?api_key=${movieApiKey}`;
$(function () {
    $.get(movieURL, function (data) {
        const { homepage, title, overview, poster_path } = data;
        const movieContainer = $(`<div></div>`);
        let homePageLink = `<a href="${homepage}" target="_blank">Visit Movie Homepage</a>`;
        const movieString = `
                            <div class="container">
                                <img src="${posterURL}${poster_path}">
                                <div class="movie-info">
                                    <h3>${title}</h3>
                                    <p>${overview}</p>
                                    <p class="movie-link">${homepage ? homePageLink : ''}</p>
                                </div>
                                <a class="home-link" href="./index.html">Home</a>
                            </div>`
        movieContainer.html(movieString);
        $('#movieData').append(movieContainer);
    });
});
