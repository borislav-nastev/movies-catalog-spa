import { loadPartials } from '../helpers.js';
import { getMovieById, deleteMovie } from '../requester.js';
import { showLoading, hideLoading, showNotification } from '../notification.js';

export async function deleteMovieGet() {

    this.partials = await loadPartials.call(this);

    try {

        showLoading();

        const movie = await getMovieById(this.params.id);

        if (movie.hasOwnProperty('errorData')) {
            throw new Error(movie.message);
        }

        const context = Object.assign({ movie }, this.app.userData);
        this.partial('../views/movies/delete.hbs', context);

        hideLoading();

    } catch (err) {
        showNotification('errorEl', err);
        console.error(err);
    }
}

export async function deleteMoviePost() {

    try {

        showLoading();

        const response = await deleteMovie(this.params.id);

        if (response.hasOwnProperty('errorData')) {
            throw new Error(response.message);
        }

        showNotification('infoEl', 'Movie removed successfully!');
        this.redirect('#/my_movies');

    } catch (err) {
        showNotification('errorEl', err);
        console.error(err);
    }
}