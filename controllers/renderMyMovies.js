import { loadPartials } from '../helpers.js';
import { getUserMovies } from '../requester.js';
import { showLoading, hideLoading, showNotification } from '../notification.js';

export default async function loadUserMovies() {

    this.partials = Object.assign({
        'my-movie': await this.load('../views/movies/my-movie.hbs')
    }, await loadPartials.call(this));

    try {
        showLoading();
        const movies = await getUserMovies(localStorage.getItem('userId'));

        if (movies.hasOwnProperty('errorData')) {
            throw new Error(userMovies.message);
        }

        const context = Object.assign({ movies }, this.app.userData);
        this.partial('../views/movies/my-movies.hbs', context);

        hideLoading();

    } catch (err) {
        showNotification('errorEl', err);
        console.error(err);
    }
}