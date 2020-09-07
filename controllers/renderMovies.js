import { loadPartials } from '../helpers.js';
import { getAllMovies } from '../requester.js';
import { showLoading, hideLoading, showNotification } from '../notification.js';

export default async function loadMovies() {

    this.partials = Object.assign({
        'single-movie': await this.load('../views/movies/single-movie.hbs')
    }, await loadPartials.call(this));

    try {

        showLoading();

        let genre = this.params.search;
        if (genre) { genre = genre.toLowerCase().trim() }

        const movies = await getAllMovies(genre);

        if (movies.hasOwnProperty('errorData')) {
            throw new Error(movies.message);
        }

        const context = Object.assign({ movies }, this.app.userData);
        this.partial('../views/movies/all-movies.hbs', context);

        hideLoading();

    } catch (err) {
        showNotification('errorEl', err);
        console.error(err);
    }
}